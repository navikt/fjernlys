import React from "react";
import { Bubble } from "react-chartjs-2";
import "chartjs-adapter-moment";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import "chartjs-adapter-moment";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  CategoryScale
);

interface RiskProbConsInterface {
  categoryName: string;
  probability: number;
  consequence: number;
  newProbability: number;
  newConsequence: number;
  totalRisksPerCategory: number;
}

interface BubbleChartProps {
  data: RiskProbConsInterface[];
}

// Predefined pastel colors for each category
const colorMap: { [key: string]: string } = {
  "Stabil drift og måloppnåelse": "hsla(200, 100%, 75%, 0.5)",
  "Beredskap og samfunnssikkerhet": "hsla(50, 100%, 75%, 0.5)",
  "Personvern og informasjonssikkerhet": "hsla(100, 100%, 75%, 0.5)",
  "Helse, miljø og sikkerhet": "hsla(150, 100%, 75%, 0.5)",
  Trygdesvindel: "hsla(250, 100%, 75%, 0.5)",
  "Interne misligheter": "hsla(300, 100%, 75%, 0.5)",
};

const RiskBubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: "",
        data: data.map((item) => ({
          x: item.probability,
          y: item.consequence,
          r: item.totalRisksPerCategory * 5,
        })),
        backgroundColor: data.map((item) => colorMap[item.categoryName]),
        borderColor: data.map((item) =>
          colorMap[item.categoryName]?.replace("0.5", "1")
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Risiko sannsynlighet og konsekvens",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const dataIndex = context.dataIndex;
            const item = data[dataIndex];
            return `${item.categoryName}: Antall: ${item.totalRisksPerCategory}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Sannsynlighet",
        },
        min: 0,
        max: 5,
      },
      y: {
        title: {
          display: true,
          text: "Konsekvens",
        },
        min: 0,
        max: 5,
      },
    },
  };

  return (
    <div style={{ width: "800px", height: "600px" }}>
      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default RiskBubbleChart;
