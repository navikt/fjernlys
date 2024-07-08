import React, { useContext, useEffect, useState } from "react";
import { PlusCircleIcon } from "@navikt/aksel-icons";
import Tiltak from "./Tiltak";
import { DropdownValues } from "@/pages/skjema";
import styles from "@/styles/skjema/tiltak.module.css";
import Dropdown from "./Dropdown";

interface Props {
  riskIDNum: number;
  tiltakValues: tiltakValuesType[];
  setTiltakValues: any;
  setNewProbValue: any;
  setNewConsValue: any;
  newProbValue: string;
  newConsValue: string;
}

type tiltakValuesType = {
  status: string;
  category: string;
  started: boolean;
};

const LeggTilTiltak = ({
  riskIDNum,
  tiltakValues,
  setTiltakValues,
  setNewConsValue,
  setNewProbValue,
  newConsValue,
  newProbValue,
}: Props) => {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }

  const [showDropdown, setShowDropdown] = useState(false);
  const [tiltakList, setTiltakList] = useState<
    { id: string; element: JSX.Element }[]
  >([]);

  const deleteTiltak = (tiltakIDNum: number) => {
    setTiltakValues((prevList: tiltakValuesType[]) =>
      prevList.filter((_, index) => index !== tiltakIDNum)
    );
    setTiltakList((prevList) =>
      prevList.filter((_, index) => index !== tiltakIDNum)
    );
  };

  useEffect(() => {
    setShowDropdown(tiltakList.length > 0);
  }, [tiltakList]);

  useEffect(() => {
    setTiltakList(
      tiltakValues.map((item, index) => ({
        id: `${index}`,
        element: (
          <Tiltak
            key={index}
            tiltakIDNum={index}
            riskIDNum={riskIDNum + 1}
            deleteTiltak={deleteTiltak}
            category={item.category}
            status={item.status}
            started={item.started}
            updateListe={updateListe}
          />
        ),
      }))
    );
    console.log("tiltakValues", tiltakValues);
  }, [tiltakValues]);

  const generateNewTiltak = () => {
    setTiltakValues((prevList: tiltakValuesType[]) => [
      ...prevList,
      { category: "personvern", status: "påbegynt", started: false },
    ]);
  };

  const updateListe = (
    id: number,
    category: string,
    status: string,
    started: boolean
  ) => {
    setTiltakValues((prevList: tiltakValuesType[]) => {
      const newList = [...prevList];
      newList[id] = { category, status, started };
      console.log("newCons", newConsValue);
      console.log("newCons", newConsValue);
      return newList;
    });
  };

  const dropdownOptions = [
    { value: "0", label: "Velg verdi" },
    { value: "1", label: "1" },
    { value: "1.5", label: "1.5" },
    { value: "2", label: "2" },
    { value: "2.5", label: "2.5" },
    { value: "3", label: "3" },
    { value: "3.5", label: "3.5" },
    { value: "4", label: "4" },
    { value: "4.5", label: "4.5" },
    { value: "5", label: "5" },
  ];

  return (
    <div className={styles.parentDiv}>
      <hr />
      <div>
        {tiltakList.map(({ id, element }) => (
          <div key={id} style={{ marginTop: "5px" }}>
            {element}
          </div>
        ))}
      </div>
      <div onClick={generateNewTiltak}>
        {" "}
        <div className={styles.actionDiv}>
          <PlusCircleIcon className="leggTil" fontSize={"1.5rem"} />
          <div className={styles.actionText}>Legg til Tiltak</div>
        </div>
      </div>
      {showDropdown && <hr />}

      {showDropdown && (
        <div className={styles.verdier}>
          <Dropdown
            title={"Ny sannsynlighet"}
            formKey={"prob"}
            setVerdi={setNewProbValue}
            verdi={newProbValue}
            options={dropdownOptions}
          />
          <Dropdown
            title={"Ny konsekvens"}
            formKey={"cons"}
            setVerdi={setNewConsValue}
            verdi={newConsValue}
            options={dropdownOptions}
          />
        </div>
      )}
    </div>
  );
};

export default LeggTilTiltak;
