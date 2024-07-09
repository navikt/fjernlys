import stylesRisk from "@/styles/skjema/risk.module.css";
import stylesTiltak from "@/styles/skjema/tiltak.module.css";
import { TrashIcon, XMarkIcon } from "@navikt/aksel-icons";
import { Button, Select, TextField } from "@navikt/ds-react";
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
    { value: "Eliminere", label: "Eliminere" },
    { value: "Overføre", label: "Overføre" },
    { value: "Redusere", label: "Redusere" },
    { value: "Godta", label: "Godta" },
  ];
  const dropDownOptionsStatus = [
    { value: "Velg status", label: "Velg status" },
    { value: "Påbegynt", label: "Påbegynt" },
    { value: "Ikke påbegynt", label: "Ikke påbegynt" },
    { value: "Videreført", label: "Videreført" },
    { value: "Lukket", label: "Lukket" },
  ];

  return (
    <>
      <div style={{ border: "1px red black", display: "flex", gap: "16px" }}>
        <div style={{ width: "50%" }}>
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
            width: "50%",
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
    </>
  );
};

export default Tiltak;
