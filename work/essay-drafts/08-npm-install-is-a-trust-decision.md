# npm install Is a Trust Decision

**Status:** draft for Connor's review
**Proposed slug:** `npm-install-is-a-trust-decision`
**Subtitle:** Coding agents made adding a dependency effortless, and attackers noticed first. The supply-chain discipline that holds up is old, boring, and newly urgent.
**Topics:** Security · Platform Engineering · AI Tooling
**Read time:** ~7 min
**Related:** writing/code-got-cheap-review-didnt (if published) · project/researchlog
**Figures:** `install-trust-decisions` (FigureTable)
**Assets:** optional screenshot of a socket scan or `pnpm audit` run in CI
**Notes for Connor:** the security tracks ran on two separate days at the fair this year; if you sat in on a specific supply-chain talk, a one-line reference would ground the opening further.

---

## The Rule That Sounds Paranoid

My repositories carry a dependency policy that reads like paranoia: exact versions only, no `^` or `~`. A supply-chain scan before anything new is installed. An audit after every install session. The lockfile is committed, always. And one rule written specifically for the age we're in: no package suggested by an AI gets installed until a human confirms it exists and is the thing it claims to be.

That last rule sounds excessive until you watch a coding agent confidently invent a package name. The security tracks at this year's AI Engineer World's Fair kept circling the same territory, and for good reason. Agents changed the economics of installation, and the attackers adjusted faster than most engineering policies did.

## The Friction Was a Feature

Installing a dependency used to be a small ceremony. You searched for the package, skimmed the README, checked the last publish date, maybe glanced at the issue tracker and the weekly downloads. Not because anyone trained you to, but because installation had enough friction that you were paying attention while you did it.

Agents remove the ceremony. A dependency arrives mid-task, one line in a diff that contains forty other lines, chosen by a system optimizing for the task compiling. The agent is not lazy or malicious. It simply does not carry the suspicion a human accumulates after years of watching the ecosystem misbehave. Installation went from a deliberate act to a side effect, and the review that used to happen implicitly now has to happen on purpose.

The friction was never the problem. The friction was the checkpoint.

## Hallucinated Names Are an Attack Surface

Here is the part that would have sounded like science fiction a few years ago. Models suggest packages that do not exist, at rates that are no longer anecdotal. A [USENIX Security study](https://arxiv.org/abs/2406.10279) generated over half a million code samples across sixteen models and found 19.7% of recommended packages were hallucinated. Worse for defenders, the phantoms are consistent: when the researchers re-ran hallucination-producing prompts ten times, 43% of the invented names came back in every single run. A name a model repeats on schedule is a name an attacker can register in advance. Seth Larson, the Python Software Foundation's security developer-in-residence, gave the technique its fittingly stupid name: [slopsquatting](https://socket.dev/blog/slopsquatting-how-ai-hallucinations-are-fueling-a-new-class-of-supply-chain-attacks).

It is typosquatting's smarter cousin. Typosquatting waits for a human to fumble a keyboard. Slopsquatting waits for a model to fumble its training distribution, at scale, on a predictable schedule. The phantom package gets registered, an agent suggests it into somebody's diff, the install succeeds, and the postinstall script does its work before anyone asks why the package has eleven downloads and a name that is almost, but not quite, the library everyone actually uses.

The defense is ordinary: check that the package exists, is maintained, and is popular enough that a thousand other teams would have screamed first. That check used to be a reflex. Now it has to be a rule.

## The Countermeasures Are Boring

Nothing in the effective playbook was invented for AI. That is the good news.

| Trust decision | Before agents | With agents in the loop |
| --- | --- | --- |
| Does this package exist and is it the real one? | Human reflex during search | Explicit verification rule, written down |
| What version am I actually running? | Ranges, mostly fine | Exact versions only; the lockfile is law |
| Did the install change anything else? | Occasional lockfile skim | Audit after every install session |
| Is the maintainer trustworthy? | Reputation absorbed over time | Scan provenance and scripts before install |
| Do we need this dependency at all? | Sometimes asked | Asked every time, because installs are now free |

> Figure: `install-trust-decisions`
> Caption: The same five questions as 2015. The difference is who has to ask them out loud.

Exact versions and a committed lockfile turn "what is running in production" from a probability into a fact. Scans catch the postinstall scripts and the provenance oddities. Download-count heuristics are crude, and they work, because a supply-chain attack's hardest problem is looking established before it gets caught.

The playbook is boring on purpose. Boring rules are the ones agents follow reliably, which brings me to the interesting part.

## Put the Policy Where the Agent Reads

A dependency policy that lives in a senior engineer's head worked, barely, when every install passed through a senior engineer. It does nothing when the installer is an agent reading the repository's instruction files.

So the policy moves into the harness. My repos state the dependency rules in the agent instructions themselves: verify before install, exact versions, scan first, audit after. Written policy has a property tribal knowledge never had, which is that agents actually follow it, more consistently than tired humans do. The same rules get scored by agent-readiness-kit, my open-source checker for whether a repo is ready for coding agents, because a repo that hands an agent install rights without written install rules has left the interesting decision to chance.

CI is the second reader. Lockfile diffs reviewed like code, audits that fail the build, scans on anything new. The agent follows the written rule; the pipeline catches the day it doesn't.

I keep the same posture in my own published code. zod-ai-tool defines AI tool schemas once with Zod and compiles them for Anthropic, OpenAI, and Gemini, and it does that without depending on any provider SDK. Partly that is API design. Partly it is arithmetic: every dependency a library carries is a trust decision it makes on behalf of every downstream user, and the number of those decisions I want to make for other people is as close to zero as I can manage.

## What I Would Carry Forward

Reduced to a sentence: agents made installation frictionless, so the trust checks that friction used to buy have to become written policy enforced by machines.

- Write the dependency policy into the files agents read. A rule that lives in review culture is invisible to the thing now doing the installing.
- Verify that suggested packages exist before installing them. Hallucinated names are registered by people who are counting on you not to look.
- Pin exact versions and commit the lockfile. Reproducibility is the difference between an incident and a mystery.
- Audit and scan on a rhythm, not on suspicion. The attack that matters will not announce itself in the diff you happened to read closely.
- Treat popularity as a signal with real information in it. A package with almost no users has almost no witnesses.
- Count dependencies as trust decisions, especially in libraries. Every one you take is one you impose on everyone downstream.

## The Broader Point

Supply-chain security has always been a story about trust moving faster than verification. Package registries made sharing code effortless in 2010, and it took the ecosystem a decade of incidents to grow lockfiles, audits, and provenance tooling in response. Agents are the same story compressed: installation became effortless again, and the verification has to catch up again, faster this time.

The tools are already on the shelf. What changed is that the discipline can no longer be a reflex. It has to be written down, because the newest member of the team only reads what's written.

---

## Sources (draft staging: become inline `links` on port)

- Spracklen et al., [We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs](https://arxiv.org/abs/2406.10279), USENIX Security 2025 (19.7% hallucination rate; 43% of phantom names repeated in all ten re-runs)
- Socket, [The Rise of Slopsquatting](https://socket.dev/blog/slopsquatting-how-ai-hallucinations-are-fueling-a-new-class-of-supply-chain-attacks) (term coined by Seth Larson, PSF)
