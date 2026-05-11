export type SlideMeta = {
  number: number;
  route: string;
  title: string;
};

export const SLIDES: readonly SlideMeta[] = [
  { number: 1, route: 'title', title: 'Claude Code in Practice' },
  { number: 2, route: 'what-is-claude-code', title: 'Claude Code CLI' },
  { number: 3, route: 'prompts-not-enough', title: 'The problem with Chat agent' },
  { number: 4, route: 'architecture', title: "Today's demo app" },
  { number: 5, route: 'live-flow', title: 'What the agent will do' },
  { number: 6, route: 'results', title: 'What we produced' },
  { number: 7, route: 'what-works', title: 'What agents do well' },
  { number: 8, route: 'limits', title: 'Limits and risks' },
  { number: 9, route: 'conclusion', title: 'Conclusion and next steps' },
] as const;
