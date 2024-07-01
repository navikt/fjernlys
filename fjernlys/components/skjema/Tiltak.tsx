import React, { useContext } from "react";
import { TextField } from "@navikt/ds-react";
import Dropdown from "./Dropdown";
import styles from "@/styles/skjema/risk.module.css";
import { XMarkIcon } from "@navikt/aksel-icons";
import { DropdownValues } from "@/pages/skjema";

interface TiltakProps {
  id: string;
  riskId: string;
}

const Tiltak: React.FC<TiltakProps> = ({ id, riskId }) => {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }

  return (
    <div
      style={{
        marginLeft: "25px",
        position: "relative",
        marginBottom: "13px",
        backgroundColor: "#F7F8F8",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          cursor: "pointer",
        }}
      >
        <XMarkIcon />
      </div>
      <div className={styles.verdier}></div>
      <div>
        <TextField label="TiltakID" value={id} readOnly />
      </div>
      <div>
        <TextField label="RiskID" value={riskId} readOnly />
      </div>
      <div>
        <div className={styles.verdier}>
          <Dropdown title={"Sannsynlighet"} formKey={""} setVerdi={undefined} />
          <Dropdown title={"Konsekvens"} formKey={""} setVerdi={undefined} />
        </div>
      </div>
    </div>
  );
};

export default Tiltak;
