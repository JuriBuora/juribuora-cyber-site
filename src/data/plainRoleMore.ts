/**
 * What opens when a card on a role page is clicked: the story behind each
 * item, a few measured numbers and one curiosity. Keyed by role slug, in the
 * same order as the items in plainRoles.ts, in English and Italian.
 *
 * Same rules as the rest of the plain-words pages: plain language, nothing
 * private, and every number comes from the workstation's own records (routing
 * and tiering notes, handoffs, the reports on this site). A test checks that
 * both languages have the same shape and that every link is a real page.
 */
import { jekyllSnapshot } from "./jekyllSnapshot.generated";
import type { Lang } from "./plain";

/** Reports are linked by name, so renumbering them can never point a link at a different report. */
const report = (slug: string) => {
  const found = jekyllSnapshot.reports.find((r) => r.slug === slug);
  if (!found) throw new Error(`No report named "${slug}" in the synced content`);
  return `/report/${found.day}`;
};

export type ItemMore = {
  text: string[];
  facts?: { value: string; label: string }[];
  aside?: string;
  link?: { label: string; to: string };
};

const en: Record<string, ItemMore[]> = {
  brains: [
    {
      text: [
        "An open model published by OpenAI that anyone may download and run. On my machine it writes about 86 tokens (pieces of words) a second and starts answering in under a second once it is loaded.",
        "It speaks its own dialect when it wants to use a tool. About half the time my worker did not understand the request, so I wrote a small translator for it, with tests.",
      ],
      facts: [
        { value: "63.4 GB", label: "of memory when loaded" },
        { value: "~86", label: "tokens a second" },
      ],
      aside:
        "For a while it could not load at all. The everyday models were set to stay in memory for 24 hours after a single message, which left no room. I cut that to 2 hours, and then found the change was not live: the running program had been started before the setting was edited. I now read a setting from the running program, not from the file.",
    },
    {
      text: [
        "For about a month this was my main model for coding by hand, and it did good work. I also gave it small unattended jobs: a task description goes in, a proposed change comes out, and nothing is saved until a stronger model has reviewed it.",
        "On 23 August I compared three candidates on real coding rounds. It was the slowest, and its 64.8 GB bought no speed once the models were warm.",
      ],
      facts: [
        { value: "64.8 GB", label: "of memory" },
        { value: "3rd of 3", label: "on speed, in real coding rounds" },
      ],
      aside:
        "Earlier I drove it through a different coding tool. Three separate times that tool produced empty files without reporting an error. I changed the tool because of that, not the model.",
      link: { label: "The Qwen models, and why each one went", to: "/workstation/qwen-lane" },
    },
    {
      text: [
        "I wanted to know whether a frontier-class open model could run on a laptop and do planning work that would otherwise cost money. It could run: it needed 65 to 70 seconds to warm up and wrote about three times slower than my everyday setup.",
        "The benchmark on 28 July produced no valid data. With everything else loaded beside it, the graphics memory ran out. I could have repeated the test cleanly. I chose to remove the model, and wrote down how to bring it back before deleting anything.",
      ],
      facts: [
        { value: "91 GB", label: "of model files" },
        { value: "21 GB", label: "of cache on top" },
        { value: "65–70 s", label: "to warm up" },
      ],
      aside:
        "That failed test says nothing about how good the model is. It tells you about my machine on that day, and I recorded it that way.",
      link: { label: "How it was retired", to: "/workstation/ds4" },
    },
    {
      text: [
        "Chosen on 13 July after a test built to look like real use: look something up in the agenda, use tools, produce a PDF. It scored 100 out of 100. The model before it scored 70, wrote fake tool commands instead of really looking things up, and produced no PDFs.",
        "Then every message used it, even “what time is it”, and each answer kept the graphics chip at 100%, which made my three screens stutter. The same question took 89 seconds on this model and 4 on a small one. That measurement is the reason the size router exists.",
      ],
      facts: [
        { value: "100 / 100", label: "in the test shaped like real use" },
        { value: "19 GB", label: "on disk" },
        { value: "89 s vs 4 s", label: "same question, big and small model" },
      ],
      aside:
        "The list of installed models shows four versions of it at 19 GB each. All four point at the same file. Real disk use was 66 GB, not the 123 GB the list suggests, so deleting the “unused” three would have freed nothing.",
    },
    {
      text: [
        "Qwen3 at 30 billion was my assistant’s first brain. It was retired on 13 July with a score of 70 out of 100.",
        "On 25 September I tried its coding sibling against the current worker on three tasks: run a command, create a file, fix a bug and prove the test passes. I checked the results on disk instead of believing the report. Both got 3 out of 3. The one I already had was about twice as fast.",
      ],
      facts: [
        { value: "3 / 3", label: "tasks correct, both models" },
        { value: "264 s vs 137 s", label: "total time, challenger and incumbent" },
      ],
      aside:
        "Its first run failed at once with “Unexpected server error”. Nothing was wrong with the model. The coding tool keeps a list of models it is allowed to use, and this one was not on it yet.",
      link: { label: "The Qwen models, and why each one went", to: "/workstation/qwen-lane" },
    },
    {
      text: [
        "I switch to it by writing or saying a sentence such as “use libero for three hours”. When the time is up the normal model comes back without me doing anything.",
        "It only exists on my own machine. Nothing I ask it leaves the laptop.",
      ],
      facts: [{ value: "2,048", label: "tokens per answer, half the normal limit" }],
      aside:
        "The first time I used it the answers came out strangely short. Nothing was broken. Its limit on answer length was half that of the normal model, a number nobody had looked at.",
    },
    {
      text: [
        "It became the everyday local brain on 24 August, and a head-to-head test on real tasks the next day confirmed the choice. A month later I asked a tempting question: could it do both the quick job and the hard job alone, and free about 12 GB of memory?",
        "I tested that with 71 messages across 41 situations. With one model for everything, failures doubled and the run took four times as long. I kept two.",
      ],
      facts: [
        { value: "13.7 GB", label: "of memory when loaded" },
        { value: "6 → 12", label: "failed messages when it worked alone" },
        { value: "141 s → 545 s", label: "for the same test run" },
      ],
      aside:
        "The first version of that test was unfair to it. My test cut every answer at 400 tokens, while real use allows 4,096, and this model can spend more than 400 thinking before it writes one character. It was returning empty answers because of my test. I fixed the test and ran it again.",
    },
    {
      text: [
        "It gets a message only when all of this is true: the conversation is short, no tool has been used yet, and there is no action word in it such as delete, send, pay, book or publish. Anything else goes to the bigger model, and so does any error.",
        "It is loaded when the computer starts, so the most common kind of message never waits.",
      ],
      facts: [
        { value: "0.7 s", label: "for a simple answer" },
        { value: "2.0 s", label: "for the same on the bigger model" },
        { value: "11.8 GB", label: "of memory" },
      ],
      aside:
        "The action words are a safety measure, not a convenience. They keep a weaker brain from being the one that does something real.",
    },
    {
      text: [
        "It turns each note into a long list of numbers. Notes that mean similar things get similar numbers, so a question can find a note that uses different words.",
        "Search quality is tested like anything else: a set of questions with known right answers, and a change to the search has to pass that test before it becomes the default.",
      ],
      facts: [{ value: "0.8", label: "minimum score on the test questions before a search change is accepted" }],
      aside:
        "A mixed method that also matches plain words exists. It stays an experiment until it beats the simple one on those test questions.",
    },
    {
      text: [
        "I reach them mostly through subscriptions I already pay for, so a heavy day does not produce a surprise bill. My main chat assistant answers with a hosted model and falls back to a local one if that is unavailable.",
        "The rule for going outside: a local model has failed the same task twice with no clear reason, the decision has real trade-offs, or something security-sensitive or public is about to ship. Not for routine edits, and not to redo work a local model already did correctly.",
      ],
      aside:
        "In late September a weak local model turned out to be the cause of a whole day of defects in my messaging assistant. Moving that one job to a hosted model fixed more than any rewording of the instructions had.",
      link: { label: "The messaging assistant", to: "/workstation/messaging-assistant" },
    },
  ],

  workers: [
    {
      text: [
        "My add-ons include: switching the model with a plain sentence, a daily fresh start for the conversation, putting the laptop to sleep, and handing a job to a senior engineer from chat. In that last one the assistant can only propose the job. A short code that I send back is what starts it.",
        "My copy had quietly fallen far behind the original project. Catching up meant carrying my own changes across a restructured codebase, and telling real breakage from noise: 97 test failures already existed in the original, 3 were mine, and those were fixed.",
      ],
      facts: [
        { value: "17,898", label: "changes behind the original when I noticed" },
        { value: "78 + 31", label: "of my own changes carried across" },
        { value: "9", label: "add-ons of my own" },
      ],
      aside:
        "Twice I restarted it while it was in the middle of answering me, and killed my own conversation. A restart now checks first whether a conversation is running.",
      link: { label: "The assistant in detail", to: "/workstation/hermes-gateway" },
    },
    {
      text: [
        "They follow the same written contract, kept in one file that both read. Every finished task ends with the same four lists: must do, should do, nice to do, loose ends.",
        "When one reviews the other, the reviewer starts from nothing and is told not to trust the author’s report, the notes or the passing tests. That is how four review rounds found five ways past a protection the author had called finished.",
      ],
      facts: [
        { value: "4", label: "review rounds on one tool" },
        { value: "5", label: "flaws found that the author had missed" },
      ],
      aside:
        "On 1 October 2026 one of them built the version of this website that works without JavaScript and the other reviewed it. The review found that Italian readers would briefly see each page in English first. 58 passing tests had not noticed.",
      link: { label: "The review that found five flaws", to: report("dns-rebinding-ssrf-browser-tool") },
    },
    {
      text: [
        "It runs on a local model, so it costs nothing per task and nothing leaves the machine. I give it jobs with a clear finish line.",
        "I check its work on disk. In the September comparison it ran a command, created a file, and fixed a bug and proved the test passed.",
      ],
      facts: [
        { value: "3 / 3", label: "tasks correct" },
        { value: "137 s", label: "for all three" },
        { value: "8", label: "tool uses to get there" },
      ],
      aside:
        "An earlier unattended night told me six jobs were finished. An independent check the next day found most were partial or failing, and that the script recording results let any job be marked “verified” without evidence.",
      link: { label: "The overnight run", to: "/workstation/qwen-night-shift" },
    },
    {
      text: [
        "It may read files, build and run tests without asking. Anything else needs my yes, and in an unattended run it is refused outright.",
        "It never saves changes to a project or publishes by itself: it files a request that I approve on a separate screen. It never sends email: it can only queue a draft. In plan-only mode it makes one call, proposes a short plan and touches nothing.",
      ],
      facts: [
        { value: "8", label: "steps at most before it must stop and report" },
        { value: "2", label: "tries allowed with a tool that does not exist" },
      ],
      aside:
        "Models sometimes ask for a tool that is not there. Instead of guessing what was meant, it answers with the list of tools that do exist and lets the model try again, twice at most.",
    },
    {
      text: [
        "The website checker may state a problem in an email only if the evidence repeats. The daily briefing is a scheduled job that sorts security news by importance and suggests what to do first; if one news source is down the others still arrive.",
        "The photo helper never overwrites an original. The email helper sends an unknown sender to my phone as a yes or no question, and ignores blocked senders.",
      ],
      facts: [
        { value: "7 / 10", label: "photo helper, small supervised batch" },
        { value: "4 / 10", label: "large batch with checkpoints" },
        { value: "2 / 10", label: "unattended over the whole archive" },
      ],
      aside:
        "Those three scores are the photo helper’s own documentation rating its readiness. Writing down what a tool is not ready for is as useful as listing what it can do.",
      link: { label: "The website checker", to: "/workstation/webcheckup" },
    },
    {
      text: [
        "Each skill has a one-line description of when it applies. A worker loads the full text only when the situation matches, so a large handbook does not cost a large number of tokens.",
        "New skills come from friction noticed during real work. The test is not how many times something went wrong, but whether an existing skill would already have fired. If it would, the lesson is added there.",
      ],
      facts: [
        { value: "113", label: "skills in the shared folder on 1 October 2026" },
        { value: "9 → 1", label: "observations that became one new skill in a July review" },
      ],
      aside:
        "Some skills are about how to talk to me. One makes every worker answer in short plain sentences without filler, which also saves tokens.",
    },
  ],

  manager: [
    {
      text: [
        "It reads the request, decides what kind of job it is, and looks up in a table who does that by default and who is the fallback.",
        "The rule is local first. A paid model comes in after a local one has failed the same task twice, when a decision has real trade-offs, or before anything public or security-sensitive ships.",
      ],
      facts: [{ value: "2", label: "local failures before a job is passed up" }],
      aside:
        "Models I have retired are filtered out of its list, so an old default cannot quietly choose a brain that is no longer installed. A retired route refuses loudly instead of falling back to something else.",
      link: { label: "The workstation as a whole", to: "/workstation/ai-workstation" },
    },
    {
      text: [
        "Once a conversation has moved to the bigger model it stays there for three hours. Switching back and forth would make the model re-read the whole conversation each time, which is slower than not routing at all.",
        "If anything inside the router fails, the message goes to the bigger model. A broken router gives me the old behaviour, never a silent assistant.",
      ],
      facts: [
        { value: "4 s vs 89 s", label: "the measurement that justified building it" },
        { value: "3 h", label: "a conversation stays on the bigger model" },
        { value: "96", label: "tests" },
      ],
      aside:
        "The first version did nothing at all, and its logs looked perfect. It sent a message to the big model whenever tools were “present”, and the assistant attaches its whole toolbox to every message. The rule now looks at tools actually used.",
    },
    {
      text: [
        "Every tool a worker can see has to be described to the model in every request. It costs tokens whether it is used or not, and it widens what the worker could do by mistake.",
        "So a session starts with a profile. A research job gets the research tools and cannot touch the administration ones.",
      ],
      facts: [
        { value: "6", label: "profiles" },
        { value: "5 / 5", label: "planned phases complete" },
      ],
      aside:
        "I expected that running the tools in separate containers would cut the cost. It does not: the descriptions cost the same once loaded. The documentation says so instead of claiming a saving.",
      link: { label: "The profile launcher", to: "/workstation/mcp-profile-launcher" },
    },
    {
      text: [
        "There are three possible answers. Right fit: one line, then work. A cheaper model could do most of it: do only the hard part, then hand over a ready prompt. Too weak for this: say which stronger model is needed.",
        "The choice follows the hardest step still left, not the average. A five-minute job is not worth a switch, and a job nobody is watching never stops to ask.",
      ],
      aside:
        "A small script tells each worker which model it is running on when a session starts, because a model does not reliably know its own name.",
    },
    {
      text: [
        "The compressor sits between my coding workers and the outside models and shrinks what is sent. The selector builds each task’s context: the safety rules always, and only the notes and skills that match the task.",
        "Usage is logged per call: which model, how long, how many tokens. Never the question, the answer or a key.",
      ],
      facts: [
        { value: "186 million", label: "tokens removed so far, by the compressor’s own counter (1 October 2026)" },
        { value: "2,600", label: "characters at most from one memory lookup" },
      ],
      aside:
        "Cutting the instructions given to my messaging assistant from 61,923 to 28,790 characters did more than save tokens. It also made it sound less like an assistant.",
    },
    {
      text: [
        "It works typed or spoken as a voice note. The sentence is turned into the real command, so the change is a mechanism and not the model promising to behave differently.",
        "The same works for effort: I can ask for more or less thinking on the next job.",
      ],
      aside:
        "Changing model can need a restart, and a restart in the middle of an answer kills the answer. So the switch waits for a quiet moment: no job running, and nothing from me for five minutes.",
    },
  ],

  hands: [
    {
      text: [
        "The reply rule works like a ticket. A message that arrives creates one ticket for that conversation. A reply uses it up. An unused ticket expires after five minutes. No ticket, no message: the assistant cannot start a conversation.",
        "In the app where anyone can write to it, the tools that hold passwords are removed, and the tool manual is not shown to the model at all.",
      ],
      facts: [
        { value: "1", label: "reply per message received" },
        { value: "5 min", label: "before an unused permission expires" },
        { value: "123 × 3", label: "test situations per measuring run, none of which send anything" },
      ],
      aside:
        "The people it answers know it exists. And I do not run tests on a real person: test runs never send, and the one real check goes to a recipient I control.",
      link: { label: "A reply is a permission, not a suggestion", to: "/blog/206" },
    },
    {
      text: [
        "The limit lives inside the program, not in the instructions. The assistant runs this tool by typing a command, and anything it could set on that command line it could also change. So the list of calendars it may write to is fixed in the code.",
        "Deleting was not switched off. It was removed. The calendar has no undo and no bin.",
      ],
      aside:
        "Nine days after removing the delete function I found it still sitting in two old copies of the code. Restoring either would have brought it back. A capability you withdraw has to be removed everywhere, and a test now fails if it reappears.",
    },
    {
      text: [
        "A tool that opens any address it is given can be pointed inwards, at machines that should never be reachable from outside. The tool checked each address first. The flaw was that the browser then looked the address up a second time, and could be given a different answer.",
        "Four independent review rounds found five ways past the protection. Each was demonstrated, fixed, and given a permanent test. The tool was never connected to anything untrusted while they were open.",
      ],
      facts: [
        { value: "5", label: "ways around, all closed" },
        { value: "4", label: "review rounds" },
        { value: "144 → 158", label: "tests" },
      ],
      aside:
        "The most serious of the five was in code nobody had touched, described in every earlier note as finished. Addresses written as plain numbers skipped the check entirely, because the check only ran when there was a name to look up.",
      link: { label: "The full vulnerability report", to: report("dns-rebinding-ssrf-browser-tool") },
    },
    {
      text: [
        "For ordinary mail it writes drafts and stops there. The one path that can send by itself is delivering a finished report, and only to exact addresses on a short list I approve. If that list is missing, empty or readable by other users, everything is blocked.",
        "Every decision is recorded: when, to whom, the subject, allowed or refused, and why. Never the body. If the record cannot be written, the message is not sent.",
      ],
      aside:
        "“Sent” is not taken on the tool’s word. The message has to show up in the Sent folder with its identifier, and “received” means that same identifier was found in the recipient’s inbox. Trying again never sends a second copy.",
    },
    {
      text: [
        "A change is saved with the names of the files it touched, never as “everything that changed”. Several workers share the same folders, and a blanket save picks up someone else’s half-finished work.",
        "For my personal documents the assistant can read when I ask. Any change is shown to me as a before-and-after and waits for my yes.",
      ],
      facts: [{ value: "1,364", label: "recorded changes in 13 weeks" }],
      aside:
        "That rule comes from a real slip: one save swallowed another session’s unfinished note because two workers were sharing the same waiting area. At the end of every session a small script now lists unsaved files and unpublished work.",
    },
    {
      text: [
        "Three things are kept apart: the worker can find the instructions for making a report; a completed trial shows it followed them; and no response at all, which counts as unknown and never as proof.",
        "A finished report can then be delivered by mail, with the delivery checked the same way.",
      ],
      aside:
        "This check exists because of a model that failed it completely. In the July test the old everyday model was asked for PDF reports and produced none.",
    },
    {
      text: [
        "I hold a button to dictate. The app shows what it understood as a draft, and I confirm before it is sent. Files a job produced can be previewed, but only inside one safe folder.",
        "Things the laptop cannot actually do are shown as planned, never as if they worked.",
      ],
      facts: [
        { value: "6", label: "findings in the first audit" },
        { value: "4", label: "smaller ones introduced by the fixes" },
      ],
      aside:
        "The first audit found that the service behind the app accepted commands from anything on my network with no login, and that jobs were marked “done” when the result was empty. Both were fixed within the week.",
      link: { label: "The audit report", to: report("security-audit-iphone-agent-app") },
    },
    {
      text: [
        "Waking is a standard network signal. It carries no password and can do nothing except wake. Sleeping is an action, so it has its own small program that accepts exactly one thing, records who asked, and logs it.",
        "It answers first and sleeps five seconds later. Commands older than two minutes are ignored: when the laptop wakes, old messages are delivered again, and without that rule a stale “sleep” would put it straight back to sleep.",
      ],
      facts: [{ value: "138 s", label: "for the helper machine to recover when I cut its connection on purpose" }],
      aside:
        "One day sleeping stopped working and the helper machine looked switched off. It had been on the whole time: it had lost the wireless network and then only searched for 36 hours without reconnecting. It now reconnects after 90 seconds, reloads its network driver after 5 minutes and restarts as a last resort.",
      link: { label: "The shutdown nobody could explain", to: report("incident-unexplained-remote-shutdown") },
    },
  ],

  archive: [
    {
      text: [
        "Four different workers read from it, and none of them can write to it directly. It is rebuilt from the notes themselves.",
        "A rebuild happens in a temporary copy, is checked, and then replaces the old one in a single step. If the rebuild is interrupted, the previous memory keeps working.",
      ],
      facts: [
        { value: "7,343", label: "passages on 1 October 2026" },
        { value: "1,121", label: "notes they come from" },
      ],
      aside:
        "When a worker says “I found nothing”, I do not accept it until the same search has found something I know is there. Looking in the wrong place also returns nothing.",
    },
    {
      text: [
        "There are two notebooks. One is compact and holds the current state of each project. The other is a diary filled in every hour from the conversation archives I have approved, at most 20 items at a time.",
        "Deleting a diary page stops it from being created again. A specific item can be erased on request, and the search is rebuilt so that it is really gone.",
      ],
      facts: [{ value: "20", label: "items at most per hourly run" }],
      aside:
        "My blog posts are mirrored in the same notes app, as exact copies. A worker may add a note there, but may not overwrite one that exists without my confirmation.",
    },
    {
      text: [
        "Each note is named with its date and ends with the time it was written, so I can tell at a glance how stale it is.",
        "Every final message from a worker ends with four lists: must do, should do, nice to do, loose ends. An empty first list means the job is really finished.",
      ],
      facts: [{ value: "538", label: "notes in the folder on 1 October 2026" }],
      aside:
        "The rule exists because paid AI has usage limits, and one can run out in the middle of a task. The work on this very website was stopped by a limit once and continued later from the note.",
      link: { label: "The close-out system", to: "/workstation/continuity" },
    },
    {
      text: [
        "The limits hold even if the caller asks for more: eight results, 900 characters each, 4,000 in total. A search can be narrowed by project, by source or by dates.",
        "Nothing here is ever permanently deleted by a program. Old items are moved aside with a record of what they were and how to restore them.",
      ],
      facts: [
        { value: "8", label: "results at most" },
        { value: "900", label: "characters per result" },
        { value: "4,000", label: "characters in total" },
      ],
      aside:
        "The background job that tidies old files is deliberately not allowed to look at my desktop. A program that cannot see a folder must not conclude that it is empty.",
    },
    {
      text: [
        "The folder is kept in a private repository and copied off the laptop after every change, because a local history survives a bad edit but not a dead disk.",
        "Third-party skill collections are left out and can be downloaded again. Anything that carries a login is left out too.",
      ],
      facts: [{ value: "113", label: "skills" }],
      aside:
        "The folder where one tool keeps its running state is deliberately not tracked. It holds login files, and one wrong rule would write a key into a history that is hard to clean.",
    },
    {
      text: [
        "Normal search leaves out the history room, archives, transcripts, caches, my documents folder and my private notebook.",
        "In the app where other people write to the assistant, the shared archive is not connected at all.",
      ],
      aside:
        "Setting that app’s tool list to “empty” was not enough. In that version of the software an empty list meant “inherit everything”. It needed an explicit “none”, and a check that runs before every hourly refresh.",
    },
  ],

  "quality-control": [
    {
      text: [
        "Each change gets a card: what could break, what prevents it, and the result of a test that was really run. The card is kept outside the project, and a proof is tied to the exact files it tested, so editing the code after the test is detected.",
        "Size is not the trigger. For logins, outgoing messages, schedules and publishing, even a one-line change is checked.",
      ],
      facts: [
        { value: "34", label: "known ways things break" },
        { value: "12", label: "people in the group chat that started it" },
      ],
      aside:
        "It began with a twenty-line change that silenced me in a group chat of twelve people for a whole morning. And when I ran the check on its own construction, it found mistakes its tests had missed.",
      link: { label: "The pre-flight check in detail", to: "/workstation/foresight" },
    },
    {
      text: [
        "Things that reached people before these rules existed: 1,178 characters of the model’s own reasoning delivered as the message, raw error text from a provider, and the transcript of a voice note sent back to the person who recorded it.",
        "Each began as a line in the instructions. Each came back. Each is now a rule in the filter, with a test.",
      ],
      facts: [{ value: "1,178", label: "characters of model reasoning in one message, before the filter" }],
      aside:
        "Editing the filter does nothing until the service restarts, because it is loaded once at start. Before I believe a fix is live I compare when the service started with when the file last changed.",
      link: { label: "The messaging assistant", to: "/workstation/messaging-assistant" },
    },
    {
      text: [
        "On 10 September I added a backup so that an outage would give a weaker answer instead of none. Within the hour the main model hit a limit, the backup took over, and it answered a comment about the rain with “Good morning”. I removed that backup the same day and used one as good as the main model.",
        "Since 30 September the backup is a local model again, by my own choice. Whatever it writes still passes the last look before sending, like every other message.",
      ],
      aside:
        "The switch itself was never the problem. That day it did exactly what it was built to do: it noticed the limit and changed model without leaking anything. The weak point was what the backup said.",
    },
    {
      text: [
        "The supervision layer refuses three things outright: a summary written by hand, success reported by the worker that did the job, and repeating a failed step without changing anything.",
        "In the repair loop I built, 15 of 15 fixable problems were fixed and 3 of 3 impossible ones were stopped honestly, with no false success.",
      ],
      facts: [
        { value: "15 / 15", label: "fixable problems repaired" },
        { value: "3 / 3", label: "impossible ones stopped honestly" },
        { value: "0", label: "false successes" },
      ],
      aside:
        "The overnight run that claimed six finished jobs had a script that let any job be marked “verified” with no evidence. That finding became this rule.",
      link: { label: "The overnight run", to: "/workstation/qwen-night-shift" },
    },
    {
      text: [
        "When I start a job from chat, the assistant can only propose it. It shows me what it understood and a short code, and the job starts when I send the code back.",
        "An email from someone it has not seen before reaches my phone as a card with buttons. The live trial of the supervision layer told me about 24 of its 25 failures.",
      ],
      facts: [{ value: "24 of 25", label: "failures that reached my phone during the trial" }],
      aside:
        "The buttons on that card can carry only 64 bytes, and an email address can be longer. So the card carries a short random code and the address is looked up on my side.",
    },
    {
      text: [
        "There are four: my private notebook, my documents folder, anything involving passwords or payments, and destruction that a backup could not undo.",
        "Everything else is deliberately allowed without asking. Before a risky change the worker makes a dated copy and carries on.",
      ],
      facts: [{ value: "4", label: "hard stops, and nothing else needs permission" }],
      aside:
        "I do not read permission prompts. So I removed them and moved the control into backups and limits that hold whether I am paying attention or not.",
    },
    {
      text: [
        "The privacy check on this website is first shown a text with a planted private detail and must catch it. A test that guards a fix is run once against the broken version, to see it fail.",
        "The same goes for the checker itself. One of mine reported four defects as passes, because it only checked that bad output was absent and never that the required answer was present.",
      ],
      facts: [{ value: "4", label: "defects my own test harness had scored as passes" }],
      aside:
        "A checker once reported a complete backup as broken, because of the way two commands were chained: finding the file early made the check fail. Before I trust a “no”, the checker now runs once on a known good and a known bad example.",
    },
  ],

  insurance: [
    {
      text: [
        "The data is scrambled on the laptop before it leaves, so the second machine only ever holds something unreadable. It is reached over a private network and never exposed to the internet. The backup runs on a schedule without me.",
        "It covers the assistant’s database, settings and working state. It is not a copy of my whole computer.",
      ],
      aside:
        "The restore report says plainly what this does not cover: if both machines can be lost to the same event, another copy somewhere else is needed. That is why I also keep a copy on a removable disk, with a monthly reminder to refresh it.",
      link: { label: "The restore drill report", to: report("backup-restore-drill-agent-state") },
    },
    {
      text: [
        "The check only reads. It never starts the assistant from the restored copy, because the restored data includes the logins the assistant uses, and starting it would have put two live copies on the same accounts.",
        "To prove the live system was not disturbed, I recorded its running process and a fingerprint of its login file before and after. Both were unchanged.",
      ],
      facts: [
        { value: "2,606", label: "files read back" },
        { value: "14 / 14", label: "checks completed" },
        { value: "21", label: "database tables" },
      ],
      aside:
        "The integrity check complained about the search index. That index is rebuilt from the data it describes, so those warnings were recorded separately from damage to the original data, of which there was none. A check that treats every warning as corruption always fails and tells you nothing.",
      link: { label: "The restore drill report", to: report("backup-restore-drill-agent-state") },
    },
    {
      text: [
        "The copy sits next to the original, with the date in its name and the reason it was made. The final report says what was copied and where.",
        "It is for the irreversible only. An ordinary edit is already covered by the record of changes and does not need a ceremony.",
      ],
      aside:
        "A settings edit once took my assistant down for 30 seconds: one apostrophe in the wrong place. A settings change is now written to a temporary file, read back to prove it is valid, and only then swapped in.",
    },
    {
      text: [
        "Several workers and I change the same folders, so the record is also how I find out who changed what and when.",
        "Publishing this website is a recorded change too. If a release is wrong, the previous one is one command away.",
      ],
      facts: [{ value: "1,364", label: "recorded changes in 13 weeks" }],
      aside:
        "A record can hide a problem as well as reveal one. My copy of the assistant’s software fell 17,898 changes behind the original and nothing warned me. I now run a one-line check whenever I am already working in a project that has an original.",
    },
    {
      text: [
        "Removed means it cannot run by accident. The path that could serve the retired large model now answers “no” unconditionally. The retired coding tool exits with a note on how to reinstall it, and the router refuses that route before sending any work.",
        "What might be needed again is kept in an archive outside every folder my workers search.",
      ],
      aside:
        "One of my retirement records lists what was removed and how to roll back, but not why. I had to reconstruct the reason months later. I now write the reason down on the day.",
      link: { label: "The graveyard", to: "/workstation" },
    },
    {
      text: [
        "It exists because two mail logins sat dead for three weeks in July and nothing noticed. It is deliberately separate from the thing it watches: a watchdog that depends on what it watches goes down with it.",
        "It alerts on my phone and on the desktop. It also tells “the login was revoked” apart from “the network is down”, which fail in exactly the same way and mean opposite things.",
      ],
      facts: [
        { value: "3 weeks", label: "two logins were dead before anyone noticed" },
        { value: "every hour", label: "it checks now" },
      ],
      aside:
        "The check itself keeps the logins alive: using a login is what stops it expiring after months of disuse. And a login that dies after about seven days points to one specific setup mistake, so the alarm says that outright instead of leaving me to work it out again.",
    },
    {
      text: [
        "A note says what is done, what is left, the exact next command, and what must not be done again. A small script at the end of each session lists unsaved files, unpublished work and open branches.",
        "Anything a worker could not finish has to be named, with who must act.",
      ],
      facts: [{ value: "538", label: "notes on 1 October 2026" }],
      aside:
        "Three AI tools and I work in the same folders, sometimes at the same moment. On 1 October one of them published a change to this website while another was still reviewing it. The notes each one left are how neither overwrote the other.",
      link: { label: "The close-out system", to: "/workstation/continuity" },
    },
  ],
};

const it: Record<string, ItemMore[]> = {
  brains: [
    {
      text: [
        "Un modello aperto pubblicato da OpenAI che chiunque può scaricare e far girare. Sulla mia macchina scrive circa 86 token (pezzi di parola) al secondo e inizia a rispondere in meno di un secondo una volta caricato.",
        "Quando vuole usare uno strumento parla un suo dialetto. Circa una volta su due il mio lavoratore non capiva la richiesta, così ho scritto un piccolo traduttore, con i suoi test.",
      ],
      facts: [
        { value: "63,4 GB", label: "di memoria quando è caricato" },
        { value: "~86", label: "token al secondo" },
      ],
      aside:
        "Per un periodo non riusciva proprio a caricarsi. I modelli di tutti i giorni erano impostati per restare in memoria 24 ore dopo un solo messaggio, e non restava spazio. Ho ridotto a 2 ore, e poi ho scoperto che la modifica non era attiva: il programma in esecuzione era stato avviato prima del cambio. Ora un’impostazione la leggo dal programma in esecuzione, non dal file.",
    },
    {
      text: [
        "Per circa un mese è stato il mio modello principale per programmare a mano, e ha lavorato bene. Gli affidavo anche piccoli lavori non presidiati: entra la descrizione di un compito, esce una modifica proposta, e niente viene salvato finché un modello più forte non l’ha rivista.",
        "Il 23 agosto ho confrontato tre candidati su turni reali di programmazione. È risultato il più lento, e i suoi 64,8 GB non davano alcun vantaggio di velocità a modelli già caldi.",
      ],
      facts: [
        { value: "64,8 GB", label: "di memoria" },
        { value: "3º su 3", label: "per velocità, su lavoro reale" },
      ],
      aside:
        "Prima lo usavo attraverso un altro strumento di programmazione. In tre occasioni diverse quello strumento ha prodotto file vuoti senza segnalare alcun errore. Ho cambiato lo strumento per questo, non il modello.",
      link: { label: "I modelli Qwen, e perché ognuno è stato tolto (in inglese)", to: "/workstation/qwen-lane" },
    },
    {
      text: [
        "Volevo sapere se un modello aperto di altissimo livello potesse girare su un portatile e fare lavoro di pianificazione che altrimenti costa denaro. Girava: gli servivano da 65 a 70 secondi per scaldarsi e scriveva circa tre volte più lentamente del mio sistema di tutti i giorni.",
        "La prova del 28 luglio non ha prodotto alcun dato valido. Con tutto il resto caricato accanto, la memoria grafica si è esaurita. Avrei potuto ripetere la prova in condizioni pulite. Ho scelto di togliere il modello, e ho scritto come riportarlo indietro prima di cancellare qualsiasi cosa.",
      ],
      facts: [
        { value: "91 GB", label: "di file del modello" },
        { value: "21 GB", label: "di cache in più" },
        { value: "65–70 s", label: "per scaldarsi" },
      ],
      aside:
        "Quella prova fallita non dice nulla sulla qualità del modello. Dice qualcosa sulla mia macchina quel giorno, e così l’ho registrata.",
      link: { label: "Come è stato ritirato (in inglese)", to: "/workstation/ds4" },
    },
    {
      text: [
        "Scelto il 13 luglio dopo una prova costruita per somigliare all’uso reale: cercare qualcosa in agenda, usare strumenti, produrre un PDF. Ha fatto 100 su 100. Il modello precedente aveva fatto 70, scriveva finti comandi invece di cercare davvero, e non ha prodotto nessun PDF.",
        "Poi ogni messaggio passava da lui, anche “che ore sono”, e ogni risposta teneva il chip grafico al 100%, facendo andare a scatti i miei tre schermi. La stessa domanda richiedeva 89 secondi su questo modello e 4 su uno piccolo. Quella misura è il motivo per cui esiste lo smistatore per dimensione.",
      ],
      facts: [
        { value: "100 / 100", label: "nella prova simile all’uso reale" },
        { value: "19 GB", label: "su disco" },
        { value: "89 s contro 4 s", label: "stessa domanda, modello grande e piccolo" },
      ],
      aside:
        "L’elenco dei modelli installati ne mostra quattro versioni da 19 GB l’una. Tutte e quattro puntano allo stesso file. Lo spazio occupato davvero era 66 GB, non i 123 GB che l’elenco fa pensare, quindi cancellare le tre “inutilizzate” non avrebbe liberato niente.",
    },
    {
      text: [
        "Qwen3 da 30 miliardi è stato il primo cervello del mio assistente. È stato ritirato il 13 luglio con un punteggio di 70 su 100.",
        "Il 25 settembre ho provato il suo fratello specializzato nel codice contro il lavoratore attuale, su tre compiti: eseguire un comando, creare un file, correggere un errore e dimostrare che il test passa. Ho controllato i risultati sul disco invece di credere al resoconto. Entrambi hanno fatto 3 su 3. Quello che avevo già è stato circa due volte più veloce.",
      ],
      facts: [
        { value: "3 / 3", label: "compiti corretti, entrambi i modelli" },
        { value: "264 s contro 137 s", label: "tempo totale, sfidante e titolare" },
      ],
      aside:
        "La sua prima esecuzione è fallita subito con “Unexpected server error”. Il modello non aveva nulla che non andasse. Lo strumento di programmazione tiene un elenco dei modelli che può usare, e questo non c’era ancora.",
      link: { label: "I modelli Qwen, e perché ognuno è stato tolto (in inglese)", to: "/workstation/qwen-lane" },
    },
    {
      text: [
        "Ci passo scrivendo o dicendo una frase come “usa il libero per tre ore”. Quando il tempo è scaduto torna il modello normale senza che io faccia nulla.",
        "Esiste solo sulla mia macchina. Niente di ciò che gli chiedo esce dal portatile.",
      ],
      facts: [{ value: "2.048", label: "token per risposta, metà del limite normale" }],
      aside:
        "La prima volta che l’ho usato le risposte uscivano stranamente corte. Non c’era niente di rotto. Il suo limite di lunghezza era la metà di quello del modello normale, un numero che nessuno aveva guardato.",
    },
    {
      text: [
        "È diventato il cervello locale di tutti i giorni il 24 agosto, e un confronto diretto su compiti reali il giorno dopo ha confermato la scelta. Un mese dopo mi sono fatto una domanda invitante: poteva fare da solo sia il lavoro veloce sia quello difficile, liberando circa 12 GB di memoria?",
        "L’ho provato con 71 messaggi in 41 situazioni. Con un solo modello per tutto, gli errori sono raddoppiati e la prova è durata quattro volte tanto. Ne ho tenuti due.",
      ],
      facts: [
        { value: "13,7 GB", label: "di memoria quando è caricato" },
        { value: "6 → 12", label: "messaggi sbagliati quando lavorava da solo" },
        { value: "141 s → 545 s", label: "per la stessa prova" },
      ],
      aside:
        "La prima versione di quella prova era ingiusta con lui. Il mio test tagliava ogni risposta a 400 token, mentre nell’uso reale ne sono permessi 4.096, e questo modello può spenderne più di 400 a pensare prima di scrivere un solo carattere. Restituiva risposte vuote per colpa del mio test. Ho corretto il test e l’ho rifatto.",
    },
    {
      text: [
        "Riceve un messaggio solo se tutto questo è vero: la conversazione è breve, nessuno strumento è ancora stato usato, e non contiene parole d’azione come cancella, invia, paga, prenota o pubblica. Tutto il resto va al modello più grande, e così ogni errore.",
        "Viene caricato all’avvio del computer, così il tipo di messaggio più comune non aspetta mai.",
      ],
      facts: [
        { value: "0,7 s", label: "per una risposta semplice" },
        { value: "2,0 s", label: "per la stessa sul modello più grande" },
        { value: "11,8 GB", label: "di memoria" },
      ],
      aside:
        "Le parole d’azione sono una misura di sicurezza, non una comodità. Evitano che sia un cervello più debole a fare qualcosa di reale.",
    },
    {
      text: [
        "Trasforma ogni nota in una lunga lista di numeri. Note che significano cose simili ricevono numeri simili, così una domanda può trovare una nota che usa parole diverse.",
        "La qualità della ricerca si prova come tutto il resto: un insieme di domande con risposte giuste note, e una modifica alla ricerca deve superare quella prova prima di diventare quella predefinita.",
      ],
      facts: [{ value: "0,8", label: "punteggio minimo sulle domande di prova perché una modifica alla ricerca sia accettata" }],
      aside:
        "Esiste anche un metodo misto che confronta le parole così come sono. Resta un esperimento finché non batte quello semplice su quelle domande di prova.",
    },
    {
      text: [
        "Li raggiungo soprattutto con abbonamenti che pago già, così una giornata pesante non produce un conto a sorpresa. Il mio assistente principale risponde con un modello ospitato e ripiega su uno locale se quello non è disponibile.",
        "La regola per andare fuori: un modello locale ha fallito due volte lo stesso compito senza un motivo chiaro, la decisione comporta veri compromessi, oppure sta per uscire qualcosa di pubblico o delicato per la sicurezza. Non per le modifiche di routine, e non per rifare un lavoro che un modello locale ha già fatto bene.",
      ],
      aside:
        "A fine settembre un modello locale debole si è rivelato la causa di un’intera giornata di difetti nel mio assistente di messaggistica. Spostare quel solo compito su un modello ospitato ha risolto più di qualsiasi riscrittura delle istruzioni.",
      link: { label: "L’assistente di messaggistica (in inglese)", to: "/workstation/messaging-assistant" },
    },
  ],

  workers: [
    {
      text: [
        "Le mie estensioni comprendono: cambiare modello con una frase normale, un nuovo inizio quotidiano della conversazione, mettere in stop il portatile, e passare un lavoro a un ingegnere esperto dalla chat. In quest’ultima l’assistente può solo proporre il lavoro. A farlo partire è un breve codice che gli rimando io.",
        "La mia copia era rimasta molto indietro rispetto al progetto originale senza che me ne accorgessi. Rimettermi in pari ha voluto dire trasportare le mie modifiche attraverso un codice riorganizzato, e distinguere i guasti veri dal rumore: 97 test fallivano già nell’originale, 3 erano miei, e quelli sono stati corretti.",
      ],
      facts: [
        { value: "17.898", label: "modifiche di ritardo sull’originale quando me ne sono accorto" },
        { value: "78 + 31", label: "modifiche mie trasportate" },
        { value: "9", label: "estensioni mie" },
      ],
      aside:
        "Due volte l’ho riavviato mentre mi stava rispondendo, e ho ucciso la mia stessa conversazione. Ora un riavvio controlla prima se c’è una conversazione in corso.",
      link: { label: "L’assistente nel dettaglio (in inglese)", to: "/workstation/hermes-gateway" },
    },
    {
      text: [
        "Seguono lo stesso contratto scritto, tenuto in un unico file che leggono entrambi. Ogni compito finito termina con le stesse quattro liste: da fare per forza, da fare, sarebbe bello fare, cose rimaste aperte.",
        "Quando uno rivede il lavoro dell’altro, chi rivede parte da zero e gli viene detto di non fidarsi del resoconto dell’autore, degli appunti o dei test che passano. È così che quattro giri di revisione hanno trovato cinque modi per aggirare una protezione che l’autore considerava finita.",
      ],
      facts: [
        { value: "4", label: "giri di revisione su un solo strumento" },
        { value: "5", label: "difetti trovati che l’autore non aveva visto" },
      ],
      aside:
        "Il 1º ottobre 2026 uno dei due ha costruito la versione di questo sito che funziona senza JavaScript e l’altro l’ha rivista. La revisione ha scoperto che i lettori italiani avrebbero visto per un attimo ogni pagina in inglese. 58 test superati non se n’erano accorti.",
      link: { label: "La revisione che ha trovato cinque difetti (in inglese)", to: report("dns-rebinding-ssrf-browser-tool") },
    },
    {
      text: [
        "Gira su un modello locale, quindi non costa nulla per compito e niente esce dalla macchina. Gli do lavori con un traguardo chiaro.",
        "Il suo lavoro lo controllo sul disco. Nel confronto di settembre ha eseguito un comando, creato un file, corretto un errore e dimostrato che il test passava.",
      ],
      facts: [
        { value: "3 / 3", label: "compiti corretti" },
        { value: "137 s", label: "per tutti e tre" },
        { value: "8", label: "usi di strumenti per arrivarci" },
      ],
      aside:
        "Una notte di lavoro non presidiato mi aveva detto che sei lavori erano finiti. Un controllo indipendente il giorno dopo ha trovato che quasi tutti erano parziali o falliti, e che lo script che registrava i risultati permetteva di segnare qualsiasi lavoro come “verificato” senza prove.",
      link: { label: "Il turno di notte (in inglese)", to: "/workstation/qwen-night-shift" },
    },
    {
      text: [
        "Può leggere file, compilare ed eseguire test senza chiedere. Tutto il resto richiede il mio sì, e in un’esecuzione non presidiata viene rifiutato del tutto.",
        "Non salva mai da solo le modifiche a un progetto e non pubblica: registra una richiesta che approvo in una schermata a parte. Non invia mai email: può solo mettere in coda una bozza. In modalità “solo piano” fa una sola chiamata, propone un piano breve e non tocca niente.",
      ],
      facts: [
        { value: "8", label: "passi al massimo prima di doversi fermare e riferire" },
        { value: "2", label: "tentativi permessi con uno strumento che non esiste" },
      ],
      aside:
        "A volte i modelli chiedono uno strumento che non c’è. Invece di indovinare cosa intendevano, lui risponde con l’elenco degli strumenti che esistono e lascia riprovare il modello, due volte al massimo.",
    },
    {
      text: [
        "Quello che controlla i siti può citare un problema in un’email solo se la prova si ripete. Il riepilogo quotidiano è un lavoro programmato che ordina le notizie di sicurezza per importanza e suggerisce cosa fare per primo; se una fonte è ferma, le altre arrivano lo stesso.",
        "L’aiutante per le foto non sovrascrive mai un originale. Quello per le email manda sul mio telefono, come domanda sì o no, un mittente che non conosce, e ignora i mittenti bloccati.",
      ],
      facts: [
        { value: "7 / 10", label: "aiutante foto, piccolo lotto seguito da me" },
        { value: "4 / 10", label: "lotto grande con punti di controllo" },
        { value: "2 / 10", label: "da solo su tutto l’archivio" },
      ],
      aside:
        "Quei tre voti sono la documentazione dell’aiutante per le foto che valuta da sé quanto è pronto. Scrivere per cosa uno strumento non è pronto è utile quanto elencare ciò che sa fare.",
      link: { label: "Il controllo dei siti (in inglese)", to: "/workstation/webcheckup" },
    },
    {
      text: [
        "Ogni competenza ha una riga che dice quando si applica. Un lavoratore carica il testo completo solo quando la situazione corrisponde, così un manuale grande non costa un numero grande di token.",
        "Le nuove competenze nascono dagli attriti notati durante il lavoro vero. Il criterio non è quante volte qualcosa è andato storto, ma se una competenza esistente si sarebbe già attivata. In quel caso la lezione si aggiunge lì.",
      ],
      facts: [
        { value: "113", label: "competenze nella cartella condivisa al 1º ottobre 2026" },
        { value: "9 → 1", label: "osservazioni diventate una sola competenza nuova in una revisione di luglio" },
      ],
      aside:
        "Alcune competenze riguardano come parlare con me. Una fa rispondere ogni lavoratore con frasi brevi e semplici, senza riempitivi, e così risparmia anche token.",
    },
  ],

  manager: [
    {
      text: [
        "Legge la richiesta, decide che tipo di lavoro è, e guarda in una tabella chi lo fa di norma e chi è la riserva.",
        "La regola è: prima in locale. Un modello a pagamento entra dopo che uno locale ha fallito due volte lo stesso compito, quando una decisione comporta veri compromessi, o prima che esca qualcosa di pubblico o delicato per la sicurezza.",
      ],
      facts: [{ value: "2", label: "fallimenti in locale prima di passare il lavoro più in alto" }],
      aside:
        "I modelli che ho ritirato vengono filtrati dal suo elenco, così una vecchia scelta predefinita non può prendere di nascosto un cervello che non è più installato. Una strada ritirata rifiuta ad alta voce invece di ripiegare su qualcos’altro.",
      link: { label: "La workstation nel suo insieme (in inglese)", to: "/workstation/ai-workstation" },
    },
    {
      text: [
        "Una volta che una conversazione è passata al modello più grande, ci resta per tre ore. Andare avanti e indietro costringerebbe il modello a rileggere ogni volta tutta la conversazione, ed è più lento che non smistare affatto.",
        "Se qualcosa nello smistatore si rompe, il messaggio va al modello più grande. Uno smistatore guasto mi dà il comportamento di prima, mai un assistente muto.",
      ],
      facts: [
        { value: "4 s contro 89 s", label: "la misura che ha giustificato costruirlo" },
        { value: "3 h", label: "una conversazione resta sul modello più grande" },
        { value: "96", label: "test" },
      ],
      aside:
        "La prima versione non faceva assolutamente nulla, e i suoi registri sembravano perfetti. Mandava un messaggio al modello grande ogni volta che gli strumenti erano “presenti”, e l’assistente allega tutta la sua cassetta degli attrezzi a ogni messaggio. Ora la regola guarda gli strumenti davvero usati.",
    },
    {
      text: [
        "Ogni strumento che un lavoratore può vedere va descritto al modello in ogni richiesta. Costa token che venga usato o no, e allarga ciò che il lavoratore potrebbe fare per errore.",
        "Per questo una sessione parte con un profilo. Un lavoro di ricerca riceve gli strumenti di ricerca e non può toccare quelli di amministrazione.",
      ],
      facts: [
        { value: "6", label: "profili" },
        { value: "5 / 5", label: "fasi previste completate" },
      ],
      aside:
        "Mi aspettavo che far girare gli strumenti in contenitori separati riducesse il costo. Non lo riduce: una volta caricate, le descrizioni costano uguale. La documentazione lo dice, invece di vantare un risparmio.",
      link: { label: "Il lanciatore di profili (in inglese)", to: "/workstation/mcp-profile-launcher" },
    },
    {
      text: [
        "Le risposte possibili sono tre. Adatto: una riga, e poi si lavora. Un modello più economico può farne gran parte: fare solo la parte difficile, poi passare un prompt pronto. Troppo debole per questo: dire quale modello più forte serve.",
        "La scelta segue il passo più difficile ancora da fare, non la media. Un lavoro da cinque minuti non vale un cambio, e un lavoro che nessuno sta guardando non si ferma mai a chiedere.",
      ],
      aside:
        "Un piccolo script dice a ogni lavoratore su quale modello sta girando quando inizia una sessione, perché un modello non conosce in modo affidabile il proprio nome.",
    },
    {
      text: [
        "Il compressore sta tra i miei lavoratori che programmano e i modelli esterni, e riduce ciò che viene inviato. Il selettore costruisce il contesto di ogni compito: le regole di sicurezza sempre, e solo le note e le competenze che riguardano quel compito.",
        "L’uso viene registrato per ogni chiamata: quale modello, quanto tempo, quanti token. Mai la domanda, la risposta o una chiave.",
      ],
      facts: [
        { value: "186 milioni", label: "di token tolti finora, secondo il contatore del compressore stesso (1º ottobre 2026)" },
        { value: "2.600", label: "caratteri al massimo da una ricerca in memoria" },
      ],
      aside:
        "Ridurre le istruzioni date al mio assistente di messaggistica da 61.923 a 28.790 caratteri non ha solo fatto risparmiare token. Lo ha anche fatto suonare meno come un assistente.",
    },
    {
      text: [
        "Funziona per iscritto o a voce, con un messaggio vocale. La frase viene trasformata nel comando vero, quindi il cambio è un meccanismo e non il modello che promette di comportarsi diversamente.",
        "Lo stesso vale per l’impegno: posso chiedere più o meno ragionamento sul prossimo lavoro.",
      ],
      aside:
        "Cambiare modello può richiedere un riavvio, e un riavvio a metà risposta uccide la risposta. Quindi il cambio aspetta un momento tranquillo: nessun lavoro in corso, e niente da parte mia per cinque minuti.",
    },
  ],

  hands: [
    {
      text: [
        "La regola delle risposte funziona come un biglietto. Un messaggio che arriva crea un biglietto per quella conversazione. Una risposta lo consuma. Un biglietto non usato scade dopo cinque minuti. Niente biglietto, niente messaggio: l’assistente non può iniziare una conversazione.",
        "Nell’app in cui chiunque può scrivergli, gli strumenti che custodiscono password sono tolti, e il manuale degli strumenti non viene proprio mostrato al modello.",
      ],
      facts: [
        { value: "1", label: "risposta per messaggio ricevuto" },
        { value: "5 min", label: "prima che un permesso non usato scada" },
        { value: "123 × 3", label: "situazioni di prova per ogni giro di misura, nessuna delle quali invia qualcosa" },
      ],
      aside:
        "Le persone a cui risponde sanno che esiste. E non faccio prove su una persona reale: le prove non inviano mai nulla, e l’unico controllo vero va a un destinatario che controllo io.",
      link: { label: "Una risposta è un permesso, non un suggerimento (in inglese)", to: "/blog/206" },
    },
    {
      text: [
        "Il limite sta dentro il programma, non nelle istruzioni. L’assistente usa questo strumento scrivendo un comando, e tutto ciò che potrebbe impostare su quella riga di comando potrebbe anche cambiarlo. Perciò l’elenco dei calendari su cui può scrivere è fissato nel codice.",
        "La cancellazione non è stata disattivata. È stata tolta. Il calendario non ha un “annulla” né un cestino.",
      ],
      aside:
        "Nove giorni dopo aver tolto la funzione di cancellazione l’ho trovata ancora in due vecchie copie del codice. Ripristinare una delle due l’avrebbe riportata indietro. Una capacità che si ritira va tolta dappertutto, e ora c’è un test che fallisce se ricompare.",
    },
    {
      text: [
        "Uno strumento che apre qualsiasi indirizzo gli venga dato può essere puntato verso l’interno, su macchine che da fuori non dovrebbero mai essere raggiungibili. Lo strumento controllava prima ogni indirizzo. Il difetto era che poi il browser cercava l’indirizzo una seconda volta, e poteva ricevere una risposta diversa.",
        "Quattro giri di revisione indipendente hanno trovato cinque modi per aggirare la protezione. Ognuno è stato dimostrato, corretto e dotato di un test permanente. Finché erano aperti, lo strumento non è mai stato collegato a nulla di non fidato.",
      ],
      facts: [
        { value: "5", label: "modi per aggirarla, tutti chiusi" },
        { value: "4", label: "giri di revisione" },
        { value: "144 → 158", label: "test" },
      ],
      aside:
        "Il più grave dei cinque era in codice che nessuno aveva toccato, descritto in ogni appunto precedente come finito. Gli indirizzi scritti come semplici numeri saltavano del tutto il controllo, perché il controllo partiva solo quando c’era un nome da cercare.",
      link: { label: "Il rapporto completo sulla vulnerabilità (in inglese)", to: report("dns-rebinding-ssrf-browser-tool") },
    },
    {
      text: [
        "Per la posta ordinaria scrive bozze e si ferma lì. L’unico percorso che può inviare da solo è la consegna di un rapporto finito, e solo a indirizzi esatti di un breve elenco che approvo io. Se quell’elenco manca, è vuoto o è leggibile da altri utenti, tutto viene bloccato.",
        "Ogni decisione viene registrata: quando, a chi, l’oggetto, permesso o rifiutato, e perché. Mai il testo. Se la registrazione non può essere scritta, il messaggio non parte.",
      ],
      aside:
        "“Inviato” non si prende sulla parola dello strumento. Il messaggio deve comparire nella cartella Inviati con il suo identificativo, e “ricevuto” significa che lo stesso identificativo è stato trovato nella posta in arrivo del destinatario. Riprovare non manda mai una seconda copia.",
    },
    {
      text: [
        "Una modifica viene salvata con i nomi dei file che ha toccato, mai come “tutto ciò che è cambiato”. Più lavoratori condividono le stesse cartelle, e un salvataggio generico si porta dietro il lavoro a metà di qualcun altro.",
        "Per i miei documenti personali l’assistente può leggere quando glielo chiedo. Ogni modifica mi viene mostrata come prima-e-dopo e aspetta il mio sì.",
      ],
      facts: [{ value: "1.364", label: "modifiche registrate in 13 settimane" }],
      aside:
        "Quella regola nasce da una svista vera: un salvataggio ha inglobato l’appunto non finito di un’altra sessione, perché due lavoratori condividevano la stessa area d’attesa. Alla fine di ogni sessione un piccolo script ora elenca i file non salvati e il lavoro non pubblicato.",
    },
    {
      text: [
        "Tre cose vengono tenute distinte: il lavoratore sa trovare le istruzioni per fare un rapporto; una prova completata dimostra che le ha seguite; e nessuna risposta, che vale come “non si sa” e mai come prova.",
        "Un rapporto finito può poi essere consegnato per posta, con la consegna controllata allo stesso modo.",
      ],
      aside:
        "Questo controllo esiste per via di un modello che l’ha fallito in pieno. Nella prova di luglio al vecchio modello di tutti i giorni sono stati chiesti rapporti in PDF e non ne ha prodotto nessuno.",
    },
    {
      text: [
        "Tengo premuto un pulsante per dettare. L’app mostra come bozza ciò che ha capito, e confermo prima che venga inviato. I file prodotti da un lavoro si possono vedere in anteprima, ma solo dentro un’unica cartella sicura.",
        "Le cose che il portatile non sa fare davvero vengono mostrate come previste, mai come se funzionassero.",
      ],
      facts: [
        { value: "6", label: "problemi trovati nella prima verifica" },
        { value: "4", label: "più piccoli, introdotti dalle correzioni" },
      ],
      aside:
        "La prima verifica ha trovato che il servizio dietro l’app accettava comandi da qualsiasi cosa sulla mia rete senza accesso, e che i lavori venivano segnati come “fatti” quando il risultato era vuoto. Entrambi i problemi sono stati corretti in settimana.",
      link: { label: "Il rapporto di verifica (in inglese)", to: report("security-audit-iphone-agent-app") },
    },
    {
      text: [
        "Il risveglio è un segnale di rete standard. Non porta con sé alcuna password e non può fare altro che svegliare. Mettere in stop è un’azione, quindi ha un suo piccolo programma che accetta esattamente una cosa, annota chi l’ha chiesta e la registra.",
        "Prima risponde e cinque secondi dopo va in stop. I comandi più vecchi di due minuti vengono ignorati: quando il portatile si sveglia, i vecchi messaggi vengono riconsegnati, e senza quella regola uno “stop” ormai superato lo rimetterebbe subito a dormire.",
      ],
      facts: [{ value: "138 s", label: "perché la macchina di supporto si riprendesse quando le ho tagliato apposta la connessione" }],
      aside:
        "Un giorno lo stop ha smesso di funzionare e la macchina di supporto sembrava spenta. Era rimasta accesa tutto il tempo: aveva perso la rete senza fili e poi aveva solo cercato per 36 ore senza ricollegarsi. Ora si ricollega dopo 90 secondi, ricarica il driver di rete dopo 5 minuti e si riavvia come ultima risorsa.",
      link: { label: "Lo spegnimento che nessuno sapeva spiegare (in inglese)", to: report("incident-unexplained-remote-shutdown") },
    },
  ],

  archive: [
    {
      text: [
        "La leggono quattro lavoratori diversi, e nessuno di loro può scriverci direttamente. Viene ricostruita a partire dalle note stesse.",
        "La ricostruzione avviene in una copia temporanea, viene controllata e poi sostituisce la vecchia in un solo passo. Se la ricostruzione si interrompe, la memoria precedente continua a funzionare.",
      ],
      facts: [
        { value: "7.343", label: "passaggi al 1º ottobre 2026" },
        { value: "1.121", label: "note da cui provengono" },
      ],
      aside:
        "Quando un lavoratore dice “non ho trovato niente”, non lo accetto finché la stessa ricerca non ha trovato qualcosa che so esserci. Anche cercare nel posto sbagliato non restituisce niente.",
    },
    {
      text: [
        "I taccuini sono due. Uno è compatto e contiene lo stato attuale di ogni progetto. L’altro è un diario compilato ogni ora dagli archivi di conversazione che ho approvato, al massimo 20 voci per volta.",
        "Cancellare una pagina del diario impedisce che venga ricreata. Una voce precisa può essere eliminata su richiesta, e la ricerca viene ricostruita perché sparisca davvero.",
      ],
      facts: [{ value: "20", label: "voci al massimo per ogni passaggio orario" }],
      aside:
        "Nella stessa app di appunti ci sono anche gli articoli del mio blog, come copie esatte. Un lavoratore può aggiungere una nota, ma non può sovrascriverne una esistente senza la mia conferma.",
    },
    {
      text: [
        "Ogni nota ha la data nel nome e termina con l’ora in cui è stata scritta, così capisco a colpo d’occhio quanto è vecchia.",
        "Ogni messaggio finale di un lavoratore termina con quattro liste: da fare per forza, da fare, sarebbe bello fare, cose rimaste aperte. Una prima lista vuota significa che il lavoro è davvero finito.",
      ],
      facts: [{ value: "538", label: "note nella cartella al 1º ottobre 2026" }],
      aside:
        "La regola esiste perché l’IA a pagamento ha limiti di utilizzo, e uno può esaurirsi a metà di un compito. Il lavoro su questo stesso sito è stato fermato una volta da un limite e ripreso più tardi partendo dalla nota.",
      link: { label: "Il sistema di chiusura dei lavori (in inglese)", to: "/workstation/continuity" },
    },
    {
      text: [
        "I limiti valgono anche se chi cerca chiede di più: otto risultati, 900 caratteri ciascuno, 4.000 in tutto. Una ricerca può essere ristretta per progetto, per fonte o per date.",
        "Qui niente viene mai cancellato in modo definitivo da un programma. Le cose vecchie vengono messe da parte con un registro di cosa erano e di come ripristinarle.",
      ],
      facts: [
        { value: "8", label: "risultati al massimo" },
        { value: "900", label: "caratteri per risultato" },
        { value: "4.000", label: "caratteri in tutto" },
      ],
      aside:
        "Al lavoro in background che riordina i vecchi file è vietato apposta guardare la mia scrivania. Un programma che non può vedere una cartella non deve concludere che sia vuota.",
    },
    {
      text: [
        "La cartella è tenuta in un archivio privato e copiata fuori dal portatile dopo ogni modifica, perché una cronologia locale sopravvive a una modifica sbagliata ma non a un disco morto.",
        "Le raccolte di competenze di terzi restano fuori e si possono riscaricare. Resta fuori anche tutto ciò che contiene un accesso.",
      ],
      facts: [{ value: "113", label: "competenze" }],
      aside:
        "La cartella in cui uno strumento tiene il proprio stato di lavoro non viene tracciata, di proposito. Contiene file di accesso, e una sola regola sbagliata scriverebbe una chiave in una cronologia difficile da ripulire.",
    },
    {
      text: [
        "La ricerca normale lascia fuori la stanza della storia, gli archivi, le trascrizioni, le cache, la mia cartella dei documenti e il mio taccuino privato.",
        "Nell’app in cui altre persone scrivono all’assistente, l’archivio condiviso non è proprio collegato.",
      ],
      aside:
        "Impostare l’elenco di strumenti di quell’app su “vuoto” non bastava. In quella versione del software un elenco vuoto voleva dire “eredita tutto”. Serviva un “nessuno” esplicito, e un controllo che gira prima di ogni aggiornamento orario.",
    },
  ],

  "quality-control": [
    {
      text: [
        "Ogni modifica riceve una scheda: cosa potrebbe rompersi, cosa lo impedisce, e il risultato di una prova eseguita davvero. La scheda è tenuta fuori dal progetto, e una prova è legata ai file esatti che ha controllato, così modificare il codice dopo la prova viene rilevato.",
        "A farla scattare non è la dimensione. Per accessi, messaggi in uscita, lavori programmati e pubblicazione, viene controllata anche una modifica di una riga.",
      ],
      facts: [
        { value: "34", label: "modi noti in cui le cose si rompono" },
        { value: "12", label: "persone nella chat di gruppo da cui è partito tutto" },
      ],
      aside:
        "È cominciato con una modifica di venti righe che mi ha zittito per un’intera mattina in una chat di gruppo di dodici persone. E quando ho eseguito il controllo sulla sua stessa costruzione, ha trovato errori che i suoi test non avevano visto.",
      link: { label: "Il controllo prima del decollo nel dettaglio (in inglese)", to: "/workstation/foresight" },
    },
    {
      text: [
        "Cose arrivate alle persone prima che queste regole esistessero: 1.178 caratteri di ragionamento del modello consegnati come messaggio, il testo grezzo di un errore del fornitore, e la trascrizione di un messaggio vocale rimandata a chi lo aveva registrato.",
        "Ognuna era nata come una riga nelle istruzioni. Ognuna è tornata. Ognuna ora è una regola nel filtro, con un test.",
      ],
      facts: [{ value: "1.178", label: "caratteri di ragionamento del modello in un solo messaggio, prima del filtro" }],
      aside:
        "Modificare il filtro non cambia nulla finché il servizio non viene riavviato, perché viene caricato una volta sola all’avvio. Prima di credere che una correzione sia attiva confronto quando è partito il servizio con quando il file è stato modificato l’ultima volta.",
      link: { label: "L’assistente di messaggistica (in inglese)", to: "/workstation/messaging-assistant" },
    },
    {
      text: [
        "Il 10 settembre ho aggiunto una riserva, perché un’interruzione desse una risposta più debole invece di nessuna. Entro un’ora il modello principale ha raggiunto un limite, la riserva è subentrata, e ha risposto “Buongiorno” a un commento sulla pioggia. Ho tolto quella riserva il giorno stesso e ne ho usata una all’altezza del modello principale.",
        "Dal 30 settembre la riserva è di nuovo un modello locale, per mia scelta. Tutto ciò che scrive passa comunque dall’ultima occhiata prima dell’invio, come ogni altro messaggio.",
      ],
      aside:
        "Il passaggio in sé non è mai stato il problema. Quel giorno ha fatto esattamente ciò per cui era stato costruito: ha notato il limite e ha cambiato modello senza far trapelare nulla. Il punto debole era ciò che diceva la riserva.",
    },
    {
      text: [
        "Il livello di supervisione rifiuta in blocco tre cose: un riassunto scritto a mano, un successo dichiarato dal lavoratore che ha fatto il lavoro, e la ripetizione di un passo fallito senza cambiare nulla.",
        "Nel ciclo di riparazione che ho costruito, 15 problemi riparabili su 15 sono stati riparati e 3 impossibili su 3 sono stati fermati con onestà, senza alcun falso successo.",
      ],
      facts: [
        { value: "15 / 15", label: "problemi riparabili riparati" },
        { value: "3 / 3", label: "impossibili fermati con onestà" },
        { value: "0", label: "falsi successi" },
      ],
      aside:
        "Il turno di notte che dichiarava sei lavori finiti aveva uno script che permetteva di segnare qualsiasi lavoro come “verificato” senza prove. Quella scoperta è diventata questa regola.",
      link: { label: "Il turno di notte (in inglese)", to: "/workstation/qwen-night-shift" },
    },
    {
      text: [
        "Quando avvio un lavoro dalla chat, l’assistente può solo proporlo. Mi mostra cosa ha capito e un breve codice, e il lavoro parte quando gli rimando il codice.",
        "Un’email da qualcuno che non ha mai visto arriva sul mio telefono come una scheda con dei pulsanti. La prova dal vivo del livello di supervisione mi ha avvisato di 24 dei suoi 25 fallimenti.",
      ],
      facts: [{ value: "24 su 25", label: "fallimenti arrivati sul mio telefono durante la prova" }],
      aside:
        "I pulsanti di quella scheda possono portare solo 64 byte, e un indirizzo email può essere più lungo. Perciò la scheda porta un breve codice casuale e l’indirizzo viene ritrovato dalla mia parte.",
    },
    {
      text: [
        "Sono quattro: il mio taccuino privato, la mia cartella dei documenti, tutto ciò che riguarda password o pagamenti, e una distruzione che un backup non potrebbe annullare.",
        "Tutto il resto è permesso di proposito senza chiedere. Prima di una modifica rischiosa il lavoratore fa una copia con la data e va avanti.",
      ],
      facts: [{ value: "4", label: "limiti invalicabili, e nient’altro richiede un permesso" }],
      aside:
        "Io le richieste di permesso non le leggo. Così le ho tolte e ho spostato il controllo in backup e limiti che reggono che io stia attento o no.",
    },
    {
      text: [
        "Al controllo sulla riservatezza di questo sito viene prima mostrato un testo con un dettaglio privato messo apposta, e deve accorgersene. Un test che protegge una correzione viene eseguito una volta contro la versione rotta, per vederlo fallire.",
        "Lo stesso vale per chi controlla. Uno dei miei aveva segnato come superati quattro difetti, perché verificava solo che il risultato sbagliato fosse assente e mai che la risposta richiesta fosse presente.",
      ],
      facts: [{ value: "4", label: "difetti che il mio stesso sistema di prova aveva segnato come superati" }],
      aside:
        "Una volta un controllo ha dichiarato rotto un backup completo, per il modo in cui due comandi erano concatenati: trovare subito il file faceva fallire la verifica. Prima di fidarmi di un “no”, ora il controllo gira una volta su un esempio sicuramente buono e su uno sicuramente cattivo.",
    },
  ],

  insurance: [
    {
      text: [
        "I dati vengono resi illeggibili sul portatile prima di uscirne, quindi la seconda macchina custodisce sempre e solo qualcosa di incomprensibile. Si raggiunge attraverso una rete privata e non è mai esposta a internet. Il backup parte a orari stabiliti senza di me.",
        "Copre il database, le impostazioni e lo stato di lavoro dell’assistente. Non è una copia dell’intero computer.",
      ],
      aside:
        "Il rapporto sul ripristino dice chiaramente cosa non è coperto: se entrambe le macchine possono andare perse nello stesso evento, serve un’altra copia altrove. Per questo tengo anche una copia su un disco rimovibile, con un promemoria mensile per aggiornarla.",
      link: { label: "Il rapporto sulla prova di ripristino (in inglese)", to: report("backup-restore-drill-agent-state") },
    },
    {
      text: [
        "Il controllo si limita a leggere. Non avvia mai l’assistente dalla copia ripristinata, perché i dati ripristinati contengono gli accessi che l’assistente usa, e avviarlo avrebbe messo due copie attive sugli stessi account.",
        "Per dimostrare che il sistema in funzione non è stato disturbato, ho annotato il suo processo e un’impronta del suo file di accesso prima e dopo. Erano identici.",
      ],
      facts: [
        { value: "2.606", label: "file riletti" },
        { value: "14 / 14", label: "controlli completati" },
        { value: "21", label: "tabelle del database" },
      ],
      aside:
        "Il controllo di integrità si è lamentato dell’indice di ricerca. Quell’indice si ricostruisce dai dati che descrive, quindi quegli avvisi sono stati registrati a parte rispetto ai danni ai dati originali, che non c’erano. Un controllo che tratta ogni avviso come un danno fallisce sempre e non dice nulla.",
      link: { label: "Il rapporto sulla prova di ripristino (in inglese)", to: report("backup-restore-drill-agent-state") },
    },
    {
      text: [
        "La copia sta accanto all’originale, con la data nel nome e il motivo per cui è stata fatta. Il resoconto finale dice cosa è stato copiato e dove.",
        "Serve solo per ciò che è irreversibile. Una modifica ordinaria è già coperta dal registro delle modifiche e non ha bisogno di cerimonie.",
      ],
      aside:
        "Una volta una modifica alle impostazioni ha fermato il mio assistente per 30 secondi: un apostrofo nel posto sbagliato. Ora una modifica alle impostazioni viene scritta in un file temporaneo, riletta per dimostrare che è valida, e solo allora messa al posto dell’originale.",
    },
    {
      text: [
        "Più lavoratori e io modifichiamo le stesse cartelle, quindi il registro è anche il modo in cui scopro chi ha cambiato cosa e quando.",
        "Anche pubblicare questo sito è una modifica registrata. Se una versione è sbagliata, quella precedente è a un comando di distanza.",
      ],
      facts: [{ value: "1.364", label: "modifiche registrate in 13 settimane" }],
      aside:
        "Un registro può nascondere un problema tanto quanto rivelarlo. La mia copia del software dell’assistente è rimasta 17.898 modifiche indietro rispetto all’originale e niente mi ha avvisato. Ora eseguo un controllo di una riga ogni volta che sto già lavorando in un progetto che ha un originale.",
    },
    {
      text: [
        "Tolto significa che non può partire per sbaglio. Il percorso che poteva servire il grande modello ritirato ora risponde “no” in ogni caso. Lo strumento di programmazione ritirato esce con una nota su come reinstallarlo, e lo smistatore rifiuta quella strada prima di mandare qualsiasi lavoro.",
        "Ciò che potrebbe servire di nuovo è conservato in un archivio fuori da ogni cartella in cui i miei lavoratori cercano.",
      ],
      aside:
        "Uno dei miei registri di ritiro elenca cosa è stato tolto e come tornare indietro, ma non il perché. Ho dovuto ricostruire il motivo mesi dopo. Ora il motivo lo scrivo il giorno stesso.",
      link: { label: "Il cimitero dei progetti (in inglese)", to: "/workstation" },
    },
    {
      text: [
        "Esiste perché a luglio due accessi alla posta sono rimasti morti per tre settimane e niente se n’è accorto. È tenuto apposta separato da ciò che sorveglia: un guardiano che dipende da ciò che sorveglia cade insieme a lui.",
        "Avvisa sul telefono e sul computer. E distingue “l’accesso è stato revocato” da “la rete non funziona”, che falliscono esattamente allo stesso modo e significano cose opposte.",
      ],
      facts: [
        { value: "3 settimane", label: "due accessi sono rimasti morti prima che qualcuno se ne accorgesse" },
        { value: "ogni ora", label: "controlla adesso" },
      ],
      aside:
        "Il controllo stesso tiene vivi gli accessi: usare un accesso è ciò che gli impedisce di scadere dopo mesi di inattività. E un accesso che muore dopo circa sette giorni indica un errore di configurazione ben preciso, quindi l’allarme lo dice subito invece di lasciarmelo riscoprire.",
    },
    {
      text: [
        "Una nota dice cosa è fatto, cosa resta, l’esatto comando successivo e cosa non va rifatto. Un piccolo script alla fine di ogni sessione elenca i file non salvati, il lavoro non pubblicato e i rami aperti.",
        "Tutto ciò che un lavoratore non è riuscito a finire va nominato, con chi deve agire.",
      ],
      facts: [{ value: "538", label: "note al 1º ottobre 2026" }],
      aside:
        "Tre strumenti di IA e io lavoriamo nelle stesse cartelle, a volte nello stesso momento. Il 1º ottobre uno di loro ha pubblicato una modifica a questo sito mentre un altro la stava ancora rivedendo. Gli appunti lasciati da ciascuno sono il motivo per cui nessuno dei due ha sovrascritto l’altro.",
      link: { label: "Il sistema di chiusura dei lavori (in inglese)", to: "/workstation/continuity" },
    },
  ],
};

export const roleMore: Record<Lang, Record<string, ItemMore[]>> = { en, it };
