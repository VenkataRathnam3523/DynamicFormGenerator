import React from 'react';
import { useForm, SubmitHandler, Controller, FieldError } from 'react-hook-form';


interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern: string;
    message: string;
  };
  options?: { value: string; label: string }[];
}

interface FormValues {
  [key: string]: any;
}

interface FormGeneratorProps {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ formTitle, formDescription, fields }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Submitted:', data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="form-container">
      {/* <h1>{formTitle}</h1> */}
      {formDescription && <p>{formDescription}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div key={field.id} className="form-field">
            <label htmlFor={field.id}>{field.label}</label>
            
            {field.type === 'text' || field.type === 'email' || field.type === 'textarea' ? (
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.id, {
                  required: field.required ? `${field.label} is required` : false,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined,
                })}
              />
            ) : null}
            
            {field.type === 'select' ? (
              <select {...register(field.id, { required: field.required ? `${field.label} is required` : false })}>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : null}

            {field.type === 'radio' ? (
              <div>
                {field.options?.map((option) => (
                  <label key={option.value}>
                    <input
                      type="radio"
                      value={option.value}
                      {...register(field.id, { required: `${field.label} is required` })}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ) : null}

            {errors[field.id] && <p className="error">{(errors[field.id] as FieldError).message}</p>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormGenerator;
