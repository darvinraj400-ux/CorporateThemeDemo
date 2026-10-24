export interface FormData {
  fullName: string;
  email: string;
  organization: string;
  role: string;
  serviceInterest: string;
  challenge: string;
  preferredContact: string;
  consent: boolean;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  organization?: string;
  serviceInterest?: string;
  challenge?: string;
  consent?: string;
}

export function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Please enter your name.';
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your work email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.organization.trim()) {
    errors.organization = 'Please enter your organization.';
  }

  if (!data.serviceInterest) {
    errors.serviceInterest = 'Please select a consulting area.';
  }

  if (!data.challenge.trim()) {
    errors.challenge = 'Please describe your challenge.';
  }

  if (!data.consent) {
    errors.consent = 'Please confirm your consent to proceed.';
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export const initialFormData: FormData = {
  fullName: '',
  email: '',
  organization: '',
  role: '',
  serviceInterest: '',
  challenge: '',
  preferredContact: 'email',
  consent: false
};
