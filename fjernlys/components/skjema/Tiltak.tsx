import stylesRisk from "@/styles/skjema/risk.module.css";
import stylesTiltak from "@/styles/skjema/tiltak.module.css";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Select, TextField } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

interface TiltakProps {
  tiltakIDNum: number;
  riskIDNum: number;
  deleteTiltak: (tiltakIDNum: number) => void;
  category: string;
  status: string;
  started: boolean;
  updateListe: any;
}

const Tiltak: React.FC<TiltakProps> = ({
  tiltakIDNum,
  riskIDNum,
  deleteTiltak,
  category,
  started,
  status,
  updateListe,
}) => {
  const [selectedCat, setSelectedCat] = useState(category || "personvern");
  const [selectedStatus, setSelectedStatus] = useState(
    status || "ikke-pabegynt"
  );
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
    updateListe(tiltakIDNum, selectedCat, selectedStatus, selectedStarted);
  }, [selectedCat, selectedStarted, selectedStatus]);

  const dropDownOptionsCat = [
    { value: "0", label: "Velg kategori" },
    { value: "eliminere", label: "Eliminere" },
    { value: "overfore", label: "Overføre" },
    { value: "redusere", label: "Redusere" },
    { value: "godta", label: "Godta" },
  ];

  const dropDownOptionsStatus = [
    { value: "0", label: "Velg status" },
    { value: "pabegynt", label: "Påbegynt" },
    { value: "ikke-pabegynt", label: "Ikke påbegynt" },
    { value: "viderefort", label: "Videreført" },
    { value: "lukket", label: "Lukket" },
  ];

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
            <Dropdown
              title={"Kategori"}
              formKey="category"
              verdi={selectedCat}
              setVerdi={setSelectedCat}
              options={dropDownOptionsCat}
            />
          </div>
          <div
            style={{
              marginTop: "16px",
            }}
          >
            <Dropdown
              title={"Status"}
              formKey="status"
              verdi={selectedStatus}
              setVerdi={setSelectedStatus}
              options={dropDownOptionsStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiltak;
