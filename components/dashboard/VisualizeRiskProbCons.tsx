import React, { useEffect, useState } from "react";
import BubbleChart from "./RiskBubbleChart";
import { getRiskProbCons } from "@/pages/api/GetRiskProbCons";

interface RiskProbConsInterface {
  categoryName: string;
  probability: number;
  consequence: number;
  newProbability: number;
  newConsequence: number;
  totalRisks: number;
}

interface Props {
  serviceName: string;
}

const App: React.FC<Props> = (props) => {
  const serviceName = props.serviceName;

  const [fetchedData, setFetchedData] = useState<RiskProbConsInterface[]>([]);

  const fetchProbCons = async () => {
    try {
      const data: any[] = await getRiskProbCons(serviceName);

      const mappedData = data.map((item) => ({
        categoryName: item.categoryName,
        probability: item.prob,
        consequence: item.cons,
        newProbability: item.newProb,
        newConsequence: item.newCons,
        totalRisks: item.totalRisks,
      }));
      setFetchedData(mappedData);
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
