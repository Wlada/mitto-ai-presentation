export type SlideMeta = {
  number: number;
  route: string;
  title: string;
};

export const SLIDES: readonly SlideMeta[] = [
  { number: 1, route: 'title', title: 'Claude Code in Practice' },
  { number: 2, route: 'what-is-claude-code', title: 'What Claude Code is (in practice)' },
  { number: 3, route: 'prompts-not-enough', title: "Why prompts alone aren't enough" },
  { number: 4, route: 'architecture', title: 'Demo application architecture' },
  { number: 5, route: 'demo-task', title: "Today's demo task: Audience Q&A" },
  { number: 6, route: 'live-flow', title: 'The live workflow: analyze → plan → dispatch' },
  { number: 7, route: 'results', title: 'What that produced' },
  { number: 8, route: 'what-works', title: 'What agents do well' },
  { number: 9, route: 'limits', title: 'Limits and risks' },
  { number: 10, route: 'team-model', title: 'Recommended team model' },
  { number: 11, route: 'conclusion', title: 'Conclusion and next steps' },
] as const;
