import React, { useEffect, useState } from "react";
import Dropdown from "../skjema/information/Dropdown";
import { getRiskCategories } from "@/pages/api/getRiskCategories";
import NewHorizontalBar from "./Graphical/NewHorizontalBar";

const VisualizeRiskCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [fetchedData, setFetchedData] = useState<CategoryValues[]>([]);

  interface CategoryValues {
    category: string;
    dependent: number;
    notDependent: number;
    totalRisk: number;
  }

  const fetchCategories = async () => {
    try {
      const data: CategoryValues[] = await getRiskCategories(categoryName);
      setFetchedData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
    // {
    //   dataKey: "totalRisk",
    //   label: "Total Risk",
    //   valueFormatter: (value: number) => `${value}`,
    //   data: category.map((item) => item.totalRisk),
    // },
  ];

  // const dropDownOptions = [
  //   { value: "", label: "Ikke satt" },
  //   {
  //     value: "Stabil drift og måloppnåelse",
  //     label: "Stabil drift og måloppnåelse",
  //   },
  //   { value: "Helse, miljø og sikkerhet", label: "Helse, miljø og sikkerhet" },
  //   {
  //     value: "Personvern og informasjonssikkerhet",
  //     label: "Personvern og informasjonssikkerhet",
  //   },
  //   {
  //     value: "Beredskap og samfunnssikkerhet",
  //     label: "Beredskap og samfunnssikkerhet",
  //   },
  //   { value: "Trygdesvindel", label: "Trygdesvindel" },
  //   { value: "Interne misligheter", label: "Interne misligheter" },
  // ];

  return (
    <>
      {/* <Dropdown
        title={"Kategori"}
        value={categoryName}
        setValue={setCategoryName}
        options={dropDownOptions}
      /> */}
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
