import Dropdown from "./Dropdown";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/skjema/risk.module.css";
import { HelpText, TextField } from "@navikt/ds-react";
import { DropdownValues } from "@/pages/skjema";
import Tiltak from "./Tiltak";

const Risk = () => {
  const [color, setColor] = useState("none");

  const [probValue, setProbValue] = useState("0");
  const [consValue, setConsValue] = useState("0");

  useEffect(() => {
    updateColor(probValue, consValue);
  }, [probValue, consValue]);

  const updateColor = (prob: string, cons: string) => {
    let probInt = parseInt(prob);
    let consInt = parseInt(cons);

    if (probInt > 0 && consInt > 0) {
      let total = probInt * consInt;
      if (total <= 4 && probInt <= 3 && consInt <= 3) {
        setColor("green");
      } else if (total >= 15) {
        setColor("red");
      } else if (total >= 4 && total < 15) {
        setColor("yellow");
      }
    }
  };

  const dropdownOptions = [
    { value: "0", label: "Velg verdi" },
    { value: "1", label: "1" },
    { value: "1.5", label: "1.5" },
    { value: "2", label: "2" },
    { value: "2.5", label: "2.5" },
    { value: "3", label: "3" },
    { value: "3.5", label: "3.5" },
    { value: "4", label: "4" },
    { value: "4.5", label: "4.5" },
    { value: "5", label: "5" },
  ];

  return (
    <div>
      <h2>Risiko</h2>
      <div className={styles.verdier}>
        <h3>Fyll inn verdier</h3>
        <HelpText title="Hva skal du gjøre?">
          Velg verdier for sannsynlighet og konsekvens gjort i din
          risikovurdering
        </HelpText>
      </div>
      <div>
        <TextField
          label="RisikoID"
          value={"R1"}
          readOnly
          //id={styles["tester"]}
          style={{ backgroundColor: color }}
        />
      </div>
      <div className={styles.verdier}>
        <Dropdown
          title={"Sannsynlighet"}
          formKey={"prob"}
          setVerdi={setProbValue}
          options={dropdownOptions}
        />
        <Dropdown
          title={"Konsekvens"}
          formKey={"cons"}
          setVerdi={setConsValue}
          options={dropdownOptions}
        />
      </div>
    </div>
  );
};

export default Risk;
