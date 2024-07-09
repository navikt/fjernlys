import { HelpText, Radio, RadioGroup } from "@navikt/ds-react";
import React from "react";
import styles from "@/styles/skjema/information.module.css";

interface Props {
  owner: boolean;
  setOwner: any;
}
function Risikoeier({ owner, setOwner }: Props) {
  const updateOwner = (value: string) => {
    setOwner(value === "true");
  };
  return (
    <>
      <div className={styles.risikoeierDiv}>
        <RadioGroup
          legend="Er du risikoeier?"
          onChange={updateOwner}
          defaultValue={"true"}
        >
          <div className={styles.risikoeierRadio}>
            <Radio value="true">Ja</Radio> <Radio value="false">Nei</Radio>{" "}
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
