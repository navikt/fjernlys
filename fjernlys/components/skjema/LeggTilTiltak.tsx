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
}

type tiltakValuesType = { category: string; started: boolean };

const LeggTilTiltak = ({ riskIDNum, tiltakValues, setTiltakValues }: Props) => {
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
            started={item.started}
            updateListe={updateListe}
          />
        ),
      }))
    );
  }, [tiltakValues]);

  const generateNewTiltak = () => {
    setTiltakValues((prevList: tiltakValuesType[]) => [
      ...prevList,
      { category: "personvern", started: false },
    ]);
  };

  const updateListe = (id: number, category: string, started: boolean) => {
    setTiltakValues((prevList: tiltakValuesType[]) => {
      const newList = [...prevList];
      newList[id] = { category, started };
      return newList;
    });
  };

  return (
    <div className={styles.parentDiv}>
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
        {showDropdown && (
          <Dropdown title={""} formKey={""} setVerdi={undefined} />
        )}
      </div>
    </div>
  );
};

export default LeggTilTiltak;

const data = [
  {
    prob: 2,
    cons: 3,
    dependant: true,
    tiltak: [{ category: "personvern", started: false }],
  },
  {
    prob: 2,
    cons: 3,
    dependant: true,
    tiltak: [{ category: "personvern", started: false }],
  },
  {
    prob: 2,
    cons: 3,
    dependant: true,
    tiltak: [
      [
        { category: "personvern", started: false },
        { category: "personvern", started: false },
        { category: "personvern", started: false },
      ],
    ],
  },
];
