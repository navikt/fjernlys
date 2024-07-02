import React, { useContext, useEffect, useState } from "react";
import { Radio, RadioGroup, Select, Switch, TextField } from "@navikt/ds-react";
import stylesRisk from "@/styles/skjema/risk.module.css";
import { XMarkIcon } from "@navikt/aksel-icons";
import { DropdownValues } from "@/pages/skjema";
import stylesTiltak from "@/styles/skjema/tiltak.module.css";

interface TiltakProps {
  tiltakIDNum: number;
  riskID: string;
  deleteTiltak: (tiltakIDNum: number) => void;
  category: string;
  dependant: string;
  updateListe: any;
}

const Tiltak: React.FC<TiltakProps> = ({
  tiltakIDNum,
  riskID,
  deleteTiltak,
  category,
  dependant,
  updateListe,
}) => {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }

  const [selectedCat, setSelectedCat] = useState(category || "");
  const [selectedDepend, setSelectedDepend] = useState(dependant || "");
  const tiltakID = `T${tiltakIDNum + 1}`;

  const deleteSelf = () => {
    deleteTiltak(tiltakIDNum);
  };

  useEffect(() => {
    updateListe(tiltakIDNum, selectedCat, selectedDepend);
  }, [selectedCat, selectedDepend]);
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
            <Select
              label={"Kategori"}
              size="small"
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
            >
              <option value="0" disabled>
                Velg kategori
              </option>
              <option value="personvern">Personvern</option>
              <option value="kategori2">Kategori 2</option>
            </Select>
          </div>
          <div className={stylesTiltak.radio}>
            <RadioGroup
              legend="Er tiltaket påbegynt?"
              value={selectedDepend}
              onChange={(value) => setSelectedDepend(value)}
            >
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
