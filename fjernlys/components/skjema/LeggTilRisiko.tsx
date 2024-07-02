import React, { useState } from "react";
import { PlusCircleIcon } from "@navikt/aksel-icons";
import RisikoKomponent from "./RisikoKomponent";

const LeggTilRisiko = () => {
  const initialRiskID = "R1";
  const initialRiskElement = (
    <RisikoKomponent key={initialRiskID} riskID={initialRiskID} />
  );

  const [risikoList, setRisikoList] = useState<
    {
      riskID: string;
      element: JSX.Element;
    }[]
  >([{ riskID: initialRiskID, element: initialRiskElement }]);

  const handleAddRisiko = () => {
    const riskID = `R${risikoList.length + 1}`;

    setRisikoList([
      ...risikoList,
      { riskID, element: <RisikoKomponent key={riskID} riskID={riskID} /> },
    ]);

    console.log(risikoList);
  };

  return (
    <div>
      <div>
        {risikoList.map((risiko) => (
          <div key={risiko.riskID}>{risiko.element}</div>
        ))}
      </div>
      <div style={{ display: "flex" }} onClick={handleAddRisiko}>
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
