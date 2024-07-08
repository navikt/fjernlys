import {
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

type tiltakValuesType = { category: string; started: boolean };

interface Props {
  riskIDNum: number;
  probability: number;
  consequence: number;
  dependent: boolean;
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
  existingTiltakValues,
  deleteRisiko,
  updateRisiko,
  newProbability,
  newConsequence,
}: Props) {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }
  const [color, setColor] = useState("none");
  const { formData, updateFormData } = context;
  const [probValue, setProbValue] = useState(`${probability}` || "0");
  const [consValue, setConsValue] = useState(`${consequence}` || "0");
  const [newConsValue, setNewConsValue] = useState(newConsequence || "0");
  const [newProbValue, setNewProbValue] = useState(newProbability || "0");

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
        false,
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
        false
      );
    }
  }, [probValue, consValue, tiltakValues, newConsValue]);

  const updateColor = (prob: string, cons: string) => {
    let probInt = parseFloat(prob);
    let consInt = parseFloat(cons);

    if (probInt > 0 && consInt > 0) {
      let total = probInt * consInt;
      if (total <= 4 && probInt <= 3 && consInt <= 3) {
        setColor("green");
      } else if (total >= 15) {
        setColor("red");
      } else if (total >= 4 && total < 15) {
        setColor("yellow");
      }
    }
  };
  return (
    <>
      <div className={styles.parentDiv}>
        <ExpansionCard
          aria-label="Demo med bare tittel"
          style={{ width: "100%" }}
        >
          {" "}
          <ExpansionCard.Header>
            {" "}
            <div>
              <ExpansionCard.Title>{`R${riskIDNum + 1}`}</ExpansionCard.Title>
            </div>
          </ExpansionCard.Header>
          <ExpansionCard.Content>
            {" "}
            <div className={styles.contentDiv2}>
              {" "}
              <TrashIcon
                title="a11y-title"
                fontSize="1.5rem"
                className={styles.trashcan}
                onClick={deleteSelf}
                style={{
                  position: "absolute",
                  right: "10px",
                }}
              />
              <div className={styles.contentDiv}>
                <div style={{ width: "100%" }}>
                  <TextField
                    label="Trusselnivå"
                    readOnly
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
              <div style={{ marginTop: "16px" }}>
                <Select label={"Kategori"} size="small">
                  <option value="0" disabled>
                    Velg kategori
                  </option>
                  <option value="personvern">Personvern</option>
                  <option value="digital">Digitalt Angrep</option>
                  <option value="drift">Drift/Infrastruktur</option>
                </Select>
              </div>
              <div className={styles.risikoeierDiv}>
                <RadioGroup legend="Avhengighetsrisiko?">
                  <div className={styles.risikoeierRadio}>
                    <Radio value="1">Ja</Radio> <Radio value="2">Nei</Radio>
                  </div>
                </RadioGroup>
                <HelpText title="Hva er en avhengighetsrisiko?">
                  En avhengighetsrisiko innebærer at risikoen du har i ditt
                  system/applikasjon er avhengig av andre systemer utenfor ditt
                  ansvarsområde
                </HelpText>
              </div>
              <div className={styles.verdier}>
                <div style={{ width: "50%" }}>
                  <Dropdown
                    title={"Sannsynlighet"}
                    formKey={"prob"}
                    setVerdi={setProbValue}
                    verdi={probValue}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <Dropdown
                    title={"Konsekvens"}
                    formKey={"cons"}
                    setVerdi={setConsValue}
                    verdi={consValue}
                  />
                </div>
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
          </ExpansionCard.Content>{" "}
        </ExpansionCard>
      </div>
    </>
  );
}

export default RisikoKomponent;
