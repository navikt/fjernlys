import { DropdownValues } from "@/pages/skjema";
import { Select } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";

interface Props {
  title: string;
  formKey: string;
  setVerdi: any;
  verdi?: string;
}

const Dropdown = ({ title, formKey, setVerdi, verdi }: Props) => {
  const test = (verdi: string) => {
    setVerdi(verdi);
  };

  return (
    <div>
      <Select
        label={title}
        size="small"
        onChange={(e) => test(e.target.value)}
        value={verdi}
      >
        <option value="0" disabled>
          Velg verdi
        </option>
        <option value="1">1</option>
        <option value="1.5">1.5</option>
        <option value="2">2</option>
        <option value="2.5">2.5</option>
        <option value="3">3</option>
        <option value="3.5">3.5</option>
        <option value="4">4</option>
        <option value="4.5">4.5</option>
        <option value="5">5</option>
      </Select>
    </div>
  );
};

export default Dropdown;
