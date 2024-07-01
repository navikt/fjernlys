import React, { useContext, useState } from "react";
import { PlusCircleIcon } from "@navikt/aksel-icons";
import Tiltak from "./Tiltak";
import { DropdownValues } from "@/pages/skjema";

const LeggTilTiltak: React.FC = () => {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }
  const [tiltakList, setTiltakList] = useState<
    { id: string; element: JSX.Element }[]
  >([]);

  const addTiltak = () => {
    const newId = `t${tiltakList.length + 1}`;
    const riskId = "R1";
    setTiltakList([
      ...tiltakList,
      { id: newId, element: <Tiltak key={newId} id={newId} riskId={riskId} /> },
    ]);
    {
      console.log(tiltakList);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        {tiltakList.map(({ id, element }) => (
          <div key={id} style={{ marginTop: "5px" }}>
            {element}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "5px", display: "flex", alignItems: "center" }}>
        <PlusCircleIcon
          className="leggTil"
          fontSize={"1.5rem"}
          onClick={addTiltak}
          style={{ cursor: "pointer" }} // added inline style for cursor
        />

        <div style={{ marginLeft: "10px" }}>Legg til Tiltak</div>
      </div>
    </div>
  );
};

export default LeggTilTiltak;
