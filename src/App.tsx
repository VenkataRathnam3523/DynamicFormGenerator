import React, { useState } from 'react';
import FormGenerator from './FormGenerator';
import './App.css';


const App: React.FC = () => {
  // Initial form schema
  const initialJsonSchema = {
    formTitle: "Sign Up",
    formDescription: "",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name"
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address"
        }
      },
      {
        id: "companySize",
        type: "select",
        label: "Company Size",
        required: true,
        options: [
          { value: "1-50", label: "1-50 employees" },
          { value: "51-200", label: "51-200 employees" },
          { value: "201-1000", label: "201-1000 employees" },
          { value: "1000+", label: "1000+ employees" }
        ]
      },
      {
        id: "industry",
        type: "radio",
        label: "Industry",
        required: true,
        options: [
          { value: "tech", label: "Technology" },
          { value: "healthcare", label: "Healthcare" },
          { value: "finance", label: "Finance" },
          { value: "retail", label: "Retail" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "timeline",
        type: "select",
        label: "Project Timeline",
        required: true,
        options: [
          { value: "immediate", label: "Immediate (within 1 month)" },
          { value: "short", label: "Short-term (1-3 months)" },
          { value: "medium", label: "Medium-term (3-6 months)" },
          { value: "long", label: "Long-term (6+ months)" }
        ]
      },
      {
        id: "comments",
        type: "textarea",
        label: "Additional Comments",
        required: false,
        placeholder: "Any other details you'd like to share..."
      }
    ]
  };

  const [jsonSchema, setJsonSchema] = useState(initialJsonSchema);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const updatedJson = JSON.parse(e.target.value);
      setJsonSchema(updatedJson);
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };

  return (
    <div className="flex">
      {/* Left side - JSON editor */}
      <div className="w-1/2 p-4">
        <h2>Edit JSON Schema</h2>
        <textarea
          value={JSON.stringify(jsonSchema, null, 2)}
          onChange={handleJsonChange}
          rows={20}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Right side - Form Preview */}
      <div className="w-1/2 p-4">
        <h2>{jsonSchema.formTitle}</h2>
        {jsonSchema.formDescription && <p>{jsonSchema.formDescription}</p>}
        <FormGenerator
          fields={jsonSchema.fields}
          formTitle={jsonSchema.formTitle}
          formDescription={jsonSchema.formDescription}
        />
      </div>
    </div>
  );
};

export default App;
