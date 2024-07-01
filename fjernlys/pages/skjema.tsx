import { Box, Page, VStack } from "@navikt/ds-react";
import React from "react";
import Image from "next/image";
import styles from "@/styles/landingPage/landingPage.module.css";
import Risk from "@/components/skjema/Risk";
import Opplysninger from "@/components/skjema/Opplysninger";
import Risikoeier from "@/components/skjema/Risikoeier";
import LeggTilTiltak from "@/components/skjema/LeggTilTiltak";
import LeggTilRisiko from "@/components/skjema/LeggTilRisiko";

const fillForm = () => {
  return (
    <>
      <Page
        background="bg-subtle"
        footer={
          <Box as="footer" background="surface-neutral-moderate" padding="8">
            <Page.Block gutters>Footer</Page.Block>
          </Box>
        }
        className={styles.page}
      >
        <Box as="header" background="surface-neutral-moderate" padding="8">
          <Page.Block gutters>
            <Image src="/Rød.png" width={85} height={55} alt={"Nav Logo"} />
            RAPPORTERINGSSYSTEM
          </Page.Block>
        </Box>
        <div
          style={{
            backgroundColor: "white",
            width: "80vw",
            marginLeft: "10vw",
            borderRadius: "5px",
          }}
        >
          <VStack gap="4" align={"start"} style={{ marginLeft: "5vw" }}>
            <div className={styles.test}>
              <h1>Rapporterinsskjema</h1>
            </div>
            <Opplysninger />
            <Risk />
            <LeggTilTiltak />
            <LeggTilRisiko />
            <div className={styles.test}>Andre opplysninger</div>
            <Risikoeier />
          </VStack>
        </div>
      </Page>
    </>
  );
};

export default fillForm;
