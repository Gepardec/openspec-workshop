---
theme: ./
title: Gepardec Theme — Example Deck
info: |
  Example deck demonstrating the Gepardec Slidev theme.
class: text-center
highlighter: shiki
drawings:
  persist: false
mdc: true
layout: cover
---

# Java Enterprise<br/>Modernization

## Quarkus, Jakarta EE, OpenShift

A technical deep-dive — March 2026

---
layout: section
---

# Part 1

## Why modernize now?

---
layout: default
---

# Why modernize now?

- NIS2 and DORA compliance pressure is real and dated
- Java EE 7 and JBoss EAP 6 are out of vendor support
- Dependency drift turns every release into a risk event
- Modernization unlocks **velocity**, not just compliance

---
layout: default
---

# Our approach

- Gradual modernization — step-by-step with a clear target architecture
- **Bridge, not endpoint** — JSF stays while Quarkus comes in
- Security integrated, not bolted on
- Continuity through stable Austrian teams

---
layout: two-cols
---

::title::

# Tech stack comparison

::left::

### Legacy
- Java EE 7
- JBoss EAP 6
- Manual dependency updates
- Monolithic deploys

::right::

### Target
- Jakarta EE 10 + Quarkus
- OpenShift / Kubernetes
- Automated via Renovate
- CI/CD with rollback

---
layout: default
---

# Code example — CDI events

```java
@ApplicationScoped
public class OrderService {

  @Inject
  Event<OrderPlaced> orderEvents;

  @Transactional
  public void placeOrder(Order order) {
    repository.save(order);
    orderEvents.fire(new OrderPlaced(order.id()));
  }
}
```

Use `@ObservesAsync` on the consumer for true async handling.

---
layout: statement
---

# We only recommend<br/>**what we can technically justify.**

---
layout: end
---

# Danke.
