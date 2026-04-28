export type SlideMeta = {
  number: number;
  route: string;
  title: string;
};

export const SLIDES: readonly SlideMeta[] = [
  { number: 1, route: 'title', title: 'Claude Code in Practice' },
  { number: 2, route: 'why-agents', title: 'Why AI coding agents in our workflow' },
  { number: 3, route: 'what-is-claude-code', title: 'What Claude Code is (in practice)' },
  { number: 4, route: 'prompts-not-enough', title: "Why prompts alone aren't enough" },
  { number: 5, route: 'architecture', title: 'Demo application architecture' },
  { number: 6, route: 'demo-task', title: "Today's demo task: Audience Q&A" },
  { number: 7, route: 'live-flow', title: 'The live workflow: analyze → plan → dispatch' },
  { number: 8, route: 'results', title: 'What that produced' },
  { number: 9, route: 'what-works', title: 'What agents do well' },
  { number: 10, route: 'limits', title: 'Limits and risks' },
  { number: 11, route: 'team-model', title: 'Recommended team model' },
  { number: 12, route: 'conclusion', title: 'Conclusion and next steps' },
] as const;
