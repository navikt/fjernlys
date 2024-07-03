import React, { useContext, useEffect, useState } from "react";
import { Radio, RadioGroup, Select, Switch, TextField } from "@navikt/ds-react";
import stylesRisk from "@/styles/skjema/risk.module.css";
import { XMarkIcon } from "@navikt/aksel-icons";
import { DropdownValues } from "@/pages/skjema";
import stylesTiltak from "@/styles/skjema/tiltak.module.css";

interface TiltakProps {
  tiltakIDNum: number;
  riskIDNum: number;
  deleteTiltak: (tiltakIDNum: number) => void;
  category: string;
  started: boolean;
  updateListe: any;
}

const Tiltak: React.FC<TiltakProps> = ({
  tiltakIDNum,
  riskIDNum,
  deleteTiltak,
  category,
  started,
  updateListe,
}) => {
  const [selectedCat, setSelectedCat] = useState(category || "");
  const [selectedStarted, setSelectedStarted] = useState<boolean>(
    started || false
  );
  const tiltakID = `T${tiltakIDNum + 1}`;

  const radioBoolCheck = (value: string): boolean => {
    return value === "ja";
  };

  const deleteSelf = () => {
    deleteTiltak(tiltakIDNum);
  };

  useEffect(() => {
    updateListe(tiltakIDNum, selectedCat, selectedStarted);
  }, [selectedCat, selectedStarted]);
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
          <TextField label="RiskID" value={`R${riskIDNum}`} readOnly />
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
              value={selectedStarted ? "ja" : "nei"}
              onChange={(value) => setSelectedStarted(radioBoolCheck(value))}
            >
              <div className={stylesTiltak.tiltakRadio}>
                <Radio value="ja">Ja</Radio>
                <Radio value="nei">Nei</Radio>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiltak;
