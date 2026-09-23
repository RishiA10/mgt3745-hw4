# Architecture

Status: ACTIVE in Module 3.

## Gate

Name hard constraints and three concrete options. Weights and scores use 1–5; a score of 5 always means most favorable. Define 1/3/5 anchors. Multiply weights by scores and sum. Record estimates and run one sensitivity check.

Hard Constraints: The feature must have 0 monetary cost, run in the provided Codespace, use HTML, CSS, and JavaScript, persist submitted availability using localStorage, and be simple enough to inspect and verify before the assignment deadline. 

Scoring anchors: (Scores use a 1-5 scale where 5 is the most favorable)
- 1 = Poor fit: expensive, slow, hard to inspect, or does not meet the specification well
- 3 = Acceptable fit: meets the basic need but involves noticeable trade-offs.
- 5 = Strong fit: low cost, quick to implement, easy to inspect, and closely meets the specifications well.

| Criterion | Weight | Hand-built option | Existing-service option | AI-assisted build |
|---|---:|---:|---:|---:|
| Cost to start |4 |5 |3 |5 |
| Cost to maintain |3 |5 |3 |4 |
| Time to working |4 |3 |4 |5 |
| Inspectability |5 |5 |2 |3 |
| Switching cost |2 |5 |2 |4 |
| Fit to spec |5 |5 |3 |4 |
| Weighted total | | 105 | 59 | 94 |

## Estimates
The hand-built option is expected to take a few hours to implement but has no monetary cost and keeps the code easy to inspect. An existing service could reduce some development time but might bring limitations, external dependencies, or costs. An AI-assisted build could be completed quickly at no monetary cost, but the generated code would still need to be checked and verified against the specification. 

## Sensitivity Check
Inspectability received a weight of 5 because I need to understand and verify the implementation myself. If the weight for inspectability were reduced from 5 to 3, the hand-build option would decrease from 105 to 95, the existing-service option would decrease from 59 to 55, and the AI-assisted build would decrease from 94 to 88. The hand built option would still have the highest weighted total, so the direction would still be the same. 

## The Gate: HW4 rerun

Where should entries live now that they must survive a cleared cache?

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---|---|---|---|
| Cost to start |4 |5 |3 |5 |
| Cost to maintain |3 |5 |3 |4 |
| Time to working |4 |3 |4 |5 |
| Inspectability |5 |5 |2 |3 |
| Switching cost |2 | *scored from Session B experience* | | |
| Fit to spec |5 |5 |3 |4 |
| **Weighted total** | | | | |

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** Proposed
**Supersedes:** ADR-001

### Context
What data leaves the browser, to which vendor, under what terms, and who is accountable.

### Decision

### Alternatives considered

### Consequences
At least one thing that got harder.

### Revisit trigger
```


## ADR-001

Title and date: September 16, 2026 - Hand-build the member availability feature
Status: Superseed by ADR-002
Door / concrete acquisition and execution choice: Build - hand-build the feature using HTML, CSS, JavaScript, and browser localStorage
Context: The selected feature allows competitive dance team members to submit unavailable times and view their submitted availability. The project has a zero-dollar budget and must be completed before the deadline. The implementation also needs to run in the Codespace and be simple enough for me to inspect and verify against the specification. The Build-Buy-Delegate Gate gave the hand-built option the highest weighted score at 105, compared with 94 for an AI-assisted build and 59 for an existing service. 
Decision: I plan on hand-building the member availability entry feature using HTML for structure, CSS for presentation, JavaScript for behavior, and localStorage for persistence
Consequences and revisit trigger: This keeps the implementation inexpensive, directly aligned with the specification, and easier for me to inspect and verify. However, the feature will only store data in the user's browser and will not provide shared availability across different team members. It also requires more manual development time than relying primarily on an AI-assisted build. The localStorage decision should be revisited when the project requires shared storage in a later module. 
