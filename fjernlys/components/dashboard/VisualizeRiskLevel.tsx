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

ChartJS.register(ArcElement, Tooltip, Legend);

function VisualizeRiskLevel() {
  const cssVar = (variable: string) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
    }
    return "";
  };

  const data = {
    labels: ["Høy", "Middels", "Lav"],
    datasets: [
      {
        data: [32, 56, 56],
        label: " Antall tilfeller",

        backgroundColor: [
          cssVar("--a-red-400"),
          cssVar("--a-orange-300"),
          cssVar("--a-green-300"),
        ],
        borderColor: [
          cssVar("--a-red-500"),
          cssVar("--a-orange-400"),
          cssVar("--a-green-400"),
        ],
        borderWidth: 1,
        hoverOffset: 8,
        spacing: 3,
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
        text: "Alle tjenester/ytelser",
        color: "black",
      },
    },
    layout: {
      padding: {
        bottom: 5,
      },
    },
  };

  return (
    <div style={{ height: "250px", margin: "32px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
export default VisualizeRiskLevel;
