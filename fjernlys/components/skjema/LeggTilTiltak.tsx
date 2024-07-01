import React, { useContext, useState } from "react";
import { PlusCircleIcon } from "@navikt/aksel-icons";
import Tiltak from "./Tiltak";
import { DropdownValues } from "@/pages/skjema";
import styles from "@/styles/skjema/tiltak.module.css";

interface Props {
  riskID: string;
}

const LeggTilTiltak = ({ riskID }: Props) => {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }
  const [tiltakList, setTiltakList] = useState<
    { id: string; element: JSX.Element }[]
  >([]);

  const addTiltak = () => {
    const newId = `T${tiltakList.length + 1}`;
    const riskId = riskID;

    const deleteTiltak = (tiltakID: string) => {
      setTiltakList((prevList) =>
        prevList.filter((item) => item.id !== tiltakID)
      );
    };
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
      },
    ]);
    {
      console.log(tiltakList);
    }
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
      <div className={styles.actionDiv} onClick={addTiltak}>
        <PlusCircleIcon className="leggTil" fontSize={"1.5rem"} />
        <div className={styles.actionText}>Legg til Tiltak</div>
      </div>
    </div>
  );
};

export default LeggTilTiltak;
