export interface Validation {
    pattern: string;
    message: string;
  }
  
  export interface Option {
    value: string;
    label: string;
  }
  
  export interface Field {
    id: string;
    type: string;
    label: string;
    required: boolean;
    placeholder?: string;
    validation?: Validation;
    options?: Option[];
  }
  
  export interface FormSchema {
    formTitle: string;
    formDescription: string;
    fields: Field[];
  }
  