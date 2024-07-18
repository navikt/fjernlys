import React from "react";
import { TasklistIcon, TerminalIcon } from "@navikt/aksel-icons";
import styles from "@/styles/dashboard/overview.module.css";
import { getReportByService } from "./api/getReportByService";
import ShowReports from "@/components/dashboard/ShowReports";
import { getAllInforByService } from "./api/getAllInfoByService";

const DashboardOverview = () => {
  const handlePostData = async () => {
    try {
      const data = "test";
      const result = await getReportByService(data);
      console.log("Response from postData:", result);
    } catch (error) {
      console.error("Error from postData:", error);
    }
  };

  // const handleGetAll = async () => {
  //   console.log(await getAllInforByService());
  // };
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
