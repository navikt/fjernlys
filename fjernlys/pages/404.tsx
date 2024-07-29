import { BodyShort, Box, Heading, Link, List, Page } from "@navikt/ds-react";
import React from "react";
import Image from "next/image";
import landingPageStyles from "@/styles/landingPage/landingPage.module.css";
import router from "next/router";

const goHome = () => {
  router.push("/");
};
function NotFoundPage() {
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
        <Box
          paddingBlock="20 16"
          data-aksel-template="404-v2"
          style={{ marginLeft: "10rem" }}
        >
          {" "}
          <div>
            {" "}
            <Heading level="1" size="large" spacing>
              {" "}
              Beklager, vi fant ikke siden{" "}
            </Heading>{" "}
            <BodyShort>
              {" "}
              Denne siden kan være slettet eller flyttet, eller det er en feil i
              lenken.{" "}
            </BodyShort>{" "}
            <List>
              <List.Item>
                {" "}
                <Link href="/">Gå til forsiden</Link>{" "}
              </List.Item>{" "}
            </List>{" "}
          </div>{" "}
        </Box>
      </Page>
    </>
  );
}

export default NotFoundPage;
