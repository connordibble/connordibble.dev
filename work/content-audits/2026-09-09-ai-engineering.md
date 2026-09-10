# Homepage content audit: engineering with agents

Reviewed September 9, 2026. Scope: the former “Prototype → platform” section and its claims in the surrounding homepage. This is a positioning audit informed by selected primary sources, not a benchmark or a claim that the portfolio implements every technique discussed below.

## Finding

The section made concrete engineering experience look generic. Seven clickable stages hid the examples behind abstract claims. Simulated review and release artifacts looked like product evidence, while adoption and research metrics from different projects appeared to form one continuous delivery story. The sequence also suggested a fixed process that every agent task should follow.

The replacement shows four practices with direct links to the project that supports each claim. It uses ordinary headings and visible prose, with no simulated status badges or staged workflow. It distinguishes coding with agents from the approval and publishing boundaries in products that use generated output.

## What current primary sources support

| Engineering concern | Source finding | Content decision |
| --- | --- | --- |
| Usable repository context | OpenAI describes making repository knowledge and running applications accessible to coding agents, with architectural rules enforced by tools. | Lead with repository instructions and executable checks. Link to dibble as the concrete example. |
| Outcome verification | Anthropic distinguishes an agent’s transcript from the resulting environment state. Its evaluation guidance combines deterministic, model, and human grading according to the task. | Describe checks against the published edition and browser behavior. State separately that editorial support still needs judgment. |
| Changing model capabilities | Anthropic’s long-running application experiments removed orchestration that had become unnecessary as the model improved. | Remove the fixed seven-stage sequence. Do not present an evaluator agent or a person approving every step as a universal requirement. |
| Durable boundaries | Anthropic describes separating session history, execution environments, and the agent loop so implementations can change independently. | Keep the emphasis on explicit contracts. Do not claim that these portfolio projects implement managed sandboxes or a durable agent runtime. |

Sources, reviewed on the date above:

- OpenAI, [Harness engineering](https://openai.com/index/harness-engineering/), February 11, 2026.
- Anthropic, [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), January 9, 2026.
- Anthropic, [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps), March 24, 2026.
- Anthropic, [Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents), April 8, 2026.

These are findings from their systems. They do not establish the same results for Connor’s projects. The homepage describes the existing projects; it does not borrow vendor throughput or cost figures.

## Evidence and limits

- **dibble:** portable skills and command-line checkers are described in the existing project record. Guidance and enforcement have different roles; a skill is not an access-control boundary.
- **Section One:** the shared publication contract and browser checks support the verification example. Structural checks do not prove factual accuracy. The published essay preserves the limits on unattended curation and unmeasured model savings.
- **DesignRail:** review before export is an implemented product boundary. It is not presented as proof that every action by a coding agent needs a human approval.
- **Enterprise experience:** SFDS adoption and State Farm team counts remain in the career sections. They are not evidence of an enterprise-wide autonomous engineering rollout.

## Further evidence worth collecting

Future case studies could report representative task results across model changes, including retries, review time, regressions, and cost per accepted result. They could also demonstrate whether durable handoffs or an additional evaluator improve completion on those tasks. Until measured, those remain evaluation questions.

Permission scope, isolated execution, and recovery after interrupted runs are useful subjects for a later writeup if there is shareable implementation evidence. No private curation policy, source-selection method, operational recipe, or review threshold belongs in this portfolio audit.

## Maintenance rule

Keep homepage claims attached to named projects and observable behavior. Move technical detail into the linked case study. Revisit workflow recommendations when models change, and remove steps that no longer earn their cost. Avoid “cutting edge” as a self-description; the evidence should establish currency.
