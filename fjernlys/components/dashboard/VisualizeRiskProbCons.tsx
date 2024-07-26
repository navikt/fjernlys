import React, { useEffect, useState } from "react";
import BubbleChart from "./Graphical/BubbleChart";
import { ChartData, ChartOptions } from "chart.js";
import { getRiskProbCons } from "@/pages/api/getRiskProbCons";

interface RiskProbConsInterface {
  categoryName: string;
  probability: number;
  consequence: number;
  newProbability: number;
  newConsequence: number;
  totalRisks: number;
}

const App: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<RiskProbConsInterface[]>([]);

  //   const data: ChartData<"bubble"> = {
  //     datasets: fetchedData.map((item) => ({
  //       label: item.categoryName,
  //       data: [
  //         { x: item.consequence, y: item.probability, r: item.totalRisks },
  //         { x: item.newConsequence, y: item.newProbability, r: item.totalRisks },
  //       ],
  //       backgroundColor: "rgba(54, 162, 235, 0.2)",
  //       borderColor: "rgba(54, 162, 235, 1)",
  //       borderWidth: 1,
  //     })),
  //   };

  //   const options: ChartOptions<"bubble"> = {
  //     scales: {
  //       x: {
  //         type: "linear",
  //         position: "bottom",
  //         title: {
  //           display: true,
  //           text: "Konsekvens",
  //         },
  //       },
  //       y: {
  //         type: "linear",
  //         position: "left",
  //         title: {
  //           display: true,
  //           text: "Sannsynlighet",
  //         },
  //       },
  //     },
  //   };

  const fetchProbCons = async () => {
    try {
      const data: RiskProbConsInterface[] = await getRiskProbCons();
      setFetchedData(data);
      console.log(data); // Log after setting the state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProbCons();
  }, []);

  return (
    <div>
      {/* <BubbleChart data={data} options={options} /> */}
      <div>
        <BubbleChart />
      </div>
    </div>
  );
};

export default App;
