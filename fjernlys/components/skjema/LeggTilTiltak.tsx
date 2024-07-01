import React, { useContext, useState } from "react";
import { PlusCircleIcon } from "@navikt/aksel-icons";
import Tiltak from "./Tiltak";
import { DropdownValues } from "@/pages/skjema";

const LeggTilTiltak: React.FC = () => {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }
  const [tiltakList, setTiltakList] = useState<JSX.Element[]>([]);

  const addTiltak = () => {
    setTiltakList([...tiltakList, <Tiltak key={tiltakList.length} />]);
  };

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        {tiltakList.map((tiltak) => (
          <div style={{ marginTop: "5px" }}>{tiltak}</div>
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
