import {
  BodyShort,
  Box,
  Heading,
  HGrid,
  Link,
  List,
  Page,
  VStack,
} from "@navikt/ds-react";
import React from "react";
import Image from "next/image";
import landingPageStyles from "@/styles/landingPage/landingPage.module.css";
import router from "next/router";

const goHome = () => {
  router.push("/");
};
function Error500() {
  return (
    <>
      <Page
        background="bg-subtle"
        footer={
          <Box as="footer" background="surface-neutral-moderate" padding="8">
            <Page.Block gutters>Fjernlys sommer 2024 ☀️</Page.Block>
          </Box>
        }
        className={landingPageStyles.page}
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
        <Box paddingBlock="20 8" style={{ marginLeft: "10rem" }}>
          {" "}
          <HGrid columns="minmax(auto,600px)" data-aksel-template="500-v2">
            {" "}
            <VStack gap="16">
              {" "}
              <VStack gap="12" align="start">
                {" "}
                <div>
                  {" "}
                  <BodyShort textColor="subtle" size="small">
                    {" "}
                    Statuskode 500{" "}
                  </BodyShort>{" "}
                  <Heading level="1" size="large" spacing>
                    {" "}
                    Beklager, noe gikk galt.{" "}
                  </Heading>{" "}
                  {/* Tekster bør tilpasses den aktuelle 500-feilen. Teksten under er for en generisk 500-feil. */}{" "}
                  <BodyShort spacing>
                    {" "}
                    Det har oppstått en feil under innsending. Prøv å sende inn
                    skjemaet på nytt.
                  </BodyShort>{" "}
                  <BodyShort>Du kan prøve å</BodyShort>{" "}
                  <List>
                    {" "}
                    <List.Item>
                      {" "}
                      dobbeltsjekke at alle felt eksisterer før du sender inn på
                      nytt
                    </List.Item>{" "}
                    <List.Item>
                      {" "}
                      {/* Vurder å sjekke at window.history.length > 1 før dere rendrer dette som en lenke */}{" "}
                      <Link href="#" onClick={() => history.back()}>
                        {" "}
                        gå tilbake til forrige side{" "}
                      </Link>{" "}
                    </List.Item>{" "}
                  </List>{" "}
                </div>
              </VStack>{" "}
            </VStack>{" "}
          </HGrid>{" "}
        </Box>
      </Page>
    </>
  );
}

export default Error500;
