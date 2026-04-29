# Slide Content

> Slide text in English (what the audience sees). Speaker notes in Serbian
> below each slide (what you say, reminders).
>
> **Language:** English on slide. Serbian for personal notes.
> **Format guideline:** few words on slide. You explain. Don't read the slide aloud.

---

## Slide 1 — Title

```
Claude Code in Practice

How an AI agent delivers features
through a disciplined workflow

Vladimir Bujanovic · Mitto · 2026
```

**Speaker notes (SR):**
- Pozdravi publiku, predstavi se ukratko.
- Reci: *"Naredna 30 minuta — ne o tome šta je Claude Code u marketinškom smislu, nego kako radi u praksi i šta to znači za vaš dnevni rad."*
- Postavi očekivanje: *"Cilj nije da vas ubedim, nego da imate dovoljno informacija da donesete sopstvenu procenu."*
- Pređi dalje za 30-45 sekundi. **Nemoj se zadržavati na uvodu.**

---

## Slide 2 — What Claude Code is (in practice)

```
Claude Code, in practice

A local CLI agent that:
  reads your repo
  edits your files
  runs your commands
  follows project-specific rules

Works in your terminal. You decide what runs.
```

**Speaker notes (SR):**
- Otvori terminal sa Claude Code-om u kratkoj demo verziji ako stigne (ne mora — slide je dovoljan).
- Reci: *"Lokalni je. Vidi vaš kod, vi odlučujete šta se pokreće."*
- 60-90 sekundi.

---

## Slide 3 — Why prompts alone aren't enough

```
The problem with "just prompt it"

  Without project context, the agent guesses.
  Without a workflow, it skips review steps.
  Without rules, it adds dependencies you don't want.

The fix:

  CLAUDE.md   →  permanent project rules
  Skills      →  reusable workflows
  Subagents   →  parallel, specialized work

  …driven by a disciplined 6-step workflow:
  brainstorm → plan → execute → simplify → review → document
```

**Speaker notes (SR):**
- Ovo je *najvažniji konceptualni slajd*. Publika treba da odnese: prompt nije dovoljan.
- Reci: *"Razlika između "AI piše kod" i "AI radi kroz workflow" je razlika između chatbota i kolege."*
- Pokaži CLAUDE.md uživo posle ovog slajda (idi na slide 4 koji ima arhitekturu, pa otvori CLAUDE.md u editoru).
- 90 sekundi.

---

## Slide 4 — Demo application architecture

```
Today's demo app

  apps/web/      Angular 21 + Material
  server/        Node + Express + TypeScript
  e2e/           Playwright
  docs/          Plans, prompts, cheatsheet
  CLAUDE.md      The project context file

The slides you see right now
are rendered by this same app.
```

**Speaker notes (SR):**
- Objasni "meta" priču: aplikacija na kojoj prezentuješ je ista app na kojoj agent radi.
- Otvori VS Code u drugom monitoru. Pokaži strukturu repoa. Otvori CLAUDE.md.
- Pokaži ključne sekcije: workflow rules, frontend rules, definition of done.
- *"Ovo je fajl koji Claude pročita pre svake interakcije sa repoom. Ne morate da pišete romane — naš je oko 250 linija."*
- 2-3 minuta. **Najduža sekcija pre live demoa.**

---

## Slide 5 — Today's demo task

```
The task we'll give to the agent

  "Add an Audience Q&A feature."

  Backend:   GET / POST /api/feedback
             validation, in-memory storage
  Frontend:  /feedback page
             form, list, real-time-ish polling
  Tests:     unit + integration + Playwright e2e

→ Try the demo feature
```

**Speaker notes (SR):**
- Reci: *"Realan task. Ne todo list. Form, validacija, dva endpointa, sve sa testovima."*
- Klikni link "Try the demo feature" da pokažeš da već radi (jer si na `demo-finished` ako si pripremio, ili pokaži screenshot).
- *"Sada ću da glumim da nije gotovo i da pustim agenta da ga sagradi."*
- 60-90 sekundi. **Završi sa: "Hajde da stvarno pokrenemo."**

---

## Slide 6 — The live workflow

```
What the agent will do

  1.  Brainstorm   (asks me questions)
  2.  Plan         (writes a doc to docs/plans/)
  3.  Execute      (subagents in parallel, or main agent)
  4.  Simplify     (/simplify on the result)
  5.  Review       (code-reviewer subagent)
  6.  Document     (CLAUDE.md, README, docs/)

You'll see steps 1–3 live.
Step 3 takes 5–10 minutes to finish, so
we'll cut and switch to demo-finished.
Steps 4–6 then run live on top of the
finished result.
```

**Speaker notes (SR):**
- Pre nego što kreneš sa live: *"Ovih 6 koraka su skill-ovi i pattern unutar Claude Code-a — definisani u `CLAUDE.md` ovog repoa. Ne moja izmišljotina, ne magic — kanonski workflow."*
- Naglasi: *"Steps 1, 2, i 3 ćete da vidite uživo na `main`. Onda secam — switchujemo na `demo-finished` gde već postoji rezultat. Steps 4 (simplify), 5 (code-reviewer), i 6 (docs) puštam uživo nad gotovim kodom."*
- Bukvalno objasni: *"Sad kucam jedan prompt. Vidite šta se dešava."*
- Idi na cheatsheet stranicu — sledeći deo je live, ne slajdovi.

**LIVE FLOW POČINJE OVDE.** Vidi `04-prepared-prompts.md` i `03-presenter-cheatsheet.md`.

---

## Slide 7 — Results (What that produced)

```
What that produced

The same workflow, finished and committed.
Numbers below are from the actual test runs on this repo.

Commands                              Results
  npm test         # 36 web + 32       68 unit / integration passing
                     server unit/      95% backend coverage
                     integration       83% frontend coverage
  npm run e2e      # 5 functional      16 e2e (5 functional + 10 visual + 1 feedback)
                     + 10 visual
                     regression
  npm run coverage # HTML reports
                     under coverage/
```

Read the diff with `git diff main..demo-finished --stat`.

Live numbers on this slide come from
`apps/web/src/app/slides/slide-07-results/results.data.ts`, regenerated by
`npm run results:refresh` before the talk.

**Speaker notes (SR):**
- *"Ovo su realni brojevi sa ovog repoa, generisani pre demoa skriptom `npm run results:refresh`. Možeš ih i sad pokrenuti uživo u terminalu."*
- *"Komande i brojevi koje vidite ovde su izlaz onog istog 6-step workflowa koji ste upravo videli — brainstorm, plan, execute — ali izvršenog do kraja na `demo-finished`. Sada ćemo da pustimo i steps 4, 5 i 6 nad ovim rezultatom."*
- *"Komande su iste one koje vaš tim već zna — npm test, npm run e2e."*
- *"E2E ima dve familije: 5 funkcionalna testa i 10 visual regression testova koji slikaju svaki slajd i porede sa baseline-om, plus 1 feedback page snapshot."*
- *"Coverage nije cilj, ali je signal da agent nije preskočio testove."*
- 60-90 sekundi. Pređi na slajd 8 (What agents do well) kad si pokazao komande u terminalu.

---

## Slide 8 — What agents are good at

```
What agents are good at

  Adding new features that follow patterns you already have
  Writing tests
  Wiring up components, routes, services
  Cleaning up repetitive code
  Reading unfamiliar code (without changing it)
```

**Speaker notes (English):**
- Coming back to slides after the live demo.
- *"Everything you just saw — adding forms, routes, validation, tests — those are tasks agents handle well. We don't ask them for creative or architectural decisions, we ask them to repeat patterns we already have in the code."*
- *"The rule behind all this: a clear task with a clear result. The more open-ended the task, the worse it tends to go."*
- 60 seconds.

---

## Slide 9 — Where it can go wrong

```
Where it can go wrong

  Wrong guesses it never tells you about
  Changes bigger than the task asked for
  Tests that pass but don't really check anything
  Sounds confident even when it's wrong
  "Helpful" cleanups that break other things

Stay safe with: small scope, plan first, every diff reviewed.
```

**Speaker notes (English):**
- This is the credibility slide. Don't skip the risks.
- *"Each of these has bitten me at least once. The most expensive one is the first — the agent doesn't pause to ask, it picks a direction and ships it. You only see it in the diff."*
- If you have a personal example, share one. (E.g. *"I had an agent add a library we didn't need — caught it in review."*)
- *"The plan-first workflow you saw earlier directly addresses this. The plan is written before any code, so you see the wrong choices before they're made."*
- 90 seconds. **The strongest moment after the live demo — don't rush.**

---

## Slide 10 — Conclusion

```
Takeaway

  The value isn't agent autonomy.
  It's a faster, controlled cycle
  where the developer stays the owner.

Treat the agent as a fast junior.
Treat yourself as the senior.

Licenses are coming soon. I'm here for questions
and happy to share what I learned.

Thank you.

→ Leave a question or comment
```

**Speaker notes (English):**
- Don't read the slide. Say the takeaway in your own words.
- *"If you'd remember one thing from this talk — that's it. The fast junior / senior framing is the simplest way to think about your role."*
- *"Licenses for Claude Code or Codex are coming soon, so you'll all get to try this. Until then I'm here for questions, or come find me after — happy to share what I learned along the way."*
- Pause. Pause again. Don't rush "Thank you".
- Invite questions via the Q&A link on the slide.
- Leave 3-5 minutes for questions.

---

## Cross-cutting reminders

- **Don't read the slide.** Glance at it, then look at the audience.
- **Move on quickly from intro.** Most of the value is in slides 3-6 (concept + live).
- **If you forget what to say — pause.** Silence reads as confidence. Filler words don't.
- **Time check at slide 8.** If past 26 min, trim Slide 9 (Limits) to one strong example so you still land Slide 10 (Conclusion) cleanly.
