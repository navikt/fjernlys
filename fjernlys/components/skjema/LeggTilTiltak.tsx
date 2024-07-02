import React, { useContext, useEffect, useState } from "react";
import { PlusCircleIcon } from "@navikt/aksel-icons";
import Tiltak from "./Tiltak";
import { DropdownValues } from "@/pages/skjema";
import styles from "@/styles/skjema/tiltak.module.css";
import Dropdown from "./Dropdown";

interface Props {
  riskID: string;
}

const LeggTilTiltak = ({ riskID }: Props) => {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }
  const [showDropdown, setShowDropdown] = useState(false);

  const [tiltakList, setTiltakList] = useState<
    { id: string; riskID: string; element: JSX.Element }[]
  >([]);

  const deleteTiltak = (tiltakID: string) => {
    setTiltakList((prevList) =>
      prevList.filter((item) => item.id !== tiltakID)
    );
  };

  const addTiltak = () => {
    const newId = `T${tiltakList.length + 1}`;
    const riskId = riskID;

    setTiltakList([
      ...tiltakList,
      {
        id: newId,
        element: (
          <Tiltak
            key={newId}
            tiltakID={newId}
            riskID={riskId}
            deleteTiltak={deleteTiltak}
          />
        ),
        riskID: "",
      },
    ]);
    {
      console.log(tiltakList);
    }
  };

  useEffect(() => {
    if (tiltakList.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [tiltakList]);

  return (
    <div className={styles.parentDiv}>
      <div>
        {tiltakList.map(({ id, element }) => (
          <div key={id} style={{ marginTop: "5px" }}>
            {element}
          </div>
        ))}
      </div>
      <div className={styles.actionDiv} onClick={addTiltak}>
        <PlusCircleIcon className="leggTil" fontSize={"1.5rem"} />
        <div className={styles.actionText}>Legg til Tiltak</div>
        {showDropdown && (
          <Dropdown title={""} formKey={""} setVerdi={undefined} />
        )}
      </div>
    </div>
  );
};

export default LeggTilTiltak;
