export const getErrorMessage = (error: unknown): string => {
  if (!error) return 'Not defined error';

  if (error instanceof Error) {
    try {
      const parsed = JSON.parse(error.message);
      if (parsed && typeof parsed === 'object' && 'error' in parsed) {
        return String(parsed.error);
      }
    } catch {
      return error.message;
    }
  }
  return 'Unknown error occurred';
};
