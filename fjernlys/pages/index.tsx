import { Inter } from "next/font/google";
import styles from "@/styles/landingPage/landingPage.module.css";

const inter = Inter({ subsets: ["latin"] });
import { Box, Page } from "@navikt/ds-react";
import Card from "@/components/landingPage/card";
import { TasklistIcon, TerminalIcon } from "@navikt/aksel-icons";
import Image from "next/image";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const goToForm = () => {
    router.push("/skjema");
  };

  const gotToDashboard = () => {
    router.push("/dashboardOverview");
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
        className={styles.page}
      >
        <Box as="header" background="surface-neutral-moderate" padding="8">
          <Page.Block gutters>
            <Image src="/Rød.png" width={85} height={55} alt={"Nav Logo"} />
            RAPPORTERINGSSYSTEM
          </Page.Block>
        </Box>
        <div className={styles.cardContainer}>
          <Card
            title="Fyll ut skjema"
            icon={<TasklistIcon title="a11y-title" fontSize="5rem" />}
            onClick={goToForm}
          />

          <Card
            title="Dashboard"
            icon={<TerminalIcon title="a11y-title" fontSize="5rem" />}
            onClick={gotToDashboard}
          />
        </div>
      </Page>
    </>
  );
}
