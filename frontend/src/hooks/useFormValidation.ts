import { useState } from "react";

type ValidationRule = (value: string) => string;

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

export function useFormValidation<T extends Record<string, string>>(
  initialValues: T,
  validationRules: ValidationRules<T>,
  onSubmit: (values: T) => void | Promise<void>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateField = (name: keyof T, value: string): string => {
    const rule = validationRules[name];

    if (!rule) {
      return "";
    }

    return rule(value);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    const errorMessage = validateField(name as keyof T, value);

    if (errorMessage) {
      setErrors({ ...errors, [name]: errorMessage });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name as keyof T];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;
    for (const key in values) {
      const errorMessage = validateField(key as keyof T, values[key]);

      if (errorMessage) {
        newErrors[key as keyof T] = errorMessage;
        isValid = false;
      }
    }

    setErrors(newErrors);
    if (isValid) {
      await onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    validateField,
  };
}
