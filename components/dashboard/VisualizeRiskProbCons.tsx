import React, { useEffect, useState } from "react";
import BubbleChart from "./RiskBubbleChart";
import { getRiskProbCons } from "@/pages/api/GetRiskProbCons";

interface RiskProbConsInterface {
  categoryName: string;
  probability: number;
  consequence: number;
  newProbability: number;
  newConsequence: number;
  totalRisksPerCategory: number;
}

interface Props {
  serviceName: string;
}

const App: React.FC<Props> = ({ serviceName }) => {
  const [fetchedData, setFetchedData] = useState<RiskProbConsInterface[]>([]);

  const fetchProbCons = async () => {
    try {
      const data: any[] = await getRiskProbCons(serviceName);
      setFetchedData(data);
    } catch (error) {
      console.error("Error fetching risk categories:", error);
    }
  };

  useEffect(() => {
    fetchProbCons();
  }, [serviceName]);

  return <BubbleChart data={fetchedData} />;
};

export default App;
