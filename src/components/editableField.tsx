import React, { useState } from "react";

interface EditableFieldProps {
  label: string;
  value: string | number;
  onSave: (value: string | number) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };

  return (
    <div>
      <p>
        {label}: {value}
      </p>
      {isEditing ? (
        <>
          <input
            className="input-custom"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="button-custom" onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <button className="button-custom" onClick={() => setIsEditing(true)}>
          Change
        </button>
      )}
    </div>
  );
};

export default EditableField;
