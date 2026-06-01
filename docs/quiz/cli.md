# OpenSpec CLI Quiz

Each question lists the command(s) that lead to the answer.
For Google Forms: questions marked **(MC)** are multiple-choice; **(SA)** are short-answer.

---

## Section 1 — Navigating changes (`openspec list`)

### Q1 (MC)
How many changes are currently proposed in this project?

- 4
- 5
- **6** ✓
- 8

---

### Q2 (MC)
Which change has the fewest implementation tasks?

- us-01-animal-list
- us-03-add-animal
- us-04-update-animal
- **us-05-delete-animal** ✓ (13 tasks)

---

### Q3 (MC)
Which two changes have exactly the same number of implementation tasks?

- us-01-animal-list and us-03-add-animal
- **us-02-animal-profile and us-06-dashboard** ✓ (16 tasks each)
- us-03-add-animal and us-05-delete-animal
- us-04-update-animal and us-06-dashboard

---

## Section 2 — Reading a change (`openspec show <change>`)

### Q4 (MC)
How many capabilities does `us-05-delete-animal` introduce or modify in total?

- 1
- 2
- **3** ✓ (1 new: `animal-delete`; 2 modified: `animal-profile`, `animal-list`)
- 4

---

### Q5 (SA)
`us-05-delete-animal` explicitly considered and rejected one alternative deletion strategy. What was it?

**Answer:** Soft delete / archiving

---

### Q6 (MC)
Which change introduces the `animal-profile` capability for the first time?

- us-01-animal-list
- **us-02-animal-profile** ✓
- us-04-update-animal
- us-05-delete-animal

---

### Q7 (SA)
Which Angular Material component is used for the confirmation dialog in `us-05-delete-animal`?

**Answer:** MatDialog (`angular/material MatDialog`)

---

### Q8 (MC)
Which change modifies the `animal-list` capability the most times across all proposals? (Hint: check multiple changes.)

- us-01-animal-list
- us-02-animal-profile
- us-03-add-animal
- **All of us-02, us-03, and us-05 modify it** ✓

---

## Section 3 — Artifact completion (`openspec status --change <change>`)

### Q9 (MC)
How many artifacts must be complete before a change is considered done in the `spec-driven` schema?

- 2
- 3
- **4** ✓ (proposal, specs, design, tasks)
- 5

---

### Q10 (MC)
In what order does the `spec-driven` schema expect artifacts to be created?

- proposal → design → specs → tasks
- **proposal → specs → design → tasks** ✓
- specs → proposal → design → tasks
- design → proposal → specs → tasks

---

## Section 4 — Schema & config (`openspec schemas`)

### Q11 (SA)
What is the name of the workflow schema used by this project?

**Answer:** spec-driven

---

## Section 5 — Bonus: chained commands

### Q12 (MC)
Find the change(s) with the most implementation tasks, then check their artifact status. What do you find?

- Most tasks: us-03-add-animal — artifacts incomplete
- Most tasks: us-06-dashboard — all artifacts complete
- **Most tasks: us-01-animal-list and us-04-update-animal (tied at 19) — both have all 4 artifacts complete** ✓
- Most tasks: us-02-animal-profile — proposal missing
