import React from "react";
import styles from "@/styles/dashboard/overview.module.css";
import { TasklistIcon, TerminalIcon } from "@navikt/aksel-icons";
import ShowReports from "@/components/dashboard/showReports/ShowReports";
import { Box, Page, VStack } from "@navikt/ds-react";
import landingPageStyles from "@/styles/landingPage/landingPage.module.css";
import riskStyles from "@/styles/skjema/risk.module.css";
import Image from "next/image";
import router, { useRouter } from "next/router";
import VisualizeRiskLevel from "@/components/dashboard/VisualizeRiskLevel";
import VisualizeRiskProbCons from "@/components/dashboard/VisualizeRiskProbCons";
import VisualizeRiskCategory from "@/components/dashboard/VisualizeRiskCategory";
const goHome = () => {
  router.push("/");
};
const Dashboard: React.FC = () => {
  const router = useRouter();
  const serviceList = [
    { serviceName: "AAP", labelName: "AAP" },
    { serviceName: "Alderspensjon", labelName: "Alderspensjon" },
    { serviceName: "Dagpenger", labelName: "Dagpenger" },
    { serviceName: "Foreldrepenger", labelName: "Foreldrepenger" },
    { serviceName: "Sykepenger", labelName: "Sykepenger" },
    { serviceName: "Uføretrygd", labelName: "Uføretrygd" },
    { serviceName: "Utbetaling", labelName: "Utbetaling" },
  ];

  const goToServiceDash = (serviceName: string) => {
    if (serviceName === "All") {
      return;
    } else {
      router.push(
        {
          pathname: "/DashboardByService",
          query: { serviceName: serviceName },
        },
        `/dashboard/${serviceName}`
      );
    }
  };
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
            <h1>Risikoer per tjeneste/ytelse (ADMIN)</h1>
            <div className={styles.dashboardContainer}>
              <div
                className={styles.chartDiv}
                onClick={() => goToServiceDash("All")}
              >
                <VisualizeRiskLevel
                  serviceName={"All"}
                  labelName={"Alle tjenester/ytelser"}
                />
              </div>
              {serviceList.map(({ serviceName, labelName }) => (
                <div
                  key={serviceName}
                  className={styles.chartDiv}
                  onClick={() => goToServiceDash(serviceName)}
                >
                  <VisualizeRiskLevel
                    serviceName={serviceName}
                    labelName={labelName}
                  />
                </div>
              ))}
            </div>
          </VStack>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "2vw" }}>
          <div className={riskStyles.skjemaDiv1}>
            <VStack gap="4" align={"start"} className={riskStyles.vstack}>
              <div>
                <VisualizeRiskCategory />
              </div>
            </VStack>
          </div>
          <div className={riskStyles.skjemaDiv2}>
            <VStack gap="4" align={"start"} className={riskStyles.vstack}>
              <div className={riskStyles["chart-container"]}>
                <VisualizeRiskProbCons />
              </div>
            </VStack>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Dashboard;
