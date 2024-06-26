import { Inter } from "next/font/google";
import styles from "@/styles/landingPage/landingPage.module.css";

const inter = Inter({ subsets: ["latin"] });
import { Box, Page } from "@navikt/ds-react";
import Card from "@/components/landingPage/card";
import { TasklistIcon, TerminalIcon } from "@navikt/aksel-icons";
import Image from "next/image";

export default function Home() {
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
            <Image
              src="/nav_black.png"
              width={85}
              height={55}
              alt={"Nav Logo"}
            />
            RAPPORTERINGSSYSTEM
          </Page.Block>
        </Box>
        <div className={styles.cardContainer}>
          <Card
            title="Fyll ut skjema"
            icon={<TasklistIcon title="a11y-title" fontSize="5rem" />}
          />

          <Card
            title="Dashboard"
            icon={<TerminalIcon title="a11y-title" fontSize="5rem" />}
          />
        </div>
      </Page>
    </>
  );
}
