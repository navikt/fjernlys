import { Select, TextField } from "@navikt/ds-react";
import React from "react";
import styles from "@/styles/skjema/information.module.css";
import Risikoeier from "./RiskOwner";

interface Props {
  service: string;
  setService: any;
  isOwner: boolean;
  setIsOwner: any;
  setOwnerIdent: any;
}

const Opplysninger = ({
  service,
  setService,
  isOwner,
  setIsOwner,
  setOwnerIdent,
}: Props) => {
  return (
    <div className={styles.ownerMainDiv}>
      <h3>Opplysning fra rapporteringsskjema</h3>
      <div className={styles.hovedDiv}>
        <div className={styles.selectDiv}>
          <div className={styles.dropdownDiv}>
            <Select
              label={"Ytelse/tjeneste"}
              onChange={(e) => setService(e.target.value)}
              value={service}
            >
              <option value="Ikke valgt" disabled>
                Velg ytelse/tjeneste
              </option>
              <option value="Alderspensjon">Alderspensjon</option>
              <option value="Uføretrygd">Uføretrygd</option>
              <option value="AAP">AAP</option>
              <option value="Sykepenger">Sykepenger</option>
              <option value="Dagpenger">Dagpenger</option>
              <option value="Foreldrepenger">Foreldrepenger</option>
              <option value="Utbetaling">Utbetaling</option>
            </Select>
          </div>
        </div>
        <Risikoeier owner={isOwner} setOwner={setIsOwner} />
      </div>
      {!isOwner && (
        <div className={styles.ownerInput}>
          <TextField
            label="Skriv inn ident til risikoeier"
            onChange={(e) => setOwnerIdent(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Opplysninger;
