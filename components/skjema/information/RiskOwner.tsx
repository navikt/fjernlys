import { HelpText, Radio, RadioGroup } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/skjema/information.module.css";

interface Props {
  isOwner: boolean;
  setIsOwner: (value: boolean) => void;
}

function Risikoeier({ isOwner, setIsOwner }: Props) {
  const [value, setValue] = useState<string>(isOwner ? "true" : "false");

  useEffect(() => {
    setValue(isOwner ? "true" : "false");
  }, [isOwner]);

  const updateOwner = (value: string) => {
    setIsOwner(value === "true");
    setValue(value);
  };

  return (
    <>
      <div className={styles.risikoeierDiv}>
        <RadioGroup
          legend="Er du risikoeier?"
          onChange={updateOwner}
          value={value} // Use value instead of defaultValue
        >
          <div className={styles.risikoeierRadio}>
            <Radio value="true">Ja</Radio>
            <Radio value="false">Nei</Radio>
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
