export type FieldType = 'text'|'textarea'|'select'|'checkbox'|'radio'|'date';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  helpText?: string;
  options?: string[];
  validation?: ValidationRule;
}

export interface FormTemplate {
  id: string;
  name: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  id: string;
  templateId: string;
  values: Record<string, any>;
  createdAt: string;
}
