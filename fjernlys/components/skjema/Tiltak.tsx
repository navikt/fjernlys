import React from "react";
import { TextField } from "@navikt/ds-react";
import Dropdown from "./Dropdown";
import styles from "@/styles/skjema/risk.module.css";
import { XMarkIcon } from "@navikt/aksel-icons";

const Tiltak = () => {
  interface TiltakProps {
    key: number;
    value: string;
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
        <TextField label="TiltakID" value="TILTAK!!!!!!!!" readOnly />
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

export default Tiltak;
