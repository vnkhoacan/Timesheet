import React from "react";
import { Bar } from "react-chartjs-2";

interface Props {
  ds1Name: string;
  ds2Name: string;
  ds3Name: string;
  ds1: string;
  ds2: string;
  ds3: string;
}

const BaseGroupedBar: React.FC<Props> = (props: Props) => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const data: any = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: props.ds1Name,
        data: props.ds1,
        backgroundColor: "#252f3e",
      },
      {
        label: props.ds2Name,
        data: props.ds2,
        backgroundColor: "#22d3ee",
      },
      {
        label: props.ds3Name,
        data: props.ds3,
        backgroundColor: "rgb(245, 158, 11)",
      },
    ],
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const options: any = {
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      y: {
        min: 0,
        grid: {
          display: false,
        },
      },
      x: {
        display: true, // Hide X axis labels
        grid: {
          display: false,
        },
      },
    },
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return <Bar data={data} options={options} />;
};

export default BaseGroupedBar;
