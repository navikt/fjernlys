import { Box, HelpText, Page, VStack } from "@navikt/ds-react";
import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from "@/styles/landingPage/landingPage.module.css";
import Risk from "@/components/skjema/Risk";
import Opplysninger from "@/components/skjema/Opplysninger";
import Risikoeier from "@/components/skjema/Risikoeier";
import { createContext } from "react";
import LeggTilTiltak from "@/components/skjema/LeggTilTiltak";
import LeggTilRisiko from "@/components/skjema/LeggTilRisiko";
import RisikoKomponent from "@/components/skjema/RisikoKomponent";
import router from "next/router";

interface FormContextType {
  formData: { [key: string]: any };
  updateFormData: (key: string, value: any) => void;
}
export const DropdownValues = createContext<FormContextType | undefined>(
  undefined
);

const goHome = () => {
  router.push("/");
  console.log("hey");
};

const fillForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const updateFormData = (key: string, value: any) => {
    setFormData((prevData: any) => ({ ...prevData, [key]: value }));
  };

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
            <div style={{ cursor: "pointer" }}>
              {" "}
              <Image
                src="/Rød.png"
                width={85}
                height={55}
                alt={"Nav Logo"}
                onClick={goHome}
              />
            </div>
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
              <h1>Rapporteringsskjema</h1>
            </div>
            <Opplysninger />
            <h2>Risiko</h2>
            <div className={styles.verdier}>
              <h3>Fyll inn verdier</h3>
              <HelpText title="Hva skal du gjøre?">
                Velg verdier for sannsynlighet og konsekvens gjort i din
                risikovurdering
              </HelpText>
            </div>
            <DropdownValues.Provider value={{ formData, updateFormData }}>
              <div>
                <RisikoKomponent riskID={"R1"} />
                {/* <RisikoKomponent riskID={"R2"} /> */}
              </div>
              <LeggTilRisiko />
            </DropdownValues.Provider>

            <div className={styles.test}>Andre opplysninger</div>
            <Risikoeier />
          </VStack>
        </div>
      </Page>
    </>
  );
};

export default fillForm;
