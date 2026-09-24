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

I kept the HW3 criteria and weights because cost, time, inspectability, switching cost, and fit to the specification still matter for this assignment. The major change is that browser-only persistence is no longer sufficient.

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---:|---:|---:|---:|
| Cost to start | 4 | 5 | 3 | 5 |
| Cost to maintain | 3 | 5 | 3 | 4 |
| Time to working | 4 | 3 | 4 | 5 |
| Inspectability | 5 | 5 | 2 | 3 |
| Switching cost | 2 | 3 | 2 | 2 |
| Fit to spec | 5 | 5 | 3 | 4 |
| **Weighted total** | | **103** | **66** | **91** |

The switching-cost score for Build is based on my actual migration experience rather than only an estimate. Moving from localStorage to Worker + D1 required changing the database schema, Worker routes, frontend persistence code, Cloudflare configuration, and deployment. The application code and SQL are still visible and portable, so I scored the switching cost as acceptable rather than poor. A hosted BaaS or AI-hosted builder would add more platform-specific storage or hosting dependencies, so I scored those alternatives lower.

The Build option remains the strongest fit for the assignment because it has no required monetary cost, keeps the server logic inspectable in this repository, and directly satisfies the requirement that entries leave the browser and persist remotely.

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** Accepted  
**Supersedes:** ADR-002

### Context

HW3 stored member availability in browser localStorage. That no longer meets the requirement because clearing browser site data removes the entries and another client cannot access the same stored data.

The data now leaving the browser consists of the availability date, start time, end time, and optional academic-conflict reason entered by the user. The browser sends those values to a Cloudflare Worker, and the Worker stores them in Cloudflare D1. Cloudflare may also receive request metadata associated with the request. This use is subject to the Cloudflare terms that apply to the account and services.

I am accountable for deciding what the application sends, keeping unnecessary information out of the database, configuring the Worker and D1 binding, and verifying the behavior of the deployed system.

### Decision

Store availability entries in Cloudflare D1 and access them through a Cloudflare Worker. The browser will use `fetch()` to GET and POST entries rather than reading from or writing to localStorage. The Worker will validate required input before inserting it and will use parameter binding for user-provided values.

### Alternatives considered

A hosted backend-as-a-service could provide remote persistence with less custom server code, but it would introduce another service abstraction and make the implementation less directly inspectable for this assignment.

Delegating the application and hosting to an AI builder could reduce initial implementation time, but it would make the generated backend and hosting decisions less transparent and could increase the work required to move the application later.

Keeping localStorage was also considered, but it no longer satisfies the requirement that entries survive cleared browser storage and be available beyond one browser.

### Consequences

Availability now survives independently of browser localStorage and can be read from another client that reaches the same Worker and D1 database.

The system is also more complicated. Saving and loading now depend on a network request, the deployed Worker, the D1 database, and correct Cloudflare configuration. Network failures and server errors are new failure modes that the page must handle visibly. Database schema changes and deployment are also additional maintenance steps that did not exist with localStorage.

The current implementation also does not provide authentication or per-user access control, so the stored availability should remain limited to the information needed for this assignment.

### Revisit trigger

Revisit this decision if the application requires authentication, per-member authorization, stronger privacy controls, substantially different scale or cost requirements, or a move away from Cloudflare.

## ADR-001

Title and date: September 16, 2026 - Hand-build the member availability feature
Status: Superseed by ADR-002
Door / concrete acquisition and execution choice: Build - hand-build the feature using HTML, CSS, JavaScript, and browser localStorage
Context: The selected feature allows competitive dance team members to submit unavailable times and view their submitted availability. The project has a zero-dollar budget and must be completed before the deadline. The implementation also needs to run in the Codespace and be simple enough for me to inspect and verify against the specification. The Build-Buy-Delegate Gate gave the hand-built option the highest weighted score at 105, compared with 94 for an AI-assisted build and 59 for an existing service. 
Decision: I plan on hand-building the member availability entry feature using HTML for structure, CSS for presentation, JavaScript for behavior, and localStorage for persistence
Consequences and revisit trigger: This keeps the implementation inexpensive, directly aligned with the specification, and easier for me to inspect and verify. However, the feature will only store data in the user's browser and will not provide shared availability across different team members. It also requires more manual development time than relying primarily on an AI-assisted build. The localStorage decision should be revisited when the project requires shared storage in a later module. 
