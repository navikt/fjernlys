import React, { useContext, useEffect, useState } from "react";
import { PlusCircleIcon } from "@navikt/aksel-icons";
import Tiltak from "./Tiltak";
import { DropdownValues } from "@/pages/skjema";
import styles from "@/styles/skjema/tiltak.module.css";
import Dropdown from "./Dropdown";

interface Props {
  riskID: string;
}

type tiltakValues = [string, string];

const LeggTilTiltak = ({ riskID }: Props) => {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }

  const [showDropdown, setShowDropdown] = useState(false);
  const [tiltakList, setTiltakList] = useState<
    { id: string; riskID: string; element: JSX.Element }[]
  >([]);
  const [tiltakValues, setTiltakValues] = useState<tiltakValues[]>([]);

  const deleteTiltak = (tiltakIDNum: number) => {
    setTiltakValues((prevList) =>
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
            riskID={riskID}
            deleteTiltak={deleteTiltak}
            category={item[0]}
            dependant={item[1]}
            updateListe={updateListe}
          />
        ),
      }))
    );
  }, [tiltakValues]);

  const generateNewTiltak = () => {
    setTiltakValues((prevList) => [...prevList, ["personvern", "2"]]);
  };

  const updateListe = (id: number, category: string, dependant: string) => {
    setTiltakValues((prevList) => {
      const newList = [...prevList];
      newList[id] = [category, dependant];
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
