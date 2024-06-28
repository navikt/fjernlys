import { HelpText, Radio, RadioGroup } from "@navikt/ds-react";
import React from "react";
import styles from "@/styles/skjema/opplysninger.module.css";

function Risikoeier() {
  return (
    <>
      <div className={styles.risikoeierDiv}>
        <RadioGroup legend="Er du risikoeier?">
          <div className={styles.risikoeierRadio}>
            <Radio value="1">Ja</Radio> <Radio value="2">Nei</Radio>{" "}
          </div>
        </RadioGroup>
        <HelpText title="Hva er en risikoeier?">
          Risikoeier innebærer at du er kontaktperson for opplysningene sendt
          inn i dette skjemaet
        </HelpText>
      </div>
    </>
  );
}

export default Risikoeier;
