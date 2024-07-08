import React, { useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon } from "@navikt/aksel-icons";
import RisikoKomponent from "./RisikoKomponent";
import { Button, HStack, Table } from "@navikt/ds-react";

type tiltakValuesType = { category: string; status: string; started: boolean };
type risikoValuesType = {
  probability: number;
  consequence: number;
  dependent: boolean;
  riskLevel: string;
  category: string;
  tiltakValues?: tiltakValuesType[];
  newConsequence?: string;
  newProbability?: string;
};

const LeggTilRisiko = () => {
  const [risikoValues, setRisikoValues] = useState<risikoValuesType[]>([
    {
      probability: 0,
      consequence: 0,
      dependent: false,
      riskLevel: "Ingen vurdering",
      category: "Ikke satt",
    },
  ]);
  const initialRiskIDNum = 0;

  const deleteRisiko = (riskIDNum: number) => {
    setRisikoValues((prevList: risikoValuesType[]) =>
      prevList.filter((_, index) => index !== riskIDNum)
    );
    setRisikoList([]);
  };

  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const handleRowClick = (rowId: number) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };
  const updateListe = (
    id: number,
    probability: number,
    consequence: number,
    dependent: boolean,
    riskLevel: string,
    category: string,
    tiltakValues?: tiltakValuesType[],
    newConsequence?: string,
    newProbability?: string
  ) => {
    setRisikoValues((prevList) => {
      const newList = [...prevList];
      console.log("newList", newList);
      newList[id] = {
        probability,
        consequence,
        dependent,
        riskLevel,
        category,
        tiltakValues,
        newConsequence,
        newProbability,
      };
      return newList;
    });
  };

  useEffect(() => {
    console.log(JSON.stringify(risikoValues));
  }, [risikoValues]);

  const [risikoList, setRisikoList] = useState<
    {
      riskIDNum: number;
      element: JSX.Element;
    }[]
  >([]);

  useEffect(() => {
    if (risikoValues.length === 0) {
      generateNewRisiko();
    }
    setRisikoList(
      risikoValues.map((item, index) => ({
        riskIDNum: index,
        element: (
          <RisikoKomponent
            key={index}
            riskIDNum={index}
            probability={item.probability}
            consequence={item.consequence}
            existingDependent={item.dependent}
            existingRiskLevel={item.riskLevel}
            existingCategory={item.category}
            existingTiltakValues={item.tiltakValues}
            deleteRisiko={deleteRisiko}
            updateRisiko={updateListe}
            newConsequence={item.newConsequence}
            newProbability={item.newProbability}
          />
        ),
      }))
    );
  }, [risikoValues]);

  const generateNewRisiko = () => {
    setRisikoValues((prevList) => [
      ...prevList,
      {
        probability: 0,
        consequence: 0,
        dependent: false,
        riskLevel: "Ingen vurdering",
        category: "Ikke satt",
      },
    ]);
  };

  return (
    <>
      {/* {risikoList.map(({ riskIDNum, element }) => (
          <div key={riskIDNum}>{element}</div>
        ))} */}

      <Table>
        {" "}
        <Table.Header>
          {" "}
          <Table.Row>
            {" "}
            <Table.HeaderCell />{" "}
            <Table.HeaderCell scope="col">Risiko</Table.HeaderCell>{" "}
            <Table.HeaderCell scope="col">Trusselnivå</Table.HeaderCell>{" "}
            <Table.HeaderCell scope="col">Kategori</Table.HeaderCell>{" "}
            <Table.HeaderCell scope="col">Avhengighet</Table.HeaderCell>{" "}
            <Table.HeaderCell scope="col">Antall tiltak</Table.HeaderCell>{" "}
          </Table.Row>{" "}
        </Table.Header>{" "}
        <Table.Body>
          {risikoList.map(({ riskIDNum, element }) => (
            <Table.ExpandableRow
              key={riskIDNum}
              content={element}
              open={expandedRow === riskIDNum}
              onOpenChange={() => handleRowClick(riskIDNum)}
            >
              <Table.DataCell scope="row">{`R${riskIDNum + 1}`}</Table.DataCell>
              <Table.DataCell scope="row">
                {risikoValues[riskIDNum].riskLevel}
              </Table.DataCell>
              <Table.DataCell scope="row">
                {risikoValues[riskIDNum].category}
              </Table.DataCell>{" "}
              <Table.DataCell scope="row">
                {risikoValues[riskIDNum].dependent === true ? "Ja" : "Nei"}
              </Table.DataCell>
              <Table.DataCell scope="row">
                {risikoValues[riskIDNum].tiltakValues?.length
                  ? risikoValues[riskIDNum].tiltakValues?.length
                  : 0}
              </Table.DataCell>
            </Table.ExpandableRow>
          ))}
        </Table.Body>{" "}
      </Table>

      <div
        onClick={generateNewRisiko}
        style={{
          fontWeight: "bold",
          fontSize: "1.3rem",
          marginTop: "16px",
          marginBottom: "32px",
        }}
      >
        <Button icon={<PencilIcon aria-hidden />}>Legg til risiko</Button>{" "}
      </div>
    </>
  );
};

export default LeggTilRisiko;
