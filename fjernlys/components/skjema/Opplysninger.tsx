import { Select } from "@navikt/ds-react";
import React from "react";
import DatoVelger from "./DatoVelger";
import styles from "@/styles/skjema/opplysninger.module.css";
import Risikoeier from "./Risikoeier";

const Opplysninger = () => {
  return (
    <div style={{ width: "100%" }}>
      <h3>Opplysning fra rapporteringsskjema</h3>
      <div className={styles.hovedDiv}>
        <div className={styles.selectDiv}>
          <div style={{ width: "80%" }}>
            <Select label={"Ytelse"}>
              <option value="0" disabled>
                Velg ytelse/tjeneste
              </option>
              <option value="1">Alderpensjon</option>
              <option value="2">Uføretrygd</option>
              <option value="3">AAP</option>
              <option value="4">Sykepenger</option>
              <option value="5">Dagpenger</option>
              <option value="6">Foreldrepenger</option>
              <option value="7">Utbetaling</option>
            </Select>
          </div>
        </div>
        <Risikoeier />
      </div>
    </div>
  );
};

export default Opplysninger;
