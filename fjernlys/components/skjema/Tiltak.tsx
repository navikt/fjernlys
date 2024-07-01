import React, { useContext, useState } from "react";
import { Radio, RadioGroup, Select, Switch, TextField } from "@navikt/ds-react";
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

  const deleteSelf = () => {
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
        onClick={deleteSelf}
      >
        <XMarkIcon />
      </div>
      <div className={stylesRisk.verdier}></div>
      <div style={{ margin: "16px" }}>
        <div>
          <TextField label="TiltakID" value={tiltakID} readOnly />
        </div>
        <div>
          <TextField label="RiskID" value={riskID} readOnly />
        </div>
        <div>
          <div>
            <Select label={"Kategori"} size="small">
              <option value="0" disabled>
                Velg kategori
              </option>
              <option value="personvern">Personvern</option>
              <option value="Kategori2">Kategori 2</option>
            </Select>
          </div>
          <div className={stylesTiltak.radio}>
            <RadioGroup legend="Er tiltaket påbegynt?">
              <div className={stylesTiltak.tiltakRadio}>
                <Radio value="1">Ja</Radio> <Radio value="2">Nei</Radio>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiltak;
