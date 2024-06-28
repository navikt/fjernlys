import { Select } from "@navikt/ds-react";
import React from "react";
import DatoVelger from "./DatoVelger";
import styles from "@/styles/skjema/opplysninger.module.css";

const Opplysninger = () => {
  return (
    <div>
      <h3>Opplysning fra rapporteringsskjema</h3>
      <div className={styles.hovedDiv}>
        <Select label={"Ytelse"}>
          <option value="0" disabled selected>
            Velg ytelse/tjeneste
          </option>
          <option value="1">AAP</option>
          <option value="2">Alderspensjon</option>
        </Select>
        <DatoVelger />
      </div>
    </div>
  );
};

export default Opplysninger;
