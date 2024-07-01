import React, { useContext, useState } from "react";
import { TextField } from "@navikt/ds-react";
import Dropdown from "./Dropdown";
import stylesRisk from "@/styles/skjema/risk.module.css";
import { XMarkIcon } from "@navikt/aksel-icons";
import { DropdownValues } from "@/pages/skjema";
import stylesTiltak from "@/styles/skjema/tiltak.module.css";

interface TiltakProps {
  tiltakID: string;
  riskID: string;
  deleteTiltak: (tiltakID: string) => void;
}

const Tiltak: React.FC<TiltakProps> = ({ tiltakID, riskID, deleteTiltak }) => {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }
  const [probValue, setProbValue] = useState("0");
  const [consValue, setConsValue] = useState("0");

  const kys = () => {
    deleteTiltak(tiltakID);
  };
  return (
    <div className={stylesTiltak.tiltakMainDiv}>
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          cursor: "pointer",
        }}
        onClick={kys}
      >
        <XMarkIcon />
      </div>
      <div className={stylesRisk.verdier}></div>
      <div>
        <TextField label="TiltakID" value={tiltakID} readOnly />
      </div>
      <div>
        <TextField label="RiskID" value={riskID} readOnly />
      </div>
      <div>
        <div className={stylesRisk.verdier}>
          <Dropdown
            title={"Sannsynlighet"}
            formKey={""}
            setVerdi={setProbValue}
          />
          <Dropdown title={"Konsekvens"} formKey={""} setVerdi={setConsValue} />
        </div>
      </div>
    </div>
  );
};

export default Tiltak;
