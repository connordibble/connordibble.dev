# Code Got Cheap. Review Didn't.

**Status:** draft for Connor's review
**Proposed slug:** `code-got-cheap-review-didnt`
**Subtitle:** Coding agents moved the constraint from writing software to verifying it. Notes on protecting reviewer attention, from the Software Factories track to my own queues.
**Topics:** Developer Productivity · AI Tooling · Technical Leadership
**Read time:** ~7 min
**Related:** writing/agentic-software-needs-a-design-system · project/designrail · project/researchlog
**Figures:** `authoring-vs-verification` (Zone), `review-attention-split` (FigureTable)
**Assets:** none required; optional screenshot of a DesignRail proposal with findings attached
**Notes for Connor:** the opening references the Software Factories track generically. If a specific demo stuck with you, one concrete sentence there would do a lot of work.

---

## The Waiting Part

The Software Factories track at this year's AI Engineer World's Fair was a parade of agents opening pull requests. Demo after demo ended the same way: a plausible diff, produced in seconds, waiting for a person. The generation was the show. The waiting was an afterthought.

The waiting is the part I care about. Every team I know that adopted coding agents hit the same wall soon after: the code got cheap, and review didn't. The constraint on shipping didn't disappear. It moved.

The most careful measurement we have says the bill lands even earlier than the pull request. [METR's randomized trial](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) of experienced open-source developers found tasks took 19% longer when AI assistance was allowed, while the same developers estimated afterward that it had made them 20% faster. A large share of the lost time went to reviewing and correcting model output. Verification was already eating the speedup at the individual scale, before the queue ever saw it.

> Figure: `authoring-vs-verification`
> Caption: The stage that got faster is not the stage that sets the pace.
> Spec (Zone): two labeled zones side by side. Zone A "Authoring" with items: draft, scaffold, refactor, test boilerplate; marked "accelerated". Zone B "Verification" with items: review, validate, integrate, own the consequences; marked "unchanged, now the constraint" with the single accent element.

## Review Was Always the Expensive Part

Review was the scarce resource before agents arrived. It runs on senior attention, which is the one input that doesn't scale with a bigger API bill. A thorough review requires holding the change, the system around it, and the intent behind it in one head at the same time. That was hard when a teammate wrote the diff over two days. It is harder when an agent wrote it in forty seconds and the author can't answer questions about it.

The ceiling on careful review was measured long before agents arrived. The [Cisco review study](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/) that SmartBear ran, still the largest published, found defect discovery falls off past roughly 400 lines per sitting and drops hard when reviewers move faster than about 500 lines an hour. Those limits describe human attention. Nothing about the author being an agent raises them.

Teams feel this as a queue. The queue grows, and the organization quietly adjusts in the worst available way: reviews get shallower. "LGTM" culture is usually diagnosed as a discipline problem. In my experience it is a load problem. People skim because the queue is longer than their attention, and nobody redesigned the system when the volume changed.

Review latency is the new build time. Organizations spent a decade driving CI from hours to minutes, then let a review queue measured in days sit in the middle of the same delivery path without a second look.

## Shrink the Unit of Review

The first fix is choosing what a reviewer actually looks at, and it is a design decision, not a triage habit.

ResearchLog taught me this at the queue layer. The system classifies development activity with a model, and the early question was what unit to classify: every commit, or the pull request they roll up into. We chose the PR, because that is the unit a reviewer can hold and the unit the product decision lives at. The same logic applies to human review of agent output. An agent that opens one reviewable, narratable change is useful. An agent that opens nine hundred lines across four concerns is generating review debt, and the interest rate on the senior engineers' calendar is steep.

The debt is already visible at ecosystem scale. [GitClear's analysis](https://www.gitclear.com/ai_assistant_code_quality_2025_research) of hundreds of millions of changed lines found duplicated code blocks rising sharply as AI authorship grew, and 2024 was the first year the introduction of copy-pasted code outran refactoring. That is what merged-but-barely-reviewed looks like when you zoom out far enough.

The standard doesn't shrink. The unit does.

## Move the Deterministic Work Off the Reviewer

The second fix is refusing to spend human attention on anything a machine can check.

On SFDS, automated compliance checks ran before human review, so drift never made it to a person: wrong tokens, unapproved variants, missing accessibility structure. The reviewer's attention went to judgment, which is the only thing it is actually for. I built the same split into agent-readiness-kit, my open-source scorer for whether a repo is ready for coding agents. Most of what it scores is deterministic gates: does the repo have machine-checkable rules an agent's output must pass before a human ever reads the diff?

> Figure: `review-attention-split`
> Caption: If a rule can be written down, it can be enforced before review. What remains is what humans are for.

| Belongs to a validator | Belongs to a reviewer |
| --- | --- |
| Token and API existence | Whether the change should exist |
| Lint, types, formatting | Whether the abstraction will age |
| Accessibility structure | Whether the tradeoff is priced honestly |
| Import and dependency rules | Whether the tests prove the claim |

Every deterministic finding that reaches a human review is a small tax on the only budget that matters. At agent volume, the small tax compounds into the whole bill.

## Make Review Teach the System

The third fix is the one most teams skip. A review is a judgment from your most expensive people, and most organizations throw it away after the merge button.

DesignRail records the decision: what was proposed, what the checks found, what the human accepted or corrected. That record is what lets the system improve, because a corrected proposal points at the exact gap, in the mapper, the docs, or the component API, that produced the bad draft. Agent-assisted development needs the same loop. If reviewers keep rejecting the same class of change, that pattern is a finding about your harness, and it is only visible if rejections leave a trace somewhere other than a closed tab.

Review that teaches nothing is a toll. Review that feeds the harness is a flywheel, and the difference is whether anyone wrote the decision down.

## What I Would Carry Forward

Reduced to a sentence: when authoring gets cheap, reviewer attention becomes the system constraint, and it has to be engineered like one.

- Treat review latency as a first-class delivery metric. Teams that graph CI minutes and ignore a multi-day review queue are optimizing the wrong stage.
- Set the unit of review deliberately. One narratable change per review; an agent that can't produce that needs a smaller task, not a patient reviewer.
- Enforce every writable rule before a human looks. Deterministic checks in CI are the cheapest reviewer you will ever hire.
- Read shallow reviews as a load signal, not a values problem. The fix is system design, and lectures about rigor don't reduce queue depth.
- Record review decisions where the system can learn from them. A rejection that leaves no trace will be repeated at agent speed.
- Protect the people who review well. In an agent-heavy codebase they are the constraint, and burning them out is an architecture failure.

## The Broader Point

Every productivity wave moves the bottleneck instead of removing it. Compilers moved it from writing machine code to designing programs. CI moved it from integration to review. Agents are moving it from authoring to verification, and the teams that notice early will spend their senior attention like the scarce capital it is.

The pull request queue is now the clock speed of the organization. It deserves the same engineering the build got.

---

## Sources (draft staging: become inline `links` on port)

- METR, [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) (also [arXiv:2507.09089](https://arxiv.org/abs/2507.09089))
- SmartBear, [Best Practices for Peer Code Review](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/) (Cisco study: 200–400 LOC ceiling, ~500 LOC/hr rate limit)
- GitClear, [AI Copilot Code Quality research](https://www.gitclear.com/ai_assistant_code_quality_2025_research) (duplication vs refactoring crossover, 2024)
