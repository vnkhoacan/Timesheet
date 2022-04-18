import { Line } from "react-chartjs-2";
interface Props {
  labels: any;
  datasets: any;
}

const MultiAxisLine: React.FC<Props> = (props: Props) => {
  const data = {
    labels: props.labels,
    datasets: props.datasets,
  };

  const options: any = {
    responsive: true,
    scaleBeginAtZero: true,
    maintainAspectRatio: false,
    // plugins: {
    //   legend: false, // Hide legend
    // },
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
        radius: 0,
      },
      line: {
        tension: 0.3,
      },
    },
    pointDotRadius: 5,
    pointDotStrokeWidth: 8,
    pointHitDetectionRadius: 20,
  };

  return <Line data={data} options={options} />;
};

export default MultiAxisLine;
