# Features and specification

## Context
The situation, job, and desired progress: Competitive dance members must balance practices with academic responsibilities like coursework, exams, interview prep, etc. Interviews showed that practices can end later than expected, which reduces the time available for sleeping and studying even when students plan their academic work. The job is to help the team members coordinate academic constraints while protecting necessary academic preparation and sleep. The progress is a practice schedule that accounts for member availability and important academic conflicts while also letting the team meet competition and performance requirements.

## Users
Profiles and evidence in USERS.md: The primary users are competitive dance team members represented by PROFILE-01 and PROFILE-02 in USERS.md. PROFILE-01 shows a computer science student who plans coursework around dance but can also have problems when practices run late unexpectedly (INT-01, JOB-01). PROFILE-02 talks about a medical student whose exams and MCAT preparation create academic constraints that can conflict with late practices (INT-02, JOB-02). These profiles are based on two example interviews and are not assumed to represent every member of the team.

## Scope
Included behavior and explicit non-goals: The system allows team members to enter their availability and important academic conflicts, allows team leadership to enter practice requirements and important team dates, and uses that information to create and communicate a practice schedule. Members will be able to view scheduled practice times and change to those times. The system will also identify conflicts between submitted member availability and proposed practices so leadership can consider them before finalizing their schedules. The system will not decide whether a student's academics or dance commitments should take priority. It will not guarantee an exact practice end time when circumstances during practice require the team to continue longer.

### Kano hypotheses

| Feature ID | Feature | Kano hypothesis | Segment / date | Evidence and reasoning |
|---|---|---|---|---|
| F-01 |member availability entry |Must be |Competitive dance team members / 09/10/2026 |Both interviews showed that students have academic obligations that can conflict with practice. A scheduling system cannot account for these constraints unless members can provide their availability. |
| F-02 |academic conflict entry |Performance |Team members with important academic obligations/09/10/2026|INT-01 described an exam after a late practice, while INT-02 described exam and MCAT preparation conflicts. Capturing important academic conflicts could improve how well proposed practice times fit members' needs. |
| F-03 |expected practice start and end times |Must be |Competitive dance team members / 09/10/2026 |Both participants described practices ending later than expected. A usable practice schedule needs to communicate when members should expect practice to begin and end. |
| F-04 |schedule-change notification |Performance |Competitive dance team members / 09/10/2026 |Both interviews showed that the amount of time available after practice matters for studying and sleep. Notifying members of schedule changes would give them more opportunity to adjust their plans. |
| F-05 |automatic academic priority ranking |Reverse |Competitive dance team members / 09/10/2026 |The interviews showed that academic conflicts vary by person and circumstance and that captains currently discuss exceptions with members. Automatically deciding whose academic obligation deserves priority could remove useful human judgment. |
| F-06 |Social or teammate-matching feature |Indifferent |Competitive dance team members / 09/10/2026 |INT-02 reported difficulty finding teammates with similar medical-school pressures, but neither interview provided evidence that social matching would improve the core scheduling job. It may be interesting to build without addressing the primary problem. |

## Behavior
Sequence, conditions, actions, and visible outcomes:
1. A team member enters the times they are unavailable for practice and may find a period as an important academic conflict.
2. Team leadership enters the dates and time ranges when practices can occur, along with competition, audition, or performance dates that affect practice requirements.
3. Before a practice schedule is finalized, the system compares proposed practice times with the availability submitted by team members.
4. If a proposed practice overlaps with a member's submitted unavailable time, the system identifies the member and conflicting time period for team leadership to review.
5. Team leadership reviews identified conflicts and either adjusts the proposed practice or keeps the proposed time. The system does not automatically decide whether an academic obligation or team obligation has priority.

## Constraints
Platform, data, privacy, scope, and relevant limits:
1. The system must support both team members and team leadership.
2. Member availability and academic-conflict information must only be visible when needed for scheduling.
3. The system must allow leadership to make final scheduling decisions rather than automatically prioritizing one member's conflict over another.
4. The system only manages practice scheduling and does not manage coursework, grades, or personal academic records.

## Acceptance

- Ubiquitous: When a member submits unavailable times, the system shall save and display the submitted availability.
- Event-driven: When a proposed practice conflicts with submitted availability, the system shall identify the conflict for team leadership.
- State-driven: While leadership finalizes a practice, the system shall display the practice date, time, and expected end time to team members.
- Unwanted: If a member submits an availability entry with missing required information, then the system shall reject it and say why.
- Optional: Where a member updates their availability and it conflicts with a finalized practice, the system shall identify the conflict without automatically changing the practice.

## Handoff reflection

I reviewed the specification from the perspective of someone who was not involved in the interviews and found that the system still leaves team leadership responsible for resolving scheduling conflicts. I revised the specification to make clear that the system identifies conflicts but does not automatically prioritize academic or dance commitments. A remaining limitation is determining how far in advance members must submit availability and when a practice schedule should become final.

## AI assistance

I used ChatGPT to help organize my findings and structure the specification. I did not use AI to create or invent interview evidence.

## Verification

- **PASS — Unwanted:** If a member submits an availability entry with missing required information, then the system shall reject it and say why. I sent a POST request with the required files missing. The deployed Worker returned HTTP 400 and the message "date, start time, and end time are required."

- **CANNOT TEST YET — Event-driven:** When a proposed practice conflicts with submitted availability, the system shall identify the conflict for team leadership. The current feature does not include proposed practice entry or conflict detection.

- **CANNOT TEST YET — State-driven:** While leadership finalizes a practice, the system shall display the practice date, time, and expected end time to team members. Practice finalization is not implemented in the current feature.

- **CANNOT TEST YET — Unwanted:** If leadership changes a finalized practice time, then the system shall update the schedule and notify affected team members. Schedule changes and notifications are not implemented in the current feature.

- **CANNOT TEST YET — Optional:** Where a member updates their availability and it conflicts with a finalized practice, the system shall identify the conflict without automatically changing the practice. Finalized practices and conflict detection are not implemented in the current feature.

| Statement | HW3 verdict | HW4 verdict | Reason |
|---|---|---|---|
| Survive cleared cache | CANNOT TEST YET | CANNOT TEST YET | Entries are stored remotely in D1 rather than localStorage, but the exact private-browser test was blocked because the Codespaces forwarded page requires GitHub authentication. |
| Server unreachable | N/A | CANNOT TEST YET | A network or Worker outage is a new server-backed failure mode. I have not intentionally taken the deployed service offline to test it. |
| Server returns 500 | N/A | CANNOT TEST YET | The Worker contains a readable 500 error path, but I have not intentionally caused a production server failure to verify it end to end. |
| Server returns 400 | N/A | PASS | I sent a POST request with missing required information. The deployed Worker returned HTTP 400 and named the missing date, start time, and end time. |
| Second client writes to the same table | N/A | PASS | I submitted an entry through the browser page and then used curl as a separate client to GET the deployed Worker. The response included both the existing D1 entry and the new browser-submitted entry. |