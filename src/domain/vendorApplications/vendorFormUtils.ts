export const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const toggleStandSelection = (current: string[], standId: string, max: number): string[] => {
  if (current.includes(standId)) {
    return current.filter((id) => id !== standId);
  }

  if (current.length >= max) {
    return current;
  }

  return [...current, standId];
};

export const isPhoneValid = (value: string) => /^[+\d\s()-]{7,}$/.test(value.trim());
