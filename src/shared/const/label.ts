export const LABELS = [
  'frontend',
  'backend',
  'bug',
  'feature',
  'urgent',
] as const;
export type Label = (typeof LABELS)[number];
