import { Box, HelpText, Page, VStack } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/landingPage/landingPage.module.css";
import risk from "@/styles/skjema/risk.module.css";
import Opplysninger from "@/components/skjema/Opplysninger";
import LeggTilRisiko from "@/components/skjema/LeggTilRisiko";
import router from "next/router";

const goHome = () => {
  router.push("/");
};
type tiltakValuesType = { category: string; status: string; started: boolean };
type risikoValuesType = {
  probability: number;
  consequence: number;
  dependent: boolean;
  riskLevel: string;
  category: string;
  tiltakValues?: tiltakValuesType[];
  newConsequence?: string;
  newProbability?: string;
};

const fillForm = () => {
  const [risikoValues, setRisikoValues] = useState<risikoValuesType[]>([
    {
      probability: 0,
      consequence: 0,
      dependent: false,
      riskLevel: "Ingen vurdering",
      category: "Ikke satt",
    },
  ]);
  const [owner, setOwner] = useState(true);
  const [notOwner, setNotOwner] = useState("");
  const [service, setService] = useState("Ikke valgt");

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
        <div className={risk.skjemaDiv}>
          <VStack gap="4" align={"start"} className={risk.vstack}>
            <div className={styles.test}>
              <h1 style={{ flexGrow: "1", width: "100%" }}>
                Rapporteringsskjema
              </h1>
            </div>
            <Opplysninger
              service={service}
              setService={setService}
              owner={owner}
              setOwner={setOwner}
              setNotOwner={setNotOwner}
            />
            <div style={{ width: "80%" }}>
              <h2>Risiko</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h3 style={{ margin: 0 }}>Fyll inn verdier</h3>
                <div style={{ marginLeft: "8px" }}>
                  <HelpText title="Hva skal du gjøre?">
                    Velg verdier for sannsynlighet og konsekvens gjort i din
                    risikovurdering
                  </HelpText>
                </div>
              </div>

              <LeggTilRisiko
                risikoValues={risikoValues}
                setRisikoValues={setRisikoValues}
              />
            </div>
          </VStack>
        </div>
      </Page>
    </>
  );
};

export default fillForm;
