import React, { useCallback, useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@navikt/aksel-icons";

import { Button, HStack, Table } from "@navikt/ds-react";
import { get } from "http";

import styles from "@/styles/skjema/risk.module.css";
import EditRiskComponent from "./EditRiskComponent";
import PopUpRisk from "@/components/skjema/information/PopUpRisk";
type MeasureValuesType = {
  id: string;
  riskAssessmentId: string;
  status: string;
  category: string;
};

type RiskValuesType = {
  id: string | null;
  reportId: string;
  probability: number;
  consequence: number;
  dependent: boolean;
  riskLevel: string;
  category: string;
  measureValues: MeasureValuesType[];
  newConsequence: number;
  newProbability: number;
};

interface Props {
  reportId: string;
  riskValues: RiskValuesType[];
  setriskValues: any;
  onFieldsEdited: (isEdited: boolean) => void;
}
const AddRisk = ({
  reportId,
  riskValues,
  setriskValues,
  onFieldsEdited,
}: Props) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [cachedID, setCachedID] = useState(0);
  const [activePopUp, setActivePopUp] = useState(false);

  const [isProbEdited, setIsProbEdited] = useState<boolean[]>(
    riskValues.map(() => false)
  );
  const [isConsEdited, setIsConsEdited] = useState<boolean[]>(
    riskValues.map(() => false)
  );
  const [isNewConsEdited, setIsNewConsEdited] = useState<boolean[]>(
    riskValues.map(() => false)
  );
  const [isNewProbEdited, setIsNewProbEdited] = useState<boolean[]>(
    riskValues.map(() => false)
  );
  const [isCategoryEdited, setIsCategoryEdited] = useState<boolean[]>(
    riskValues.map(() => false)
  );

  useEffect(() => {
    const allFieldsEdited =
      isProbEdited.every(Boolean) &&
      isConsEdited.every(Boolean) &&
      isNewConsEdited.every(Boolean) &&
      isNewProbEdited.every(Boolean) &&
      isCategoryEdited.every(Boolean);
    onFieldsEdited(allFieldsEdited);
  }, [
    isProbEdited,
    isConsEdited,
    isNewConsEdited,
    isNewProbEdited,
    isCategoryEdited,
    onFieldsEdited,
  ]);

  // ----------------- New STUFFFFF -----------------
  const handleProbChange = useCallback(
    (id: number, value: string) => {
      setriskValues((prevList: any) => {
        const newList = [...prevList];
        newList[id].probability = parseFloat(value);
        return newList;
      });
      setIsProbEdited((prevList) =>
        prevList.map((edited, index) => (index === id ? true : edited))
      );
    },
    [setriskValues]
  );

  const handleConsChange = useCallback(
    (id: number, value: string) => {
      setriskValues((prevList: any) => {
        const newList = [...prevList];
        newList[id].consequence = parseInt(value);
        return newList;
      });
      setIsConsEdited((prevList) =>
        prevList.map((edited, index) => (index === id ? true : edited))
      );
    },
    [setriskValues]
  );

  const handleNewConsChange = useCallback(
    (id: number, value: string) => {
      setriskValues((prevList: any) => {
        const newList = [...prevList];
        newList[id].newConsequence = value;
        return newList;
      });
      setIsNewConsEdited((prevList) =>
        prevList.map((value, index) => (index === id ? true : value))
      );
    },
    [setriskValues]
  );

  const handleNewProbChange = useCallback(
    (id: number, value: string) => {
      setriskValues((prevList: any) => {
        const newList = [...prevList];
        newList[id].newProbability = value;
        return newList;
      });
      setIsNewProbEdited((prevList) =>
        prevList.map((edited, index) => (index === id ? true : edited))
      );
    },
    [setriskValues]
  );

  const handleCategoryChange = useCallback(
    (id: number, value: string) => {
      setriskValues((prevList: any) => {
        const newList = [...prevList];
        newList[id].category = value;
        return newList;
      });
      setIsCategoryEdited((prevList) =>
        prevList.map((edited, index) => (index === id ? true : edited))
      );
    },
    [setriskValues]
  );

  const deleteRisk = () => {
    setriskValues((prevList: RiskValuesType[]) =>
      prevList.filter((_, index) => index !== cachedID)
    );
    setIsProbEdited((prevList) =>
      prevList.filter((_, index) => index !== cachedID)
    );
    setIsConsEdited((prevList) =>
      prevList.filter((_, index) => index !== cachedID)
    );
    setIsNewConsEdited((prevList) =>
      prevList.filter((_, index) => index !== cachedID)
    );
    setIsNewProbEdited((prevList) =>
      prevList.filter((_, index) => index !== cachedID)
    );
    setIsCategoryEdited((prevList) =>
      prevList.filter((_, index) => index !== cachedID)
    );
    setriskList([]);
    setActivePopUp(!activePopUp);
  };

  const handleRowClick = (rowId: number) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const [exist, setExist] = useState<boolean>(false);

  const updateListe = useCallback(
    (
      RiskId: number,
      id: string,
      reportId: string,
      probability: number,
      consequence: number,
      dependent: boolean,
      riskLevel: string,
      category: string,
      measureValues?: MeasureValuesType[],
      newConsequence?: string,
      newProbability?: string
    ) => {
      setriskValues((prevList: any) => {
        const newList = [...prevList];
        newList[RiskId] = {
          id,
          reportId,
          probability,
          consequence,
          dependent,
          riskLevel,
          category,
          measureValues,
          newConsequence,
          newProbability,
        };
        return newList;
      });
      setExist(true);
    },
    [setriskValues]
  );
  const activateDeletePopUp = useCallback(
    (riskID: number) => {
      setActivePopUp(!activePopUp);
      setCachedID(riskID);
    },
    [setActivePopUp, setCachedID, activePopUp]
  );

  const [riskList, setriskList] = useState<
    {
      riskIDNum: number;
      element: JSX.Element;
    }[]
  >([]);

  useEffect(() => {
    setriskList(
      riskValues.map((item, index) => ({
        riskIDNum: index,
        element: (
          <EditRiskComponent
            key={index}
            riskIDNum={index}
            id={item.id}
            reportId={reportId}
            probability={item.probability}
            consequence={item.consequence}
            existingDependent={item.dependent}
            existingRiskLevel={item.riskLevel}
            existingCategory={item.category}
            existingMeasureValues={item.measureValues}
            deleteRisk={activateDeletePopUp}
            updateRisk={updateListe}
            newConsequence={`${item.newConsequence}`}
            newProbability={`${item.newProbability}`}
            handleProbChange={handleProbChange}
            handleConsChange={handleConsChange}
            handleNewConsChange={handleNewConsChange}
            handleNewProbChange={handleNewProbChange}
            handleCategoryChange={handleCategoryChange}
            exist={exist}
          />
        ),
      }))
    );
  }, [
    riskValues,
    activateDeletePopUp,
    exist,
    handleCategoryChange,
    handleConsChange,
    handleNewConsChange,
    handleNewProbChange,
    handleProbChange,
    reportId,
    updateListe,
  ]);

  const generateNewrisk = () => {
    setriskValues((prevList: any) => [
      ...prevList,
      {
        id: null,
        reportId: reportId,
        probability: 0,
        consequence: 0,
        dependent: false,
        riskLevel: "Ingen vurdering",
        category: "Ikke satt",
      },
    ]);
    setIsProbEdited((prevList) => [...prevList, false]);
    setIsConsEdited((prevList) => [...prevList, false]);
    setIsNewConsEdited((prevList) => [...prevList, false]);
    setIsNewProbEdited((prevList) => [...prevList, false]);
    setIsCategoryEdited((prevList) => [...prevList, false]);
  };
  const getBackgroundColor = (riskLevel: any) => {
    switch (riskLevel) {
      case "Lav":
        return "var(--a-green-300)";
      case "Moderat":
        return "var(--a-orange-300)";
      case "Høy":
        return "var(--a-red-400)";
      default:
        return "false";
    }
  };

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell scope="col">Risiko</Table.HeaderCell>
            <Table.HeaderCell scope="col">Nivå</Table.HeaderCell>
            <Table.HeaderCell scope="col">Kategori</Table.HeaderCell>
            <Table.HeaderCell scope="col">Avhengighet</Table.HeaderCell>
            <Table.HeaderCell scope="col">Antall tiltak</Table.HeaderCell>
            <Table.HeaderCell scope="col">Slett risiko</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {riskList.map(({ riskIDNum, element }) => (
            <Table.ExpandableRow
              key={riskIDNum}
              content={element}
              open={expandedRow === riskIDNum}
              onOpenChange={() => handleRowClick(riskIDNum)}
            >
              <Table.DataCell scope="row">{`R${riskIDNum + 1}`}</Table.DataCell>
              <Table.DataCell scope="row">
                <div className={styles.riskLevelDiv}>
                  <div className={styles.riskLevelText}>
                    {riskValues[riskIDNum].riskLevel}
                  </div>
                  <div
                    style={{
                      visibility:
                        getBackgroundColor(riskValues[riskIDNum].riskLevel) ==
                        "false"
                          ? "hidden"
                          : "visible",
                      backgroundColor: getBackgroundColor(
                        riskValues[riskIDNum].riskLevel
                      ),
                    }}
                    className={styles.riskLevelColorBox}
                  ></div>
                </div>
              </Table.DataCell>
              <Table.DataCell scope="row">
                {riskValues[riskIDNum].category}
              </Table.DataCell>
              <Table.DataCell scope="row">
                {riskValues[riskIDNum].dependent === true ? "Ja" : "Nei"}
              </Table.DataCell>
              <Table.DataCell scope="row">
                {riskValues[riskIDNum].measureValues?.length
                  ? riskValues[riskIDNum].measureValues?.length
                  : 0}
              </Table.DataCell>
              <Table.DataCell scope="row">
                <Button
                  variant="danger"
                  className={styles.trashcan}
                  onClick={() => activateDeletePopUp(riskIDNum)}
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

      <div className={styles.addRiskDiv}>
        <Button
          icon={<PencilIcon />}
          onClick={() => generateNewrisk()}
          variant="secondary"
        >
          <div>Legg til risiko</div>
        </Button>
      </div>

      {activePopUp && (
        <PopUpRisk
          deleteRisk={deleteRisk}
          setActivatePopUp={setActivePopUp}
          popUpText={"Vil du virkelig slette denne risikoen?"}
        />
      )}
    </>
  );
};

export default AddRisk;
