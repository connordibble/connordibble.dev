# Two Months, No Handoffs

**Status:** draft for Connor's review
**Proposed slug:** `two-months-no-handoffs`
**Subtitle:** An executive deadline, a small horizontal team, and what the tiny-teams conversation gets right about decision latency, and wrong about headcount.
**Topics:** Technical Leadership · System Design
**Read time:** ~7 min
**Related:** project/agent-convention-feedback · writing/the-summary-is-not-the-evidence (when published)
**Figures:** `one-boundary-vs-four` (Zone)
**Assets:** none required
**Notes for Connor:** numbers used are the ones already public in the project writeup (two months, 800+ datapoints, 197 agents, 10,000+ agency force). Confirm the team size wording ("small horizontal team") is how you want it stated publicly.

---

## The Fashionable Version

Half the hallway conversations at this year's AI Engineer World's Fair eventually arrived at the same boast: three people shipping what used to take thirty. Tiny teams are having a moment, and agents are getting the credit.

I believe the boast more than I believe the explanation. The fastest delivery I have been part of predates most of the tooling being celebrated, and the speed came from somewhere older and less glamorous. We didn't hand anything off.

## The Ask

The setup was simple and the clock was real. State Farm's EVP of enterprise technology wanted a better read on what the agency force experiences across service and support workflows, and wanted it in time for agency convention. A small horizontal team took the problem: roughly two months from concept to production.

Scope stayed honest. This was a convention pilot, built to capture feedback live on the floor and synthesize it while leaders were still walking around. It captured 800+ datapoints from 197 agents, held up during the event, and earned the backing to grow into the standing channel for the 10,000+ agency force. It was not that standing channel yet, and pretending otherwise would miss what actually made it work.

A two-month executive deadline strips away pretend architecture. What it exposed underneath was an org-design lesson I have been re-using ever since.

## Handoffs Are Where the Weeks Go

The default enterprise shape for that project is easy to sketch. A data team owns capture. A platform team owns the pipeline. An analytics team owns synthesis. A frontend team owns the dashboard. An ops function owns the launch. Five competent groups, and between each pair, a boundary.

Every boundary charges twice. It charges queue time, because the other team has its own sprint and its own definition of urgent. And it charges translation loss, because context gets flattened into tickets, and the ticket never carries the why. Neither cost shows up in anyone's status report. Both compound. A decision that takes an afternoon inside one team takes two weeks when it crosses a boundary, and a two-month project only contains four of those.

We shipped in two months because the team owned the whole loop: capture, synthesis, dashboard, and the deploy and rollback path under it. When the synthesis output looked wrong against live comments, the person who noticed was the person who could fix it, that afternoon. No ticket, no waiting for another team's sprint boundary to come around.

> Figure: `one-boundary-vs-four`
> Caption: The same work, drawn two ways. Each internal boundary adds queue time and subtracts context.
> Spec (Zone): top row, five small zones in sequence (capture → pipeline → synthesis → dashboard → launch) separated by four marked boundaries. Bottom row, one wide zone containing all five stages, no internal boundaries, accent on the single outer border.

## Small Teams Need Whole Problems

The tiny-teams conversation focuses on the number and misses the precondition. A small team is fast when it owns a whole problem. A small team that owns half a problem is just a big team's dependency with less negotiating power.

That inverts the usual scoping instinct. Instead of shrinking the team to fit the budget, the harder and more useful move is shrinking the problem's boundary until one team can hold all of it: the user-facing surface, the data under it, the operational path, and the authority to make decisions inside that boundary without external sign-off. The convention pilot had exactly that shape, deliberately. Everything the team needed to change was inside the wall.

This is [Conway's law](https://www.melconway.com/Home/Committees_Paper.html) used as a tool instead of suffered as a fate, what [Team Topologies](https://teamtopologies.com/) formalized as the inverse Conway maneuver: draw the ownership boundary first, around a problem one team can hold at reasonable cognitive load, and let the architecture inherit that shape.

## What Tiny Teams Give Up

The costs were real, and pretending the mode is free is how organizations misuse it.

Bus factor was thin; a small team under a deadline concentrates knowledge in very few heads. Review depth was thinner than I would accept on a platform with a decade of life ahead of it. The pace borrowed energy that a team can spend for two months and cannot spend for two years. And the mode has an expiration date built in: the thing that made the pilot fast, one team holding everything, is exactly what a standing enterprise channel cannot keep. Retention policy, permissions, longitudinal reporting, and a support rotation all pull the system back toward specialized ownership, and they should.

The staff-level skill is knowing which phase you are in, and changing gears on purpose instead of after the first incident. Defending the tiny-team shape past its phase is how the mode gets a bad name.

## Where Agents Actually Fit

So what did the fair's version get right? Agents genuinely widen the boundary one team can hold. Work that used to force a handoff, the dashboard nobody had frontend capacity for, the data plumbing nobody had platform capacity for, increasingly fits inside the wall. That part of the boast checks out, and it is why the tiny-teams moment is real rather than nostalgia for garage startups.

What agents do not change is the precondition. They raise the ceiling on how much problem fits inside one accountability boundary. They do nothing about a boundary drawn wrong. A three-person team threaded through five approval gates ships at the speed of the gates, with or without a copilot, and I have watched well-tooled teams discover that the expensive way.

The tool got better. The org-design homework is the same assignment it always was.

## What I Would Carry Forward

Reduced to a sentence: team speed is set by decision latency, decision latency is set by boundaries, and the boundary is the thing leadership actually controls.

- Count the boundaries before counting the heads. A project's calendar time is dominated by how many teams a decision has to cross, and each crossing charges queue time plus context loss.
- Scope problems to fit inside one accountability boundary. Whole ownership of a small problem beats partial ownership of a big one at almost any team size.
- Give the team the operational path, and the authority, along with the feature work. A team that cannot deploy, roll back, and decide without permission does not really own the loop.
- Price the costs honestly when you choose the tiny-team mode. Thin bus factor and borrowed pace are loans, and the payment comes due.
- Plan the gear change before the pilot succeeds. The structure that wins the deadline is rarely the structure that should run the standing system.
- Let agents widen the boundary, and keep drawing it deliberately. Better tools raise the ceiling on ownership; they do not repair a boundary drawn around the wrong thing.

## The Broader Point

Organizations keep looking for speed in tooling, and the tooling keeps improving, and delivery keeps taking as long as the boundaries dictate. The convention pilot was the cleanest demonstration I have had: the technology was ordinary, and it outpaced projects with far larger staffing, because decisions never had to leave the room.

Tiny teams are the fashionable framing this year. Decision latency is the durable one. When the fair moves on to the next theme, the boundaries will still be setting the clock.

---

## Sources (draft staging: become inline `links` on port)

- Melvin Conway, [How Do Committees Invent?](https://www.melconway.com/Home/Committees_Paper.html) (1968)
- Skelton & Pais, [Team Topologies](https://teamtopologies.com/) (stream-aligned teams, inverse Conway maneuver)
