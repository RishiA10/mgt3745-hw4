# Standards

Status: ACTIVE in Module 3. Adapt these rules to your feature and follow them.

1. Use descriptive camelCase identifiers. Short conventional event/index names are acceptable when their role is obvious; arbitrary minimum name lengths are unnecessary.
2. Separate HTML, CSS, and JavaScript into index.html, styles.css, and app.js. Use lexical scope; do not create accidental global variables.
3. Explain important reasons in comments, not a narration of every statement. Remove temporary debug output before submission.
4. Write commit messages that name the changed behavior and purpose.
5. Use textContent for user text. Never insert user strings through innerHTML.
6. Associate form controls with labels and make success/error feedback perceivable. Preserve unsaved input when a write fails.

This file is normative if an adapter or context/CLAUDE.md conflicts. Repair inconsistent copies; do not silently choose different policies for humans and agents.

## Split Test

### Rule 1: Use descriptive camelCase identifiers
This rule applies to nearly every JavaScript task in the project and should remain consistent from task to task. If naming guidance were placed only in individual prompts, different tasks could produce inconsistent naming and create confusion. Because the rule is stable and broadly applicable, it belongs in 'CLAUDE.md'. 
**Verdict**: This rule belongs in 'CLAUDE.md'

### Rule 2: Use textContent for user text
This rule applies whenever code displays user-provided text and remains the same across those tasks. Putting conflicting instructions elsewhere could create a clash between safe text and generated code that uses 'innerHTML'. Because this is an important and stable rule, it belongs in 'CLAUDE.md'.
**Verdict**: This rule belongs in 'CLAUDE.md'

### Rule 3: Preserve unsaved input after a failed write
This rule applies specifically to tasks involving forms and failed data writes, not every task in the project. Keeping it in persistent context could distract the agent when it works on unrelated tasks such as styling or documentation. It is better provided when implementing form submission and storage behavior. 
**Verdict**: This rule belongs in the prompt for the tasks that need it. 

**Prompt Snippet**: When implementing the availability form and localStorage behavior, preserve the user's unsaved form input if a write fails so the user does not have to re-enter the information.

## Colleague Test
Kyla read my 'CLAUDE.md' and said that the instructions were concise and understandable overall. She correctly interpreted the camelCase naming convention and lexical scope, but asked for clarification about what "controls" meant. Based on her feedback, I revised the instructions in 'CLAUDE.md' from "Label controls" to "Associate form inputs, such as text fields and buttons, with clear labels." This makes the instruction more accessible to someone who is not already familiar with the term "controls". 

