import { Select, TextField } from "@navikt/ds-react";
import React from "react";
import DatoVelger from "./DatoVelger";
import styles from "@/styles/skjema/opplysninger.module.css";
import Risikoeier from "./Risikoeier";

interface Props {
  service: string;
  setService: any;
  owner: boolean;
  setOwner: any;
  setNotOwner: any;
}

const Opplysninger = ({
  service,
  setService,
  owner,
  setOwner,
  setNotOwner,
}: Props) => {
  return (
    <div style={{ width: "100%" }}>
      <h3>Opplysning fra rapporteringsskjema</h3>
      <div className={styles.hovedDiv}>
        <div className={styles.selectDiv}>
          <div style={{ width: "80%" }}>
            <Select
              label={"Ytelse"}
              onChange={(e) => setService(e.target.value)}
              value={service}
            >
              <option value="Ikke valgt" disabled>
                Velg ytelse/tjeneste
              </option>
              <option value="Alderpensjon">Alderpensjon</option>
              <option value="Uføretrygd">Uføretrygd</option>
              <option value="AAP">AAP</option>
              <option value="Sykepenger">Sykepenger</option>
              <option value="Dagpenger">Dagpenger</option>
              <option value="Foreldrepenger">Foreldrepenger</option>
              <option value="Utbetaling">Utbetaling</option>
            </Select>
          </div>
        </div>
        <Risikoeier owner={owner} setOwner={setOwner} />
      </div>
      {!owner && (
        <div style={{ width: "40%", marginTop: "16px" }}>
          <TextField
            label="Skriv inn e-post til risikoeier"
            onChange={(e) => setNotOwner(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Opplysninger;
