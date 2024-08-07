import { Select, TextField } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/skjema/information.module.css";
import Risikoeier from "./RiskOwner";

interface Props {
  service: string;
  setService: any;
  isOwner: boolean;
  setIsOwner: any;
  ownerIdent: string;
  setOwnerIdent: any;
}

const Information = ({
  service,
  setService,
  isOwner,
  setIsOwner,
  ownerIdent,
  setOwnerIdent,
}: Props) => {
  const [newIsOwner, setNewIsOwner] = useState<boolean>(isOwner || false);
  const [newOwnerIdent, setNewOwnerIdent] = useState<string>(
    ownerIdent || "A111111"
  );

  useEffect(() => {
    setIsOwner(newIsOwner);
    setOwnerIdent(newOwnerIdent);
  }, [
    newIsOwner,
    setNewIsOwner,
    newOwnerIdent,
    setNewOwnerIdent,
    setIsOwner,
    setOwnerIdent,
  ]);

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
              <option value="AAP">AAP</option>
              <option value="Alderspensjon">Alderspensjon</option>
              <option value="Dagpenger">Dagpenger</option>
              <option value="Foreldrepenger">Foreldrepenger</option>
              <option value="Sykepenger">Sykepenger</option>
              <option value="Uføretrygd">Uføretrygd</option>
              <option value="Utbetaling">Utbetaling</option>
            </Select>
          </div>
        </div>
        <Risikoeier isOwner={newIsOwner} setIsOwner={setNewIsOwner} />
      </div>
      {!isOwner && (
        <div className={styles.ownerInput}>
          <TextField
            label="Skriv inn ident til risikoeier"
            value={newOwnerIdent}
            onChange={(e) => setNewOwnerIdent(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Information;
