import Dropdown from "./Dropdown";
import React from "react";
import styles from "@/styles/skjema/risk.module.css";
import { HelpText, TextField } from "@navikt/ds-react";
import Tiltak from "./Tiltak";

const Risk = () => {
  const addTiltak = () => {
    console.log("Legg til tiltak");
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
        <TextField label="RisikoID" value={"R1"} readOnly />
      </div>
      <div>
        <div className={styles.verdier}>
          <Dropdown title={"Sannsynlighet"} />
          <Dropdown title={"Konsekvens"} />
        </div>
      </div>
    </div>
  );
};

export default Risk;
