import { Box, Page, VStack } from "@navikt/ds-react";
import React from "react";
import Image from "next/image";
import styles from "@/styles/landingPage/landingPage.module.css";
import Risk from "@/components/skjema/Risk";

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
          <VStack gap="4" align={"center"}>
            <div className={styles.test}>Risikovurdering for Alderspensjon</div>
            <Risk />
            <div className={styles.test}>Andre opplysninger</div>
          </VStack>
        </div>
      </Page>
    </>
  );
};

export default fillForm;
