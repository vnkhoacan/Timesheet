import { Line } from "react-chartjs-2";

interface Props {
  ds1: any;
  dsName1: string;
  ds2: any;
  dsName2: string;
  ds3: any;
  dsName3: string;
  labels: any;
}

const LineChart: React.FC<Props> = (props: Props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.dsName1,
        data: props.ds1,
        fill: true,
        backgroundColor: "#252f3e",
        //borderColor: props.color,
        tension: 0.3,
      },
      {
        label: props.dsName2,
        data: props.ds2,
        fill: true,
        backgroundColor: "#22d3ee",
        //borderColor: props.color,
        tension: 0.3,
      },
      {
        label: props.dsName3,
        data: props.ds3,
        fill: true,
        backgroundColor: "rgb(245, 158, 11)",
        //borderColor: props.color,
        tension: 0.3,
      },
    ],
  };

  const options: any = {
    responsive: true,
    scaleBeginAtZero: true,
    maintainAspectRatio: false,
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
        display: false, // Hide X axis labels
      },
    },
    elements: {
      point: {
        radius: 3,
      },
    },
    pointDotRadius: 5,
    pointDotStrokeWidth: 8,
    pointHitDetectionRadius: 20,
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
