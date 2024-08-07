import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js/auto";
import { useEffect, useState } from "react";
import { getRiskLevels } from "@/pages/api/getRiskLevels";
import router from "next/router";
import styles from "@/styles/dashboard/doughnut.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface RiskLevels {
  serviceName: string;
  high: number;
  moderate: number;
  low: number;
}

interface Props {
  serviceName: string;
  labelName: string;
}

function VisualizeRiskLevel({ serviceName, labelName }: Props) {
  const [riskLevels, setRiskLevels] = useState<RiskLevels>({
    serviceName: "",
    low: 0,
    moderate: 0,
    high: 0,
  });

  useEffect(() => {
    const fetchRiskLevels = async () => {
      try {
        setRiskLevels(await getRiskLevels(serviceName));
      } catch (error: any) {
        if (error instanceof Error) {
          if (error.message === "Not Found") {
            router.push("/404");
          } else if (error.message === "Internal Server Error") {
            router.push("/500");
          } else {
            // Handle other errors or show a generic error message
            router.push("/404");
          }
        } else {
          router.push("/404");
        }
      }
    };

    fetchRiskLevels();
  }, [serviceName]);

  const cssVar = (variable: string) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
    }
    return "";
  };

  const data = {
    labels: ["Lav", "Moderat", "Høy"],
    datasets: [
      {
        data: [riskLevels.low, riskLevels.moderate, riskLevels.high],
        label: " Antall tilfeller",

        backgroundColor: [
          cssVar("--a-green-300"),
          cssVar("--a-orange-300"),
          cssVar("--a-red-400"),
        ],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 4,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        font: {
          size: 20,
        },
        text: labelName,
        color: "black",
      },
    },
    layout: {
      padding: {
        bottom: 5,
      },
    },
    animation: { duration: 2500 },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
}
export default VisualizeRiskLevel;
