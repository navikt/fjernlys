import { HelpText, Radio, RadioGroup } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/skjema/risk.module.css";
import Dropdown from "@/components/skjema/information/Dropdown";
import AddMeasure from "@/components/skjema/measure/AddMeasure";

type MeasureValuesType = {
  id: string;
  riskAssessmentId: string;
  status: string;
  category: string;
};

interface Props {
  exist: boolean;
  riskIDNum: number;
  id: string;
  reportId: string;
  probability: number;
  consequence: number;
  existingDependent: boolean;
  existingRiskLevel: string;
  existingCategory: string;
  existingMeasureValues?: MeasureValuesType[];
  deleteRisk: any;
  updateRisk: any;
  newProbability?: string;
  newConsequence?: string;
  handleProbChange: (id: number, value: string) => void;
  handleConsChange: (id: number, value: string) => void;
  handleNewConsChange: (id: number, value: string) => void;
  handleNewProbChange: (id: number, value: string) => void;
  handleCategoryChange: (id: number, value: string) => void;
}

function EditRiskComponent({
  exist,
  riskIDNum,
  id,
  reportId,
  probability,
  consequence,
  existingDependent,
  existingMeasureValues,
  existingRiskLevel,
  existingCategory,
  deleteRisk,
  updateRisk,
  newProbability,
  newConsequence,
  handleProbChange,
  handleConsChange,
  handleNewConsChange,
  handleNewProbChange,
  handleCategoryChange,
}: Props) {
  const [color, setColor] = useState("none");

  const [probValue, setProbValue] = useState(`${probability}` || "0");
  const [consValue, setConsValue] = useState(`${consequence}` || "0");
  const [newConsValue, setNewConsValue] = useState(newConsequence || "0");
  const [newProbValue, setNewProbValue] = useState(newProbability || "0");
  const [dependent, setDependent] = useState(existingDependent || false);
  const [riskLevel, setRiskLevel] = useState(
    existingRiskLevel || "Ingen vurdering"
  );
  const [category, setCategory] = useState(existingCategory || "Ikke satt");

  const [measureValues, setMeasureValues] = useState<MeasureValuesType[]>(
    existingMeasureValues || []
  );

  const deleteSelf = () => {
    deleteRisk(riskIDNum);
  };

  useEffect(() => {
    updateColor(probValue, consValue);
    if (measureValues.length > 0) {
      updateRisk(
        riskIDNum,
        id,
        reportId,
        parseFloat(probValue),
        parseFloat(consValue),
        dependent,
        riskLevel,
        category,
        measureValues,
        newConsValue,
        newProbValue
      );
    } else {
      updateRisk(
        riskIDNum,
        id,
        reportId,
        parseFloat(probValue),
        parseFloat(consValue),
        dependent,
        riskLevel,
        category
      );
    }
  }, [
    probValue,
    consValue,
    dependent,
    riskLevel,
    category,
    measureValues,
    newConsValue,
  ]);

  const updateColor = (prob: string, cons: string) => {
    let probInt = parseFloat(prob);
    let consInt = parseFloat(cons);

    if (probInt > 0 && consInt > 0) {
      let total = probInt * consInt;
      if (total <= 4 && probInt <= 3 && consInt <= 3) {
        setColor("green");
        setRiskLevel("Lav");
      } else if (total >= 15) {
        setColor("red");
        setRiskLevel("Høy");
      } else if (total >= 4 && total < 15) {
        setColor("yellow");
        setRiskLevel("Moderat");
      }
    }
  };
  const handleDependent = (value: string) => {
    setDependent(value === "true");
  };
  const dropdownOptionsProb = [
    { value: "0", label: "Velg sannsynlighet" },
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
  const dropdownOptionsCons = [
    { value: "0", label: "Velg konsekvens" },
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

  const categoryOptions = [
    { value: "Ikke satt", label: "Ikke satt" },
    {
      value: "Stabil drift og måloppnåelse",
      label: "Stabil drift og måloppnåelse",
    },
    { value: "Helse, miljø og sikkerhet", label: "Helse, miljø og sikkerhet" },
    {
      value: "Personvern og informasjonssikkerhet",
      label: "Personvern og informasjonssikkerhet",
    },
    {
      value: "Beredskap og samfunnssikkerhet",
      label: "Beredskap og samfunnssikkerhet",
    },
    {
      value: "Trygdesvindel",
      label: "Trygdesvindel",
    },
    {
      value: "Interne misligheter",
      label: "Interne misligheter",
    },
  ];

  return (
    <>
      {exist && (
        <div className={styles.parentDiv}>
          <div className={styles.contentDiv}>
            <div className={styles.verdier}>
              <div className={styles.dropdownComp}>
                <Dropdown
                  title={"Sannsynlighet"}
                  setValue={(value) => {
                    setProbValue(value);
                    handleProbChange(riskIDNum, value);
                  }}
                  value={probValue}
                  options={dropdownOptionsProb}
                />
              </div>
              <div className={styles.dropdownComp}>
                <Dropdown
                  title={"Konsekvens"}
                  setValue={(value) => {
                    setConsValue(value);
                    handleConsChange(riskIDNum, value);
                  }}
                  value={consValue}
                  options={dropdownOptionsCons}
                />
              </div>
            </div>
            <div className={styles.categoryDiv}>
              <div className={styles.dropdownComp}>
                <Dropdown
                  title={"Kategori"}
                  value={category}
                  setValue={(value) => {
                    setCategory(value);
                    handleCategoryChange(riskIDNum, value);
                  }}
                  options={categoryOptions}
                />
              </div>
              <div className={styles.dependentRiskDiv}>
                <RadioGroup
                  legend="Avhengighetsrisiko?"
                  onChange={handleDependent}
                  defaultValue={"false"}
                  size="small"
                >
                  <div className={styles.dependentRiskRadio}>
                    <Radio value="true">Ja</Radio>
                    <Radio value="false">Nei</Radio>
                  </div>
                </RadioGroup>
                <HelpText title="Hva er en avhengighetsrisiko?">
                  En avhengighetsrisiko innebærer at risikoen du har i ditt
                  system/applikasjon er avhengig av andre systemer utenfor ditt
                  ansvarsområde
                </HelpText>
              </div>
            </div>
            <AddMeasure
              riskIDNum={riskIDNum}
              measureValues={measureValues}
              setMeasureValues={setMeasureValues}
              setNewProbValue={setNewProbValue}
              setNewConsValue={setNewConsValue}
              newProbValue={newProbValue}
              newConsValue={newConsValue}
              handleNewConsChange={handleNewConsChange}
              handleNewProbChange={handleNewProbChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default EditRiskComponent;
