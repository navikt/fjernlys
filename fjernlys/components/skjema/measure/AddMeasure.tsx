import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import styles from "@/styles/skjema/measure.module.css";
import Dropdown from "../information/Dropdown";
import { Button, Table } from "@navikt/ds-react";
import Measure from "./Measure";

interface Props {
  riskIDNum: number;
  measureValues: measureValuesType[];
  setMeasureValues: any;
  setNewProbValue: any;
  setNewConsValue: any;
  newProbValue: string;
  newConsValue: string;
}

type measureValuesType = {
  status: string;
  category: string;
};

const AddMeasure = ({
  riskIDNum,
  measureValues,
  setMeasureValues,
  setNewConsValue,
  setNewProbValue,
  newConsValue,
  newProbValue,
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [measureList, setMeasureList] = useState<
    { measureID: number; element: JSX.Element }[]
  >([]);

  const deleteMeasure = (measureIDNum: number) => {
    setMeasureValues((prevList: measureValuesType[]) =>
      prevList.filter((_, index) => index !== measureIDNum)
    );
    setMeasureList([]);
  };

  useEffect(() => {
    setShowDropdown(measureList.length > 0);
  }, [measureList]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const handleRowClick = (rowId: number) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };
  useEffect(() => {
    setMeasureList(
      measureValues.map((item, index) => ({
        measureID: index,
        element: (
          <Measure
            key={index}
            measureIDNum={index}
            riskIDNum={riskIDNum + 1}
            deleteMeasure={deleteMeasure}
            category={item.category}
            status={item.status}
            updateListe={updateListe}
          />
        ),
      }))
    );
    // console.log("measureValues", measureValues);
  }, [measureValues]);

  const generateNewMeasure = () => {
    setMeasureValues((prevList: measureValuesType[]) => [
      ...prevList,
      { category: "Velg kategori", status: "Velg status", started: false },
    ]);
  };

  const updateListe = (id: number, category: string, status: string) => {
    setMeasureValues((prevList: measureValuesType[]) => {
      const newList = [...prevList];
      newList[id] = { category, status };
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

  const handleSetNewProbValue = (value: string) => {
    setNewProbValue(parseFloat(value));
  };

  const handleSetNewConsValue = (value: string) => {
    setNewConsValue(parseFloat(value));
  };

  useEffect(() => {
    console.log(typeof newProbValue);
    console.log(typeof newConsValue);
  }, [newProbValue, newConsValue]);

  return (
    <>
      {showDropdown && (
        <div className={styles.tableDiv}>
          <Table size="small">
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
              {measureList.map(({ measureID, element }) => (
                <Table.ExpandableRow
                  key={measureID}
                  content={element}
                  open={expandedRow === measureID}
                  onOpenChange={() => handleRowClick(measureID)}
                >
                  <Table.DataCell scope="row">{`T${
                    measureID + 1
                  }`}</Table.DataCell>
                  <Table.DataCell scope="row">
                    {measureValues[measureID].category}
                  </Table.DataCell>
                  <Table.DataCell scope="row">
                    {measureValues[measureID].status}
                  </Table.DataCell>
                  <Table.DataCell scope="row">
                    <Button
                      variant="danger"
                      className={styles.trashcan}
                      onClick={() => deleteMeasure(measureID)}
                      icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
                      size="small"
                    >
                      Slett
                    </Button>
                  </Table.DataCell>
                </Table.ExpandableRow>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
      <div onClick={generateNewMeasure}>
        {" "}
        <div className={styles.actionDiv}>
          <Button
            icon={<PencilIcon aria-hidden />}
            size="small"
            variant="secondary"
          >
            Legg til tiltak
          </Button>{" "}
        </div>
      </div>
      {showDropdown && <hr />}

      {showDropdown && (
        <div>
          <h3 className={styles.h3}>Fyll inn nye verdier etter tiltak</h3>
          <div className={styles.verdier}>
            <Dropdown
              title={"Ny sannsynlighet"}
              setValue={handleSetNewProbValue}
              value={newProbValue}
              options={dropdownOptions}
            />
            <Dropdown
              title={"Ny konsekvens"}
              setValue={handleSetNewConsValue}
              value={newConsValue}
              options={dropdownOptions}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddMeasure;
