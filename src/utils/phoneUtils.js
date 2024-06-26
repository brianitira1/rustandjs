export function formatPhoneNumber(phoneNumber) {
    // Remove any non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    
    // Check if the number starts with '0' and has 10 digits
    if (digits.length === 10 && digits.startsWith('0')) {
      return '254' + digits.slice(1);
    }
    
    // If it's already in the correct format, return as is
    if (digits.length === 12 && digits.startsWith('254')) {
      return digits;
    }
    
    // If it doesn't match expected formats, return null or throw an error
    return null;
  }