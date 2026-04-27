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

## Slide 2 — Why AI coding agents in our workflow

```
Why we're talking about this

• Faster understanding of unfamiliar code
• Faster scaffolding and boilerplate
• Tests written alongside code, not after
• Developer stays the reviewer and owner

Not: replace the engineer.
Yes: shorter cycle, with control.
```

**Speaker notes (SR):**
- Naglasi liniju "Not: replace the engineer." — ovo je ključna poruka.
- Reci: *"Ako AI agent jeste replacement za nešto, to je za one delove našeg posla koji su mehanički — scaffolding, tipično glue code, testovi za predvidljive slučajeve. Ne za odluke."*
- 60-90 sekundi. Ne ulazi u detalje sad — to dolazi.

---

## Slide 3 — What Claude Code is (in practice)

```
Claude Code, in practice

A local CLI agent that:
  reads your repo
  edits your files
  runs your commands
  follows project-specific rules

Works in your terminal. No cloud sync.
You decide what runs, what lands.
```

**Speaker notes (SR):**
- Otvori terminal sa Claude Code-om u kratkoj demo verziji ako stigne (ne mora — slide je dovoljan).
- Reci: *"Lokalni je. Vidi vaš kod, ne sluši na pozadini, ne sinhronizuje fajlove. Vi pokrećete, vi odlučujete šta se commituje."*
- 60-90 sekundi.

---

## Slide 4 — Why prompts alone aren't enough

```
The problem with "just prompt it"

  Without project context, the agent guesses.
  Without a workflow, it skips review steps.
  Without rules, it adds dependencies you don't want.

The fix:

  CLAUDE.md   →  permanent project rules
  Skills      →  reusable workflows
  Subagents   →  parallel, specialized work
```

**Speaker notes (SR):**
- Ovo je *najvažniji konceptualni slajd*. Publika treba da odnese: prompt nije dovoljan.
- Reci: *"Razlika između "AI piše kod" i "AI radi kroz workflow" je razlika između chatbota i kolege."*
- Pokaži CLAUDE.md uživo posle ovog slajda (idi na slide 5 koji ima arhitekturu, pa otvori CLAUDE.md u editoru).
- 90 sekundi.

---

## Slide 5 — Demo application architecture

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

## Slide 6 — Today's demo task

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

## Slide 7 — The live workflow

```
What the agent will do

  1.  Brainstorm the feature  (asks me questions)
  2.  Write the plan          (commits to a doc)
  3.  Dispatch subagents      (parallel work)
  4.  Run tests               (verifies its own output)
  5.  Summarize               (reports what changed)

You'll see steps 1–3 live.
Steps 4–5 take longer; we'll jump
to a finished result.
```

**Speaker notes (SR):**
- Pre nego što kreneš sa live: *"Ovih 5 koraka su skill-ovi unutar Claude Code-a. Ne moja izmišljotina, ne magic — workflow patern."*
- Bukvalno objasni: *"Sad kucam jedan prompt. Vidite šta se dešava."*
- Idi na cheatsheet stranicu — sledeći deo je live, ne slajdovi.

**LIVE FLOW POČINJE OVDE.** Vidi `04-prepared-prompts.md` i `03-presenter-cheatsheet.md`.

---

## Slide 8 — What agents do well

```
Where agents earn their keep

  Scaffolding new features along existing patterns
  Writing tests for predictable code paths
  Wiring components, routes, services
  Refactoring repetitive structures
  Exploring unfamiliar code (read-only)

The pattern: bounded, well-shaped problems.
```

**Speaker notes (SR):**
- Vraćaš se na slajdove posle live demoa.
- *"Vidite — sve što ste videli da radi su ovi tipovi zadataka. Ne kreativnost, ne arhitektonske odluke, ne 'osmisli novi koncept'. Nego: 'ovo je patern, ponovi ga ovde'."*
- 60 sekundi.

---

## Slide 9 — Limits and risks

```
Where it can go wrong

  Wrong assumptions made silently
  Diff bigger than the task warranted
  Tests that pass but don't actually verify
  Confidence that exceeds correctness
  "Helpful" refactors that break things

Mitigation: small scope, plan-first, mandatory review.
```

**Speaker notes (SR):**
- Ovaj slajd je *bitan za kredibilitet*. Ne preskači rizike.
- Daj jedan konkretan primer iz ličnog iskustva ako možeš (npr. "agent je jednom dodao biblioteku koja nam nije trebala — uhvatio sam u review-u").
- *"Plan-first workflow koji ste videli direktno adresira ovo. Ako agent prvo napiše plan, vidite šta neće raditi pre nego što krene."*
- 90 sekundi. **Najjača poenta nakon live deoa.**

---

## Slide 10 — Recommended team model

```
How a team should use this

  Agent makes the plan      →  Human approves
  Agent makes small diffs   →  Human reviews each
  Tests are mandatory       →  CI gates on coverage
  No autonomous merging     →  Always a human PR
  CLAUDE.md owned by team   →  Living document

Treat the agent as a fast junior.
Treat yourself as the senior.
```

**Speaker notes (SR):**
- Naglasi poslednje dve linije — to je memorable.
- *"Ako bi novi junior u timu radio bez review-a, ne bi pustili. Isto pravilo za agenta."*
- 60 sekundi.

---

## Slide 11 — Conclusion

```
Takeaway

  The value isn't agent autonomy.
  It's a faster, controlled cycle
  where the developer stays the owner.

Try it tomorrow:
  →  Write a CLAUDE.md for one repo
  →  Run one feature through plan-first
  →  Compare diff vs. how you'd write it

Thank you.

→ Leave a question or comment
```

**Speaker notes (SR):**
- Ne čitaj slide. Reci centralnu poruku svojim rečima.
- *"Ako biste sutra nešto probali — najmanji korak je CLAUDE.md za jedan repo. Pola sata posla. Već ćete videti razliku u sledećoj interakciji."*
- Pozovi pitanja kroz Q&A link na slajdu.
- Ostavi 3-5 minuta za pitanja.

---

## Cross-cutting reminders

- **Don't read the slide.** Glance at it, then look at the audience.
- **Move on quickly from intro.** Most of the value is in slides 4-7 (concept + live).
- **If you forget what to say — pause.** Silence reads as confidence. Filler words don't.
- **Time check at slide 8.** If past 22 min, skip slide 10 and go straight to conclusion.
