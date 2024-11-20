import React, { useState } from 'react';
import { FormSchema } from './FormSchema';

interface JSONEditorProps {
  schema: FormSchema;
  onChange: (schema: FormSchema) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsedSchema = JSON.parse(e.target.value);
      onChange(parsedSchema);
      setError(null);
    } catch (err) {
      setError('Invalid JSON syntax');
    }
  };

  return (
    <div>
      <textarea
        className="w-full h-96 border p-2 rounded-md"
        value={JSON.stringify(schema, null, 2)}
        onChange={handleInputChange}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default JSONEditor;
