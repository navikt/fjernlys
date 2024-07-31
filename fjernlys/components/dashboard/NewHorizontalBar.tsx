import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { motion } from "framer-motion";

interface NewHorizontalBarProps {
  xAxisData: string[];
  seriesData: { label: string; data: number[] }[];
  width: number;
  height: number;
  layout?: "horizontal" | "vertical";
}

const NewHorizontalBar: React.FC<NewHorizontalBarProps> = ({
  xAxisData = [],
  seriesData,
  width,
  height,
  layout = "vertical",
}) => {
  const xAxis =
    layout === "vertical"
      ? [{ scaleType: "band", data: xAxisData }]
      : [{ scaleType: "linear" }];

  const yAxis =
    layout === "horizontal"
      ? [{ scaleType: "band", data: xAxisData }]
      : [{ scaleType: "linear" }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0 }}
    >
      <BarChart
        xAxis={xAxis}
        yAxis={yAxis}
        series={seriesData.map((series) => ({
          label: series.label,
          data: series.data,
        }))}
        width={width}
        height={height}
        layout={layout}
      />
    </motion.div>
  );
};

export default NewHorizontalBar;
