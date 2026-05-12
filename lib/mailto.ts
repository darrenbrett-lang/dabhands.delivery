const EMAIL = 'db@dabhands.delivery';
const DEFAULT_SUBJECT = 'Starting a conversation';
const DEFAULT_BODY = 'I want to get stronger digital work into the world.';

export const mailto = (opts?: { subject?: string; body?: string }): string => {
  const subject = encodeURIComponent(opts?.subject ?? DEFAULT_SUBJECT);
  const body = encodeURIComponent(opts?.body ?? DEFAULT_BODY);
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
};
