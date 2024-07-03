import { ExpansionCard, TextField } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/skjema/risk.module.css";
import { DropdownValues } from "@/pages/skjema";
import Dropdown from "./Dropdown";
import LeggTilTiltak from "./LeggTilTiltak";

interface Props {
  riskID: string;
}

function RisikoKomponent({ riskID }: Props) {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }
  const [color, setColor] = useState("none");
  const { formData, updateFormData } = context;
  const [probValue, setProbValue] = useState("0");
  const [consValue, setConsValue] = useState("0");
  const [riskValues, setRiskValues] = useState<{ [key: string]: any }>({});

  const updateRiskValues = (key: string, value: any) => {
    setRiskValues((prevData: any) => ({ ...prevData, [key]: value }));
  };

  useEffect(() => {
    updateColor(probValue, consValue);
    updateRiskValues("prob", probValue);
    updateRiskValues("cons", consValue);
    //updateFormData(riskID, riskValues);
    //console.log(formData);
    console.log(riskID, probValue, consValue);
  }, [probValue, consValue]);

  const updateColor = (prob: string, cons: string) => {
    let probInt = parseInt(prob);
    let consInt = parseInt(cons);

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
            <ExpansionCard.Title>{riskID}</ExpansionCard.Title>{" "}
          </ExpansionCard.Header>{" "}
          <ExpansionCard.Content>
            {" "}
            <div>
              <TextField
                label="RisikoID"
                value={riskID}
                readOnly
                style={{ backgroundColor: color }}
              />
            </div>
            <div className={styles.verdier}>
              <Dropdown
                title={"Sannsynlighet"}
                formKey={"prob"}
                setVerdi={setProbValue}
              />
              <Dropdown
                title={"Konsekvens"}
                formKey={"cons"}
                setVerdi={setConsValue}
              />
            </div>
            <LeggTilTiltak riskID={riskID} />
          </ExpansionCard.Content>{" "}
        </ExpansionCard>
      </div>
    </>
  );
}

export default RisikoKomponent;
