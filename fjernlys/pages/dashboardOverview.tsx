import React from "react";
import { TasklistIcon, TerminalIcon } from "@navikt/aksel-icons";
import styles from "@/styles/dashboard/overview.module.css";

const DashboardOverview = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.card}>
        <TasklistIcon className={styles.cardIcon} />
        <h3>Task List</h3>
        <p>Dashboard 1</p>
      </div>
      <div className={styles.card}>
        <TerminalIcon className={styles.cardIcon} />
        <h3>Terminal</h3>
        <p>Dashboard 2</p>
      </div>
      {/* Add more cards as needed */}
    </div>
  );
};

export default DashboardOverview;
