/**
 * Formats a phone number string by removing non-digits and limiting to 10 characters.
 * @param value The raw input string
 * @returns A string containing only digits, up to 10 characters long
 */
export const formatPhoneNumber = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 10);
};
