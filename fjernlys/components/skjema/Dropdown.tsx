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

const Dropdown = ({ title, setVerdi, verdi, options }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setVerdi(selectedValue);
  };

  return (
    <div>
      <Select label={title} value={verdi} onChange={handleChange} size="small">
        {options.map((option, index) => (
          <option
            key={option.value}
            value={option.value}
            disabled={index === 0}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
