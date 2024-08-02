import React, { useCallback, useEffect, useState } from "react";
import { getRiskCategories } from "@/pages/api/getRiskCategories";
import NewHorizontalBar from "./NewHorizontalBar";

const VisualizeRiskCategory = () => {
  const [fetchedData, setFetchedData] = useState<CategoryValues[]>([]);

  interface CategoryValues {
    category: string;
    dependent: number;
    notDependent: number;
    totalRisk: number;
  }

  const fetchCategories = useCallback(async () => {
    try {
      const data: CategoryValues[] = await getRiskCategories();
      setFetchedData(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Transform data for the bar chart
  const yAxisData = fetchedData.map((item) => item.category);
  const seriesData = [
    {
      dataKey: "dependent",
      label: "Avhengig",
      valueFormatter: (value: number) => `${value}`,
      data: fetchedData.map((item) => item.dependent),
    },
    {
      dataKey: "notDependent",
      label: "Ikke-avhengig",
      valueFormatter: (value: number) => `${value}`,
      data: fetchedData.map((item) => item.notDependent),
    },
  ];

  return (
    <>
      <div>
        <NewHorizontalBar
          xAxisData={yAxisData}
          seriesData={seriesData}
          width={500}
          height={300}
          layout="horizontal"
        />
      </div>
    </>
  );
};

export default VisualizeRiskCategory;
