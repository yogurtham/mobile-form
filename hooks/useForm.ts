import { useState } from 'react';
import { ContactFormData, submitContactForm } from '../services/api';
import { FormErrors, validateContactForm } from './useContactForm';

type SubmitStatus = 'idle' | 'success' | 'error';

const INITIAL_FORM: ContactFormData = {
  name: '',
  email: '',
  message: '',
};

export function useForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: keyof ContactFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateContactForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  };

  return {
    formData,
    errors,
    isLoading,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
    reset,
  };
}
