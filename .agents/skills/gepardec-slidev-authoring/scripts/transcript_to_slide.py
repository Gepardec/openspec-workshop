#!/usr/bin/env python3
"""Distil a Claude Code session transcript into a `conversation` slide draft.

Claude Code appends every session to ~/.claude/projects/<slug>/<id>.jsonl, one
JSON record per line. Those files run to tens of megabytes and are mostly tool
traffic; a `conversation` slide holds six to ten turns. So this script does the
mechanical half of the job — find the session, drop the noise, pair each tool
call with its result, number what is left — and leaves the editorial half to a
person:

    transcript_to_slide.py list                       # which sessions exist
    transcript_to_slide.py turns latest               # numbered, skimmable
    transcript_to_slide.py scaffold latest --pick 1,4,7-9

`turns` is the menu, `scaffold` fills the order. Indices are stable between the
two as long as the flags match, because both run the same distillation.
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

PROJECTS = Path.home() / ".claude" / "projects"

# Prompts the harness injects on the user's behalf. They are addressed to the
# agent, never spoken by the human, so they have no place on a transcript slide.
NOISE_PREFIXES = (
    "<system-reminder>",
    "<command-name>",
    "<command-message>",
    "<local-command-stdout>",
    "<user-prompt-submit-hook>",
)

# Fields worth quoting when a tool call is put on a slide, best first. The
# command or the path is what an audience recognises; the rest is plumbing.
BRIEF_KEYS = ("command", "file_path", "pattern", "query", "path", "url", "prompt")


# --------------------------------------------------------------------------
# Locating a transcript
# --------------------------------------------------------------------------

def project_slug(path: Path) -> str:
    """Claude Code names a project dir after its cwd, with / and . as dashes."""
    return str(path.resolve()).replace("/", "-").replace(".", "-")


def project_dir(project: str | None) -> Path:
    root = Path(project) if project else Path.cwd()
    d = PROJECTS / project_slug(root)
    if d.is_dir():
        return d
    raise SystemExit(
        f"no transcripts for {root}\n"
        f"  looked in: {d}\n"
        f"  pass --project with the directory the session actually ran in."
    )


def sessions(pdir: Path) -> list[Path]:
    return sorted(pdir.glob("*.jsonl"), key=lambda p: p.stat().st_mtime, reverse=True)


def resolve_session(ref: str, pdir: Path) -> Path:
    if ref == "latest":
        found = sessions(pdir)
        if not found:
            raise SystemExit(f"no .jsonl transcripts in {pdir}")
        return found[0]

    as_path = Path(ref)
    if as_path.is_file():
        return as_path

    exact = pdir / f"{ref}.jsonl"
    if exact.is_file():
        return exact

    partial = [s for s in sessions(pdir) if s.stem.startswith(ref)]
    if len(partial) == 1:
        return partial[0]
    if partial:
        ids = "\n  ".join(s.stem for s in partial)
        raise SystemExit(f"'{ref}' matches several sessions:\n  {ids}")
    raise SystemExit(f"no session matching '{ref}' in {pdir}")


def records(path: Path):
    with path.open(encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except json.JSONDecodeError:
                # A session being written to right now can end mid-line.
                continue


# --------------------------------------------------------------------------
# Distillation
# --------------------------------------------------------------------------

def local_time(stamp: str | None) -> str:
    if not stamp:
        return ""
    try:
        dt = datetime.fromisoformat(stamp.replace("Z", "+00:00"))
    except ValueError:
        return ""
    return dt.astimezone().strftime("%H:%M")


def is_noise(text: str) -> bool:
    return text.lstrip().startswith(NOISE_PREFIXES)


def brief(tool_input) -> str:
    if not isinstance(tool_input, dict):
        return ""
    for key in BRIEF_KEYS:
        value = tool_input.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip().splitlines()[0]
    return ""


def result_text(block: dict) -> str:
    content = block.get("content")
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return "\n".join(
            b.get("text", "")
            for b in content
            if isinstance(b, dict) and b.get("type") == "text"
        )
    return ""


def distil(path: Path, thinking: bool = False, sidechains: bool = False) -> list[dict]:
    """Every record the transcript holds, reduced to the turns a slide could show.

    Tool calls and their results arrive in separate records — the call on an
    assistant turn, the result on the next user turn — so calls are indexed by
    id while walking and their results filled in when they land.
    """
    turns: list[dict] = []
    by_tool_id: dict[str, dict] = {}

    for rec in records(path):
        kind = rec.get("type")
        if kind not in ("user", "assistant"):
            continue
        if rec.get("isSidechain") and not sidechains:
            continue
        if rec.get("isMeta"):
            continue

        when = local_time(rec.get("timestamp"))
        content = rec.get("message", {}).get("content")

        if kind == "assistant" and isinstance(content, list):
            for block in content:
                btype = block.get("type")
                if btype == "text":
                    text = block.get("text", "").strip()
                    if text:
                        turns.append({"role": "agent", "time": when, "text": text})
                elif btype == "thinking" and thinking:
                    text = (block.get("thinking") or "").strip()
                    if text:
                        turns.append(
                            {"role": "agent", "time": when, "text": text, "note": "thinking"}
                        )
                elif btype == "tool_use":
                    turn = {
                        "role": "tool",
                        "time": when,
                        "tool": block.get("name", "tool"),
                        "cmd": brief(block.get("input")),
                        "result": "",
                        "error": False,
                    }
                    turns.append(turn)
                    by_tool_id[block.get("id", "")] = turn
            continue

        # A human turn is a plain string; an array on a user record is the
        # harness handing back tool results or pasted attachments.
        if isinstance(content, str):
            text = content.strip()
            if text and not is_noise(text):
                turns.append({"role": "user", "time": when, "text": text})
        elif isinstance(content, list):
            for block in content:
                if block.get("type") == "tool_result":
                    turn = by_tool_id.get(block.get("tool_use_id", ""))
                    if turn is not None:
                        turn["result"] = result_text(block).strip()
                        turn["error"] = bool(block.get("is_error"))
                elif block.get("type") == "text":
                    text = block.get("text", "").strip()
                    if text and not is_noise(text):
                        turns.append({"role": "user", "time": when, "text": text})

    for n, turn in enumerate(turns, start=1):
        turn["i"] = n
    return turns


def session_label(path: Path) -> str:
    """The session's own title, if it ever got one — a sane default for `session:`."""
    ai = custom = ""
    for rec in records(path):
        if rec.get("type") == "custom-title":
            custom = rec.get("customTitle", "")
        elif rec.get("type") == "ai-title":
            ai = rec.get("aiTitle", "")
    return custom or ai or path.stem[:8]


# --------------------------------------------------------------------------
# Shaping for a slide
# --------------------------------------------------------------------------

def clip(text: str, limit: int) -> tuple[str, bool]:
    text = " ".join(text.split()) if "\n" not in text else text.strip()
    if len(text) <= limit:
        return text, False

    head = text[:limit]
    # Prefer a word boundary, but not at any price: a shell line can open with
    # a hundred-character pnpm path, and backing up to the last space would
    # throw the whole line away and print a bare tool name.
    at_space = head.rsplit(" ", 1)[0]
    if len(at_space) >= limit * 0.6:
        head = at_space
    return head.rstrip(" ,.;:") + " …", True


def clip_lines(text: str, limit: int) -> tuple[str, bool]:
    lines = [ln for ln in text.strip().splitlines() if ln.strip()]
    if len(lines) <= limit:
        return "\n".join(lines), False
    return "\n".join(lines[:limit] + ["…"]), True


def balance_fences(text: str) -> str:
    """Close a code fence the clip cut through.

    Transcript turns quote command output constantly, so clipping lands inside
    a fenced block often. Left open, the fence swallows the closing
    </ChatTurn> and every turn after it.
    """
    if text.count("```") % 2:
        text = text.rstrip() + "\n```"
    return text


def safe_markdown(text: str) -> str:
    """Keep a turn's body from being read as deck structure.

    A line of exactly `---` would end the slide, and `::name::` at the start of
    a line would open a slot. Both appear in real transcripts.
    """
    out = []
    for line in text.splitlines():
        stripped = line.strip()
        if stripped and set(stripped) == {"-"} and len(stripped) >= 3:
            line = "- - -"
        elif stripped.startswith("::"):
            line = line.replace("::", "∶∶", 1)
        out.append(line)
    return "\n".join(out)


def parse_pick(spec: str, count: int) -> list[int]:
    picked: list[int] = []
    for part in spec.split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part.lstrip("-"):
            lo, _, hi = part.partition("-")
            picked.extend(range(int(lo), int(hi) + 1))
        else:
            picked.append(int(part))
    bad = [n for n in picked if not 1 <= n <= count]
    if bad:
        raise SystemExit(f"no such turn: {', '.join(map(str, bad))} (transcript has {count})")
    return picked


def render(turns: list[dict], label: str, headline: str, who: str | None,
           max_chars: int, max_lines: int, source: str) -> tuple[str, int]:
    body: list[str] = []
    truncated = 0

    for n, turn in enumerate(turns):
        attrs = [f'role="{turn["role"]}"']
        if turn["role"] == "user" and who:
            attrs.append(f'who="{who}"')

        if turn["role"] == "tool":
            meta = turn["tool"]
            if turn["cmd"]:
                meta = f'{turn["tool"]} — {turn["cmd"]}'
            meta, cut = clip(meta, 60)
            truncated += cut
            attrs.append(f'meta="{meta.replace(chr(34), chr(39))}"')
            text, cut = clip_lines(turn["result"] or "(no output)", max_lines)
            truncated += cut
            text = "```\n" + safe_markdown(text) + "\n```"
        else:
            if turn.get("note"):
                attrs.append(f'meta="{turn["note"]}"')
            elif turn["time"]:
                attrs.append(f'meta="{turn["time"]}"')
            text, cut = clip(turn["text"], max_chars)
            truncated += cut
            text = balance_fences(safe_markdown(text))

        # The first turn is on screen when the slide opens; every later one
        # is what a click reveals. The layout reads these classes rather than
        # counting clicks itself, so the pacing here is the whole model.
        if n:
            attrs.append("v-click")

        body.append(f'<ChatTurn {" ".join(attrs)}>\n\n{text}\n\n</ChatTurn>')

    slide = (
        "---\n"
        "layout: conversation\n"
        f"session: {label}\n"
        "---\n\n"
        f"# {headline}\n\n"
        "<!--\n"
        f"  Drafted from {source} — a starting point, not a finished slide.\n"
        "  Transcript wording is written for a terminal; slide wording is written\n"
        "  for a room. Rewrite each turn down to the point it makes, keep every\n"
        "  turn shorter than the tape's viewport, and delete this comment.\n"
        "  Anything ending in … was cut mechanically and needs a real sentence.\n"
        "  Export with --with-clicks or the PDF shows only the last click.\n"
        "-->\n\n"
        "::turns::\n\n"
        + "\n\n".join(body)
        + "\n"
    )
    return slide, truncated


# --------------------------------------------------------------------------
# Commands
# --------------------------------------------------------------------------

def cmd_list(args) -> None:
    pdir = project_dir(args.project)
    found = sessions(pdir)
    if not found:
        raise SystemExit(f"no transcripts in {pdir}")

    print(f"{pdir}\n")
    for path in found[: args.limit]:
        when = datetime.fromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d %H:%M")
        size = path.stat().st_size / 1_048_576
        print(f"  {path.stem[:8]}  {when}  {size:5.1f} MB  {session_label(path)}")
    if len(found) > args.limit:
        print(f"\n  … {len(found) - args.limit} older, raise --limit to see them")


def cmd_turns(args) -> None:
    path = resolve_session(args.session, project_dir(args.project))
    turns = distil(path, thinking=args.thinking, sidechains=args.sidechains)

    if args.json:
        print(json.dumps(turns, indent=2, ensure_ascii=False))
        return

    shown = turns
    if args.only:
        wanted = {r.strip() for r in args.only.split(",")}
        shown = [t for t in turns if t["role"] in wanted]

    counts = ", ".join(
        f"{sum(1 for t in turns if t['role'] == r)} {r}" for r in ("user", "agent", "tool")
    )
    print(f"{path.name}  ·  {session_label(path)}  ·  {len(turns)} turns ({counts})")
    if args.only:
        print(f"showing {args.only} — numbers are the full transcript's, so --pick still works")
    print()

    for turn in shown:
        if turn["role"] == "tool":
            summary = turn["cmd"] or (turn["result"] or "").strip().splitlines()[:1]
            summary = summary if isinstance(summary, str) else (summary[0] if summary else "")
            head = f'{turn["tool"]}: {summary}'
        else:
            head = turn["text"]
        head, _ = clip(head, args.width)
        flag = "!" if turn.get("error") else " "
        print(f'{turn["i"]:4}{flag} {turn["role"]:<6} {turn["time"]:>5}  {head}')


def cmd_scaffold(args) -> None:
    path = resolve_session(args.session, project_dir(args.project))
    turns = distil(path, thinking=args.thinking, sidechains=args.sidechains)
    chosen = [turns[n - 1] for n in parse_pick(args.pick, len(turns))]

    slide, truncated = render(
        chosen,
        label=args.session_label or session_label(path),
        headline=args.headline,
        who=args.who,
        max_chars=args.max_chars,
        max_lines=args.max_lines,
        source=path.name,
    )

    if args.output:
        Path(args.output).write_text(slide, encoding="utf-8")
        print(f"wrote {args.output}", file=sys.stderr)
    else:
        print(slide)

    print(f"{len(chosen)} turns drafted, {truncated} cut short", file=sys.stderr)
    if len(chosen) > 10:
        print(
            "note: more than ten turns on one tape — consider splitting the slide,\n"
            "      the audience reads the current turn and skims the two above it.",
            file=sys.stderr,
        )


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="transcript_to_slide.py",
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--project", help="directory the session ran in (default: cwd)")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_list = sub.add_parser("list", help="sessions recorded for this project")
    p_list.add_argument("--limit", type=int, default=15)
    p_list.set_defaults(func=cmd_list)

    common = argparse.ArgumentParser(add_help=False)
    common.add_argument("session", nargs="?", default="latest",
                        help="session id, id prefix, path, or 'latest'")
    common.add_argument("--thinking", action="store_true",
                        help="include the agent's reasoning blocks")
    common.add_argument("--sidechains", action="store_true",
                        help="include subagent turns")

    p_turns = sub.add_parser("turns", parents=[common], help="numbered turn list")
    p_turns.add_argument("--json", action="store_true", help="machine-readable dump")
    p_turns.add_argument("--width", type=int, default=96)
    p_turns.add_argument("--only", help="show only these roles, e.g. user,agent")
    p_turns.set_defaults(func=cmd_turns)

    p_scaf = sub.add_parser("scaffold", parents=[common], help="draft a conversation slide")
    p_scaf.add_argument("--pick", required=True, help="turn numbers, e.g. 1,4,7-9")
    p_scaf.add_argument("--headline", default="Session walkthrough")
    p_scaf.add_argument("--session-label", help="the `session:` prop (default: session title)")
    p_scaf.add_argument("--who", help="cap on user turns, e.g. Oliver")
    p_scaf.add_argument("--max-chars", type=int, default=240)
    p_scaf.add_argument("--max-lines", type=int, default=4, help="lines kept from tool output")
    p_scaf.add_argument("-o", "--output", help="write here instead of stdout")
    p_scaf.set_defaults(func=cmd_scaffold)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
