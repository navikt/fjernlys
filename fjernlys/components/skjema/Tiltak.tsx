import React, { useContext, useEffect, useState } from "react";
import { Radio, RadioGroup, Select, Switch, TextField } from "@navikt/ds-react";
import stylesRisk from "@/styles/skjema/risk.module.css";
import { XMarkIcon } from "@navikt/aksel-icons";
import { DropdownValues } from "@/pages/skjema";
import stylesTiltak from "@/styles/skjema/tiltak.module.css";
import Dropdown from "./Dropdown";
import styles from "@/styles/skjema/tiltak.module.css";

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
  const [selectedCat, setSelectedCat] = useState(category || "personvern");
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
          <div style={{ marginTop: "16px" }}>
            <Select
              label={"Kategori"}
              size="small"
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
            >
              <option value="0" disabled>
                Velg kategori
              </option>
              <option value="eliminere">Eliminere</option>
              <option value="overfore">Overføre</option>
              <option value="redusere">Redusere</option>
              <option value="godta">Godta</option>
            </Select>
          </div>
          <div
            style={{
              marginTop: "16px",
            }}
          >
            <Select
              label={"Status"}
              size="small"
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              style={{ marginBottom: "16px" }}
            >
              <option value="0" disabled>
                Velg kategori
              </option>
              <option value="pabegynt">Påbegynt</option>
              <option value="ikke-pabegynt">Ikke påbegynt</option>
              <option value="viderefort">Videreført</option>
              <option value="lukket">Lukket</option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiltak;
