import Dropdown from "./Dropdown";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/skjema/risk.module.css";
import { HelpText, TextField } from "@navikt/ds-react";
import { DropdownValues } from "@/pages/skjema";
import Tiltak from "./Tiltak";

const Risk = () => {
  const addTiltak = () => {
    console.log("Legg til tiltak");
  };
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }
  const [color, setColor] = useState("none");
  const { formData, updateFormData } = context;
  const [probValue, setProbValue] = useState("0");
  const [consValue, setConsValue] = useState("0");

  useEffect(() => {
    updateColor(probValue, consValue);
    console.log(formData);
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
        />
        <Dropdown
          title={"Konsekvens"}
          formKey={"cons"}
          setVerdi={setConsValue}
        />
      </div>
    </div>
  );
};

export default Risk;
