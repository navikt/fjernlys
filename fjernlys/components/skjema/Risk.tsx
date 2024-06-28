import Dropdown from "./Dropdown";
import React from "react";
import styles from "@/styles/skjema/risk.module.css";
import { HelpText } from "@navikt/ds-react";

const Risk = () => {
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
      <div className={styles.verdier}>
        <Dropdown title={"Sannsynlighet"} />
        <Dropdown title={"Konsekvens"} />
      </div>
    </div>
  );
};

export default Risk;
