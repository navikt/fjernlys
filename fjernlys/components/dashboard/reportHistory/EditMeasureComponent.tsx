import React, { useEffect, useState } from "react";

import styles from "@/styles/skjema/measure.module.css";
import Dropdown from "@/components/skjema/information/Dropdown";

interface MeasureProps {
  measureIDNum: number;
  riskIDNum: number;
  id: string | null;
  riskAssessmentId: string | null;
  deleteMeasure: (measureIDNum: number) => void;
  category: string;
  status: string;
  updateListe: any;
}

const EditMeasureComponent: React.FC<MeasureProps> = ({
  measureIDNum,
  riskIDNum,
  id,
  riskAssessmentId,
  deleteMeasure,
  category,
  status,
  updateListe,
}) => {
  const [selectedCat, setSelectedCat] = useState(category || "Velg kategori");
  const [selectedStatus, setSelectedStatus] = useState(status || "Velg status");
  // const [selectedStarted, setSelectedStarted] = useState<boolean>(
  //   started || false
  // );

  useEffect(() => {
    updateListe(
      measureIDNum,
      id,
      riskAssessmentId,
      selectedCat,
      selectedStatus
    );
  }, [selectedCat, selectedStatus]);

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
      <div className={styles.dropdownContent}>
        <div className={styles.dropdownComp}>
          <Dropdown
            title={"Kategori"}
            value={selectedCat}
            setValue={setSelectedCat}
            options={dropDownOptionsCat}
          />
        </div>
        <div className={styles.dropdownComp}>
          <Dropdown
            title={"Status"}
            value={selectedStatus}
            setValue={setSelectedStatus}
            options={dropDownOptionsStatus}
          />
        </div>
      </div>
    </>
  );
};

export default EditMeasureComponent;
