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
  const [selectedCat, setSelectedCat] = useState(category || "Velg kategori");
  const [selectedStatus, setSelectedStatus] = useState(status || "Velg status");
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
    { value: "Velg kategori", label: "Velg kategori" },
    { value: "eliminere", label: "Eliminere" },
    { value: "overfore", label: "Overføre" },
    { value: "redusere", label: "Redusere" },
    { value: "godta", label: "Godta" },
  ];

  const dropDownOptionsStatus = [
    { value: "Velg status", label: "Velg status" },
    { value: "pabegynt", label: "Påbegynt" },
    { value: "ikke-pabegynt", label: "Ikke påbegynt" },
    { value: "viderefort", label: "Videreført" },
    { value: "lukket", label: "Lukket" },
  ];

  return (
    <div style={{ display: "flex" }}>
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
  );
};

export default Tiltak;
