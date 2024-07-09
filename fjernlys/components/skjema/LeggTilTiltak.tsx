import React, { useContext, useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@navikt/aksel-icons";
import Tiltak from "./Tiltak";

import styles from "@/styles/skjema/tiltak.module.css";
import Dropdown from "./Dropdown";
import { Button, Table } from "@navikt/ds-react";

interface Props {
  riskIDNum: number;
  tiltakValues: tiltakValuesType[];
  setTiltakValues: any;
  setNewProbValue: any;
  setNewConsValue: any;
  newProbValue: string;
  newConsValue: string;
}

type tiltakValuesType = {
  status: string;
  category: string;
  started: boolean;
};

const LeggTilTiltak = ({
  riskIDNum,
  tiltakValues,
  setTiltakValues,
  setNewConsValue,
  setNewProbValue,
  newConsValue,
  newProbValue,
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [tiltakList, setTiltakList] = useState<
    { tiltakID: number; element: JSX.Element }[]
  >([]);

  const deleteTiltak = (tiltakIDNum: number) => {
    setTiltakValues((prevList: tiltakValuesType[]) =>
      prevList.filter((_, index) => index !== tiltakIDNum)
    );
    setTiltakList([]);
  };

  useEffect(() => {
    setShowDropdown(tiltakList.length > 0);
  }, [tiltakList]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const handleRowClick = (rowId: number) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };
  useEffect(() => {
    setTiltakList(
      tiltakValues.map((item, index) => ({
        tiltakID: index,
        element: (
          <Tiltak
            key={index}
            tiltakIDNum={index}
            riskIDNum={riskIDNum + 1}
            deleteTiltak={deleteTiltak}
            category={item.category}
            status={item.status}
            started={item.started}
            updateListe={updateListe}
          />
        ),
      }))
    );
    console.log("tiltakValues", tiltakValues);
  }, [tiltakValues]);

  const generateNewTiltak = () => {
    setTiltakValues((prevList: tiltakValuesType[]) => [
      ...prevList,
      { category: "Velg kategori", status: "Velg status", started: false },
    ]);
  };

  const updateListe = (
    id: number,
    category: string,
    status: string,
    started: boolean
  ) => {
    setTiltakValues((prevList: tiltakValuesType[]) => {
      const newList = [...prevList];
      newList[id] = { category, status, started };
      console.log("newCons", newConsValue);
      console.log("newCons", newConsValue);
      return newList;
    });
  };

  const dropdownOptions = [
    { value: "0", label: "Velg verdi" },
    { value: "1", label: "1" },
    { value: "1.5", label: "1.5" },
    { value: "2", label: "2" },
    { value: "2.5", label: "2.5" },
    { value: "3", label: "3" },
    { value: "3.5", label: "3.5" },
    { value: "4", label: "4" },
    { value: "4.5", label: "4.5" },
    { value: "5", label: "5" },
  ];

  return (
    <>
      {showDropdown && (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell scope="col">Tiltak</Table.HeaderCell>
              <Table.HeaderCell scope="col">Kategori</Table.HeaderCell>
              <Table.HeaderCell scope="col">Status</Table.HeaderCell>
              <Table.HeaderCell scope="col">Slett tiltak</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tiltakList.map(({ tiltakID, element }) => (
              <Table.ExpandableRow
                key={tiltakID}
                content={element}
                open={expandedRow === tiltakID}
                onOpenChange={() => handleRowClick(tiltakID)}
              >
                <Table.DataCell scope="row">{`T${
                  tiltakID + 1
                }`}</Table.DataCell>
                <Table.DataCell scope="row">
                  {tiltakValues[tiltakID].category}
                </Table.DataCell>
                <Table.DataCell scope="row">
                  {tiltakValues[tiltakID].status}
                </Table.DataCell>
                <Table.DataCell scope="row">
                  <Button
                    variant="danger"
                    className={styles.trashcan}
                    onClick={() => deleteTiltak(tiltakID)}
                    icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
                    size="small"
                    style={{ height: "40px" }}
                  >
                    Slett tiltak
                  </Button>
                </Table.DataCell>
              </Table.ExpandableRow>
            ))}
          </Table.Body>
        </Table>
      )}
      <div onClick={generateNewTiltak}>
        {" "}
        <div className={styles.actionDiv}>
          <Button icon={<PencilIcon aria-hidden />}>Legg til tiltak</Button>{" "}
        </div>
      </div>
      {showDropdown && <hr />}

      {showDropdown && (
        <div className={styles.verdier}>
          <Dropdown
            title={"Ny sannsynlighet"}
            formKey={"prob"}
            setVerdi={setNewProbValue}
            verdi={newProbValue}
            options={dropdownOptions}
          />
          <Dropdown
            title={"Ny konsekvens"}
            formKey={"cons"}
            setVerdi={setNewConsValue}
            verdi={newConsValue}
            options={dropdownOptions}
          />
        </div>
      )}
    </>
  );
};

export default LeggTilTiltak;
