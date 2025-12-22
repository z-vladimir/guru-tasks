export const STATUSES = ['backlog', 'in_progress', 'done'] as const;
export type Status = (typeof STATUSES)[number];

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
} as const;
