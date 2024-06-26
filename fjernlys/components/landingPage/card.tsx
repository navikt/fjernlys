import { Box } from "@navikt/ds-react/Box";
import { Page } from "@navikt/ds-react/Page";
import { relative } from "path";
import { ReactElement } from "react";
import styles from "@/styles/landingPage/card.module.css";
interface Props {
  title: string;
  icon: ReactElement;
}
const colorMap = {
  "bg-default-grey-200": "#E0E3E6",
};

export default function Card({ title, icon }: Props) {
  return (
    <Box as="main" borderRadius="large" className={styles.box}>
      <div className={styles.cardContainer}>
        {icon}
        <Page.Block gutters className={styles.block}>
          {title}
        </Page.Block>
      </div>
    </Box>
  );
}
