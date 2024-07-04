import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@navikt/aksel-icons";
import RisikoKomponent from "./RisikoKomponent";

type tiltakValues = { category: string; started: boolean };
type risikoValuesType = {
  probability: number;
  consequence: number;
  dependent: boolean;
  tiltakValues?: tiltakValues[];
};

const LeggTilRisiko = () => {
  const [risikoValues, setRisikoValues] = useState<risikoValuesType[]>([]);
  const initialRiskIDNum = 0;

  const deleteRisiko = (riskIDNum: number) => {
    setRisikoValues((prevList) =>
      prevList.filter((_, index) => index !== riskIDNum)
    );

    setRisikoList((prevList) =>
      prevList.filter((_, index) => index !== riskIDNum)
    );
  };

  const updateListe = (
    id: number,
    probability: number,
    consequence: number,
    dependent: boolean,
    tiltakValues?: tiltakValues[]
  ) => {
    setRisikoValues((prevList) => {
      const newList = [...prevList];
      console.log("newList", newList);
      newList[id] = {
        probability,
        consequence,
        dependent,
        tiltakValues: tiltakValues,
      };
      return newList;
    });
  };

  useEffect(() => {
    console.log(risikoValues);
  }, [risikoValues]);

  const [risikoList, setRisikoList] = useState<
    {
      riskIDNum: number;
      element: JSX.Element;
    }[]
  >([]);

  useEffect(() => {
    setRisikoList(
      risikoValues.map((item, index) => ({
        riskIDNum: index,
        element: (
          <RisikoKomponent
            key={index}
            riskIDNum={index}
            probability={item.probability}
            consequence={item.consequence}
            dependent={item.dependent}
            tiltakValuesType={item.tiltakValues}
            deleteRisiko={deleteRisiko}
            updateRisiko={updateListe}
          />
        ),
      }))
    );
    console.log("hahaha", risikoList);
  }, [risikoValues]);

  const generateNewRisiko = () => {
    setRisikoValues((prevList) => [
      ...prevList,
      { probability: 0, consequence: 0, dependent: false },
    ]);
  };

  return (
    <div>
      <div>
        {risikoList.map(({ riskIDNum, element }) => (
          <div key={riskIDNum}>{element}</div>
        ))}
      </div>
      <div style={{ display: "flex" }} onClick={generateNewRisiko}>
        <div>
          <PlusCircleIcon
            className="leggTil"
            fontSize={"1.8rem"}
            style={{ cursor: "pointer" }}
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
