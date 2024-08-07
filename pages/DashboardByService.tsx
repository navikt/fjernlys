import React, { use, useEffect, useState } from "react";
import styles from "@/styles/dashboard/overview.module.css";
import { TasklistIcon, TerminalIcon } from "@navikt/aksel-icons";
import ShowReports from "@/components/dashboard/showReports/ShowReports";
import { Box, Page, VStack } from "@navikt/ds-react";
import landingPageStyles from "@/styles/landingPage/landingPage.module.css";
import riskStyles from "@/styles/skjema/risk.module.css";
import Image from "next/image";
import router, { useRouter } from "next/router";
import VisualizeRiskLevel from "@/components/dashboard/VisualizeRiskLevel";
import VisualizeRiskCategory from "@/components/dashboard/VisualizeRiskCategory";
import VisualizeRiskProbCons from "@/components/dashboard/VisualizeRiskProbCons";
const goHome = () => {
  router.push("/");
};

const DashboardByService = () => {
  const router = useRouter();
  const [serviceName, setServiceName] = useState<string>("");
  console.log(serviceName);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (router.isReady) {
      setServiceName(router.query.serviceName as string);
      setLoading(false);
    }
  }, [router.isReady, router.query.serviceName]);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

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
            <h1>Risikoer under {serviceName}</h1>
            <div style={{ display: "flex" }}>
              <VisualizeRiskLevel
                serviceName={serviceName}
                labelName={serviceName}
              />
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
                <VisualizeRiskProbCons serviceName={serviceName} />
              </div>
            </VStack>
          </div>
        </div>
        <div className={riskStyles.skjemaDiv}>
          <VStack gap="4" align={"start"} className={riskStyles.vstack}>
            <h1>Rapporter under {serviceName}</h1>
            <ShowReports serviceName={serviceName} />
          </VStack>
        </div>
      </Page>
    </>
  );
};

export default DashboardByService;
