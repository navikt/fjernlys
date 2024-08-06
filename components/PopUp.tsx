import React from "react";
import styles from "@/styles/skjema/popup.module.css";
import { Box, Button } from "@navikt/ds-react";

interface Props {
  goHome: any;
  goToDashboard: any;
  popUpText: string;
}

function PopUp({ goHome, goToDashboard, popUpText }: Props) {
  return (
    <>
      <div className={styles.overlay}>
        <Box
          background="surface-subtle"
          borderColor="border-alt-3"
          padding="4"
          borderWidth="2"
          borderRadius="xlarge"
          className={styles.mainDiv}
        >
          <div className={styles.contentDiv}>
            <h3 className={styles.header}>{popUpText}</h3>
            <div className={styles.buttonDiv}>
              <Button
                variant="primary"
                className={styles.button}
                onClick={() => {
                  goHome();
                }}
              >
                Forside
              </Button>
              <Button
                variant="primary"
                className={styles.button}
                onClick={() => {
                  goToDashboard();
                }}
              >
                Dashboard
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}

export default PopUp;
