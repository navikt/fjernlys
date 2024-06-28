import { Box } from "@navikt/ds-react";
import { ReactElement } from "react";
import styles from "@/styles/landingPage/card.module.css";

interface Props {
  title: string;
  icon: ReactElement;
  onClick?: () => void; // Add onClick to the Props interface
}

const colorMap = {
  "bg-default-grey-200": "#E0E3E6",
};

export default function Card({ title, icon, onClick }: Props) {
  return (
    <Box
      as="main"
      borderRadius="large"
      className={styles.box}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {" "}
      <div className={styles.cardContainer}>
        {icon}
        <div className={styles.block}> {title}</div>
      </div>
    </Box>
  );
}
