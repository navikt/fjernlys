import { DropdownValues } from "@/pages/skjema";
import { Select } from "@navikt/ds-react";
import React, { useContext } from "react";

interface Props {
  title: string;
  formKey: string;
  setVerdi: (verdi: string) => void;
  verdi?: string;
  options: { value: string; label: string }[];
}

const Dropdown = ({ title, formKey, setVerdi, verdi, options }: Props) => {
  const context = useContext(DropdownValues);

  // Ensure context is defined
  if (!context) {
    throw new Error("DropdownValues context is not provided.");
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setVerdi(selectedValue);
    context.updateFormData(formKey, selectedValue);
  };

  return (
    <div>
      <Select label={title} value={verdi} onChange={handleChange} size="small">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
