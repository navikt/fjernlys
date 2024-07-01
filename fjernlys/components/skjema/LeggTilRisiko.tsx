import React from "react";
import { PlusCircleIcon } from "@navikt/aksel-icons";

const LeggTilRisiko = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <PlusCircleIcon
            className="leggTil"
            fontSize={"1.8rem"}
            onClick={() => console.log("Legg til risiko")}
            style={{ cursor: "pointer" }} // added inline style for cursor
          />
        </div>
        <div
          style={{ marginLeft: "10px", fontWeight: "bold", fontSize: "1.3rem" }}
        >
          Legg til ny Risiko
        </div>
      </div>
    </div>
  );
};

export default LeggTilRisiko;
