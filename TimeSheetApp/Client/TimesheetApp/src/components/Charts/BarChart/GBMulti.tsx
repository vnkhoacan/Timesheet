import React from "react";
import { Bar } from "react-chartjs-2";

interface Props {
  labels:any;
  datasets:any;
}

const BaseGroupedBar: React.FC<Props> = (props: Props) => {

  const data: any = {
    labels: props.labels,
    datasets: props.datasets,
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: false, // Hide legend
    },
    
    scales: {
      y: {
        min: 0,
        grid: {
          display: false,
        },
      },
      x: {
        maxBarThickness: 8,
        display: true, // Hide X axis labels
        grid: {
          display: false,
        },
      },
    },
  };
  
  return <Bar data={data} options={options} />;
};

export default BaseGroupedBar;
