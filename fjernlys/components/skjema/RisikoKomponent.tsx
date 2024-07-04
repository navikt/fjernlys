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
  tiltakValues?: tiltakValuesType[];
  deleteRisiko: any;
  updateRisiko: any;
}

function RisikoKomponent({
  riskIDNum,
  probability,
  consequence,
  tiltakValues,
  deleteRisiko,
  updateRisiko,
}: Props) {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }
  const [color, setColor] = useState("none");
  const { formData, updateFormData } = context;
  const [probValue, setProbValue] = useState(`${probability}` || "0");
  const [consValue, setConsValue] = useState(`${consequence}` || "0");
  console.log(`${probability}`, `${consequence}`);

  const [tiltakValues, setTiltakValues] = useState<tiltakValuesType[]>([
    { category: "", started: false },
  ]);
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
        [tiltakValues]
      );
    } else {
      updateRisiko(
        riskIDNum,
        parseFloat(probValue),
        parseFloat(consValue),
        false
      );
    }
  }, [probValue, consValue, tiltakValues]);

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
            <ExpansionCard.Title>{`R${riskIDNum + 1}`}</ExpansionCard.Title>
          </ExpansionCard.Header>
          <ExpansionCard.Content>
            {" "}
            <div className={styles.contentDiv}>
              <TextField
                label="RisikoID"
                value={`R${riskIDNum + 1}`}
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
            />
          </ExpansionCard.Content>{" "}
        </ExpansionCard>
      </div>
    </>
  );
}

export default RisikoKomponent;
