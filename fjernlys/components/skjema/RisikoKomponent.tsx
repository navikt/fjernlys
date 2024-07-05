import { ExpansionCard, TextField } from "@navikt/ds-react";
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
          style={{ width: "20vw" }}
        >
          {" "}
          <ExpansionCard.Header>
            {" "}
            <div style={{ display: "flex" }}>
              {" "}
              RisikoID:
              <ExpansionCard.Title>{`R${riskIDNum + 1}`}</ExpansionCard.Title>
            </div>
          </ExpansionCard.Header>
          <ExpansionCard.Content>
            {" "}
            <div className={styles.contentDiv2}>
              <div className={styles.contentDiv}>
                <TextField
                  label="Trusselnivå"
                  readOnly
                  style={{ backgroundColor: color }}
                />
                <TrashIcon
                  title="a11y-title"
                  fontSize="1.5rem"
                  className={styles.trashcan}
                  onClick={deleteSelf}
                />
              </div>
              <div className={styles.verdier}>
                <Dropdown
                  title={"Sannsynlighet"}
                  formKey={"prob"}
                  setVerdi={setProbValue}
                  verdi={probValue}
                />
                <Dropdown
                  title={"Konsekvens"}
                  formKey={"cons"}
                  setVerdi={setConsValue}
                  verdi={consValue}
                />
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
