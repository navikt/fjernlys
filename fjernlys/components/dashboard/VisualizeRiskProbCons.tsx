import React, { useEffect, useState } from "react";
import BubbleChart from "./Graphical/RiskBubbleChart";
import { getRiskProbCons } from "@/pages/api/getRiskProbCons";

interface RiskProbConsInterface {
  categoryName: string;
  probability: number;
  consequence: number;
  totalRisks: number;
}

const App: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<RiskProbConsInterface[]>([]);

  const fetchProbCons = async () => {
    try {
      const data: any[] = await getRiskProbCons();

      const mappedData = data.map((item) => ({
        categoryName: item.categoryName,
        probability: item.prob,
        consequence: item.cons,
        totalRisks: item.totalRisks,
      }));
      setFetchedData(mappedData);
    } catch (error) {
      console.error("Error fetching risk categories:", error);
    }
  };

  useEffect(() => {
    fetchProbCons();
  }, []);

  return <BubbleChart data={fetchedData} />;
};

export default App;
