import { Select } from "@navikt/ds-react";

interface Props {
  title: string;
  setValue: (value: string) => void;
  value?: string;
  options: { value: string; label: string }[];
}

const Dropdown = ({ title, setValue, value, options }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
  };

  return (
    <div>
      <Select label={title} value={value} onChange={handleChange} size="small">
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
