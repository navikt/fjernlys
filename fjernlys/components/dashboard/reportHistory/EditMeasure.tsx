import React, { useCallback, useEffect, useState } from "react";
import { PlusCircleIcon, TrashIcon } from "@navikt/aksel-icons";
import styles from "@/styles/skjema/measure.module.css";
import { Button, Table } from "@navikt/ds-react";
import Dropdown from "@/components/skjema/information/Dropdown";
import EditMeasureComponent from "./EditMeasureComponent";

interface Props {
  riskIDNum: number;
  riskAssessmentId: string | null;
  measureValues: measureValuesType[];
  setMeasureValues: any;
  setNewProbValue: any;
  setNewConsValue: any;
  newProbValue: string;
  newConsValue: string;
  handleNewConsChange: (id: number, value: string) => void;
  handleNewProbChange: (id: number, value: string) => void;
}

type measureValuesType = {
  id: string | null;
  riskAssessmentId: string;
  status: string;
  category: string;
};

const EditMeasure = ({
  riskIDNum,
  riskAssessmentId,
  measureValues,
  setMeasureValues,
  setNewConsValue,
  setNewProbValue,
  newConsValue,
  newProbValue,
  handleNewConsChange,
  handleNewProbChange,
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [measureList, setMeasureList] = useState<
    { measureID: number; element: JSX.Element }[]
  >([]);

  const deleteMeasure = useCallback(
    (measureIDNum: number) => {
      setMeasureValues((prevList: measureValuesType[]) =>
        prevList.filter((_, index) => index !== measureIDNum)
      );
      setMeasureList([]);
    },
    [setMeasureValues]
  );

  useEffect(() => {
    setShowDropdown(measureList.length > 0);
  }, [measureList]);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const handleRowClick = (rowId: number) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const updateListe = useCallback(
    (
      measureId: number,
      id: string,
      riskAssessmentId: string,
      category: string,
      status: string
    ) => {
      setMeasureValues((prevList: measureValuesType[]) => {
        const newList = [...prevList];
        newList[measureId] = { id, riskAssessmentId, category, status };
        return newList;
      });
    },
    [setMeasureValues]
  );

  useEffect(() => {
    setMeasureList(
      measureValues.map((item, index) => ({
        measureID: index,
        element: (
          <EditMeasureComponent
            key={index}
            measureIDNum={index}
            riskIDNum={riskIDNum + 1}
            id={item.id}
            riskAssessmentId={riskAssessmentId}
            deleteMeasure={deleteMeasure}
            category={item.category}
            status={item.status}
            updateListe={updateListe}
          />
        ),
      }))
    );
  }, [measureValues, deleteMeasure, riskAssessmentId, riskIDNum, updateListe]);

  const generateNewMeasure = () => {
    setMeasureValues((prevList: measureValuesType[]) => [
      ...prevList,
      {
        id: null,
        riskAssessmentId: riskAssessmentId,
        category: "Velg kategori",
        status: "Velg status",
      },
    ]);
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

  // useEffect(() => {
  //   console.log(typeof newProbValue);
  //   console.log(typeof newConsValue);
  // }, [newProbValue, newConsValue]);

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
            icon={<PlusCircleIcon title="a11y-title" fontSize="1.5rem" />}
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
              setValue={(value) => {
                handleSetNewProbValue(value);
                handleNewProbChange(riskIDNum, value);
              }}
              value={newProbValue}
              options={dropdownOptions}
            />
            <Dropdown
              title={"Ny konsekvens"}
              setValue={(value) => {
                handleSetNewConsValue(value);
                handleNewConsChange(riskIDNum, value);
              }}
              value={newConsValue}
              options={dropdownOptions}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditMeasure;
