import React from "react";
import styles from "@/styles/skjema/popup.module.css";
import { Box, Button } from "@navikt/ds-react";

interface Props {
  deleteRisk: any;
  setActivatePopUp: any;
  popUpText: string;
}

function PopUpRisk({ deleteRisk, setActivatePopUp, popUpText }: Props) {
  return (
    <>
      <Box
        background="surface-subtle"
        borderColor="border-alt-3"
        padding="4"
        borderWidth="2"
        borderRadius="xlarge"
        className={styles.mainDiv}
      >
        <div className={styles.contentDiv}>
          <h3>{popUpText}</h3>
          <div className={styles.buttonDiv}>
            <Button
              variant="danger"
              className={styles.button}
              onClick={() => deleteRisk()}
            >
              Ja
            </Button>
            <Button
              variant="primary"
              className={styles.button}
              onClick={() => setActivatePopUp()}
            >
              Nei
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
}

export default PopUpRisk;
