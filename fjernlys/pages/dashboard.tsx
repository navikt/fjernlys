import React from "react";
import styles from "@/styles/dashboard/overview.module.css";
import { TasklistIcon, TerminalIcon } from "@navikt/aksel-icons";
import ShowReports from "@/components/dashboard/showReports/ShowReports";
import { Box, Page, VStack } from "@navikt/ds-react";
import landingPageStyles from "@/styles/landingPage/landingPage.module.css";
import riskStyles from "@/styles/skjema/risk.module.css";
import Image from "next/image";
import router from "next/router";
import VisualizeRiskLevel from "@/components/dashboard/VisualizeRiskLevel";
const goHome = () => {
  router.push("/");
};
const Dashboard: React.FC = () => {
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
        <div className={riskStyles.skjemaDiv}>
          <VStack gap="4" align={"start"} className={riskStyles.vstack}>
            <h1>Dashboard</h1>
            <VisualizeRiskLevel />
            <ShowReports />
          </VStack>
        </div>
      </Page>
    </>
  );
};

export default Dashboard;
