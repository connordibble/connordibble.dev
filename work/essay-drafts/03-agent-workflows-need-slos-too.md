# Agent Workflows Need SLOs

**Status:** edited, ready for Connor's review (filename kept; dropped "Too" from the title)
**Proposed slug:** `agent-workflows-need-slos`
**Subtitle:** The model call is one dependency in a longer system. What queues, replays, cost ceilings, and ownership look like once people start waiting on an agent's output.
**Summary:** An agent workflow becomes a service boundary the moment a team depends on it. The unit of work, replay semantics, workflow-level observability, cost ceilings, and a named owner are the operating model that makes the output dependable.
**Topics:** AI Tooling · Platform Engineering · System Design
**Read time:** ~9 min
**Related:** project/researchlog · writing/when-the-model-is-a-draft · writing/success-was-the-incident
**Figures:** `beside-vs-in-path`, `reliability-concerns` (built in `src/components/writing-figures.tsx`)

---

## When a Team Starts Waiting

An AI workflow changes character the moment a team begins waiting on it.

While a model call sits beside the delivery path, a failure is an inconvenience. A developer ignores the suggestion, reruns the prompt, or finishes the work by hand. Once the workflow gates a review, classifies evidence, checks compliance, or feeds a dashboard an executive reads, people depend on its output, other systems read from it, and its failures land somewhere whether or not anyone owns them.

> Figure: `beside-vs-in-path`
> Caption: The threshold that changes the engineering. Nothing about the model moved; the dependents did.

That threshold is why agent workflows need SLOs. The model is not the reason. The waiting is.

## One Question, Four Systems

I keep crossing this boundary in different domains, and the versions rhyme. ResearchLog ingests GitHub activity through a background queue and classifies it against the IRS four-part test, with reviewers depending on the results. A design-system validator runs in CI, where a false failure blocks someone's merge. DesignRail records component-mapping decisions other exports build on. The feedback platform synthesized live convention comments into themes [while executives were reading the dashboard](/writing/the-summary-is-not-the-evidence).

Different products, one reliability question: what happens when the workflow is slow, wrong, duplicated, half-finished, rate limited, or more expensive than planned? Web engineering trained us to ask exactly that about APIs and databases. An agent workflow deserves the same scrutiny, and it usually gets less, because the model call soaks up all the attention. The model call is rarely the part that fails first.

## The Queue Is a Product Surface

A queue is where a workflow admits that work takes time, which makes it a product surface even when no user ever sees it.

The load-bearing decision is the unit of work. ResearchLog classifies at the pull-request level, with commits rolling up to their parent PR. That one choice does product work and reliability work at the same time: the system classifies the unit a reviewer actually cares about, gains a natural retry boundary, and stops paying to classify a hundred commits when the product only needs a judgment on the PR. Model spend stays predictable because the unit of work bounds it.

A queue design should be able to answer plain questions:

- What is the unit of work?
- Can that unit be retried safely?
- What happens after it fails several times?
- Who can see work that is stuck?
- Can a human replay the job after fixing the input or the dependency?

Pick the wrong unit and every answer downstream gets harder. A pipeline event, a design node, a comment, and a pull request all imply different retry and replay semantics, and no queue library chooses between them for you. The unit of work is the first design decision, made before any infrastructure is picked, or made badly by default.

## Replays Must Respect People

The sharpest reliability lesson I have hit in this space came from a ResearchLog write path. The naive loop was tidy: sync, classify, upsert, repeat. Then a manager overrides a classification, a backfill re-runs, and the automatic path overwrites the override with a fresh model draft. The job succeeded and still destroyed the one thing the system existed to protect. The fix, split write semantics with the guard living in the database, [is its own essay](/writing/when-the-model-is-a-draft).

What belongs in the reliability conversation is the general rule: idempotency for agent workflows has to cover more than duplicate rows. It has to cover protected judgment. A replay that erases a decision the workflow never saw is a bad replay, even when every job reports success.

The protected object changes by domain and the rule does not. In design-system automation it might be an approved exception that should survive the next generated suggestion. In feedback synthesis it might be a human correction to a theme. Every agent workflow that writes durable state has something a human decided, and the write path either respects it structurally or destroys it eventually.

## Observability Needs Workflow Semantics

Infrastructure metrics say a job failed. They do not say whether the workflow is doing its job.

An agent workflow needs the usual signals: latency, error rate, queue depth, retries, provider failures, token spend, rate-limit events. It also needs signals that only exist at the workflow's own level of meaning: how old the review queue is, how often jobs skip because a human already decided, which validation rules fire most, how many proposals go stale without a decision. Those are product health numbers wearing operational clothes, and no infrastructure dashboard will invent them for you.

The trap is watching only the dashboard you built to prove the workflow's value. On SFDS, a cost regression [surfaced first in firewall metrics in Elastic](/writing/success-was-the-incident), a layer below the adoption dashboards the team was proud of. Agent workflows have the same blind spot: provider usage, queue depth, and the cost curve often see a problem before the product view does. The signal that matters tends to arrive on the chart nobody was assigned to watch.

## Cost and Rate Limits Are Reliability Inputs

An agent workflow can fail by going over budget as surely as by throwing. The failure is quieter and the end state is the same: the team can no longer run the workflow the way it was designed.

Cost is an architecture input. ResearchLog's pull-request-level classification is a cost control expressed as a product decision. The design-system retrieval platform I built and then retired [lost partly on operating cost](/writing/teaching-ai-agents-to-use-a-design-system): vector hosting, a running server, and ingestion compute added up once the system was live, and a smaller approach carried the same weight. Rate limits belong in the same category. A provider that says "wait" is a dependency failure you design for, with backoff and a visible delay, rather than an edge case production discovers for you.

## Ownership Is the Last SLO

The hardest reliability failure is the one everyone can see and nobody owns.

Agent workflows cross awkward boundaries by their nature. A platform team owns the model integration, a product team owns the source data, someone else owns the review UI, and someone outside engineering owns the decision the output feeds. When a run fails, it looks like everyone else's problem, and the workflow degrades in full view of four teams with clean consciences.

An SLO, whatever the formality level, names three things: the promise, the signal that shows the promise slipping, and the person who acts when it does. Writing those down is what gives a team permission to treat the workflow as production software instead of an experiment people happen to rely on. The posture costs little early. DesignRail runs CI gates, release planning, and ADRs while it is still a Phase 1 project; the feedback platform shipped monitoring and a rollback path before its first live hour. Neither waited to be told the workflow mattered.

> Figure: `reliability-concerns`
> Caption: The concerns that turn an agent workflow into a service. The thresholds can stay internal; the categories cannot.

## What I Would Carry Forward

Reduced to a sentence: if an agent workflow can block, overwrite, spend, or mislead, it needs an operating model. The longer version:

- Define the unit of work before choosing the infrastructure. Pull requests, design nodes, comments, and pipeline events carry different retry and replay semantics, and the choice shapes cost as much as correctness.
- Treat idempotency as protection for human decisions. A replay that overwrites an override is an incident with a green status.
- Observe workflow semantics next to infrastructure health. Review-queue age, skipped writes, and stale proposals tell you things latency never will.
- Put cost ceilings and rate limits in the reliability plan. Budget exhaustion and provider throttling both take the workflow away from its users.
- Make replay a first-class operation. A person should be able to fix an input, rerun the unit, and see exactly what changed.
- Name the owner before the first live failure. Workflows that span teams need the escalation path written down in advance, because the failure will arrive on a boundary.

## The Broader Point

AI work usually starts as an experiment, and it should; that is the honest way to find a problem's shape. The mistake is letting the experiment's operating model outlive the experiment while its users quietly multiply.

Once people wait on the output, reliability is part of the product. The queue, the replay path, the cost ceiling, the workflow-level signals, and the named owner are how an organization knows the agent is still doing its job. Skip them and the workflow still runs. It just runs as something nobody promised, which everyone discovers on the day it stops.
