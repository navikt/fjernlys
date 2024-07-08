import {
  Button,
  ExpansionCard,
  HelpText,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/skjema/risk.module.css";
import { DropdownValues } from "@/pages/skjema";
import Dropdown from "./Dropdown";
import LeggTilTiltak from "./LeggTilTiltak";
import { TrashIcon } from "@navikt/aksel-icons";
import Dependent from "./Dependent";

type tiltakValuesType = { category: string; status: string; started: boolean };

interface Props {
  riskIDNum: number;
  probability: number;
  consequence: number;
  existingDependent: boolean;
  existingRiskLevel: string;
  existingCategory: string;
  existingTiltakValues?: tiltakValuesType[];
  deleteRisiko: any;
  updateRisiko: any;
  newProbability?: string;
  newConsequence?: string;
}

function RisikoKomponent({
  riskIDNum,
  probability,
  consequence,
  existingDependent,
  existingTiltakValues,
  existingRiskLevel,
  existingCategory,
  deleteRisiko,
  updateRisiko,
  newProbability,
  newConsequence,
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

  const [tiltakValues, setTiltakValues] = useState<tiltakValuesType[]>(
    existingTiltakValues || []
  );

  const deleteSelf = () => {
    deleteRisiko(riskIDNum);
  };

  useEffect(() => {
    updateColor(probValue, consValue);
    if (tiltakValues.length > 0) {
      updateRisiko(
        riskIDNum,
        parseFloat(probValue),
        parseFloat(consValue),
        dependent,
        riskLevel,
        category,
        tiltakValues,
        newConsValue,
        newProbValue
      );
      console.log("newCons", newConsValue);
      console.log("newProb", newProbValue);
    } else {
      updateRisiko(
        riskIDNum,
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
    tiltakValues,
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
        setRiskLevel("Alvorlig");
      } else if (total >= 4 && total < 15) {
        setColor("yellow");
        setRiskLevel("Moderat");
      }
    }
  };
  const handleDependent = (value: string) => {
    setDependent(value === "true");
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

  const categoryOptions = [
    { value: "Ikke satt", label: "Ikke satt" },
    { value: "Personvern", label: "Personvern" },
    { value: "Digitalt Angrep", label: "Digitalt Angrep" },
    { value: "Drift/Infrastruktur", label: "Drift/Infrastruktur" },
  ];

  return (
    <>
      <div className={styles.parentDiv}>
        {" "}
        <div className={styles.contentDiv2}>
          {" "}
          {/* <div className={styles.contentDiv}>
            <div style={{ width: "100%" }}>
              <TextField
                label="Trusselnivå"
                readOnly
                style={{ backgroundColor: color }}
              />
            </div>
          </div> */}
          <div className={styles.verdier}>
            <div style={{ width: "50%" }}>
              <Dropdown
                title={"Sannsynlighet"}
                formKey={"prob"}
                setVerdi={setProbValue}
                verdi={probValue}
                options={dropdownOptions}
              />
            </div>
            <div style={{ width: "50%" }}>
              <Dropdown
                title={"Konsekvens"}
                formKey={"cons"}
                setVerdi={setConsValue}
                verdi={consValue}
                options={dropdownOptions}
              />
            </div>
          </div>
          <div style={{ marginTop: "16px" }}>
            <Dropdown
              title={"Kategori"}
              formKey="category"
              verdi={category}
              setVerdi={setCategory}
              options={categoryOptions}
            />
          </div>
          <div className={styles.risikoeierDiv}>
            <RadioGroup
              legend="Avhengighetsrisiko?"
              onChange={handleDependent}
              defaultValue={"false"}
            >
              <div className={styles.risikoeierRadio}>
                <Radio value="true">Ja</Radio> <Radio value="false">Nei</Radio>
              </div>
            </RadioGroup>
            <HelpText title="Hva er en avhengighetsrisiko?">
              En avhengighetsrisiko innebærer at risikoen du har i ditt
              system/applikasjon er avhengig av andre systemer utenfor ditt
              ansvarsområde
            </HelpText>
          </div>
          <LeggTilTiltak
            riskIDNum={riskIDNum}
            tiltakValues={tiltakValues}
            setTiltakValues={setTiltakValues}
            setNewProbValue={setNewProbValue}
            setNewConsValue={setNewConsValue}
            newProbValue={newProbValue}
            newConsValue={newConsValue}
          />
        </div>
      </div>
      <Button
        variant="danger"
        className={styles.trashcan}
        onClick={deleteSelf}
        icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
      >
        Slett risiko
      </Button>
    </>
  );
}

export default RisikoKomponent;
