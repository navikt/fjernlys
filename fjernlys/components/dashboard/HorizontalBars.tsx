// import * as React from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
// import { motion } from "framer-motion";

// interface HorizontalBarsProps {
//   dataset: any[]; // Adjust the type as per your dataset structure
//   yAxisKey: string;
//   seriesKey: string;
//   seriesLabel: string;
//   xlabel: string;
//   chartSettings?: object; // Adjust the type if you have a specific structure for chartSettings
// }

// const valueFormatter = (value: number | null) => `${value ?? 0}mm`;

// const HorizontalBars: React.FC<HorizontalBarsProps> = ({
//   dataset,
//   yAxisKey,
//   seriesKey,
//   seriesLabel,
//   xlabel,
//   chartSettings = {},
// }) => {
//   const defaultChartSettings = {
//     xAxis: [
//       {
//         label: xlabel,
//       },
//     ],
//     width: 500,
//     height: 400,
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <BarChart
//         dataset={dataset}
//         yAxis={[{ scaleType: "band", dataKey: yAxisKey }]}
//         series={[
//           {
//             dataKey: seriesKey,
//             label: seriesLabel,
//             valueFormatter,
//             customBar: ({ bar }: { bar: any }) => (
//               <motion.rect
//                 x={bar.x}
//                 y={bar.y}
//                 width={bar.width}
//                 height={bar.height}
//                 initial={{ height: 0 }}
//                 animate={{ height: bar.height }}
//                 transition={{ duration: 1.2 }}
//                 fill={bar.fill}
//               />
//             ),
//           },
//         ]}
//         layout="horizontal"
//         {...defaultChartSettings}
//         {...chartSettings}
//       />
//     </motion.div>
//   );
// };

// export default HorizontalBars;
