import React from "react";
import { TasklistIcon, TerminalIcon } from "@navikt/aksel-icons";
import styles from "@/styles/dashboard/overview.module.css";
import { getData } from "./api/getData";
import ShowReports from "@/components/dashboard/ShowReports";

const DashboardOverview = () => {
  const handlePostData = async () => {
    try {
      const data = "test";
      const result = await getData(data);
      console.log("Response from postData:", result);
    } catch (error) {
      console.error("Error from postData:", error);
    }
  };
  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.card} onClick={handlePostData}>
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
      <ShowReports />
    </>
  );
};

export default DashboardOverview;
