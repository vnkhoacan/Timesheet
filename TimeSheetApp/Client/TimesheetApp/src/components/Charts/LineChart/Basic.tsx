import { Line } from "react-chartjs-2";
//--------------------------------------------------------------
//--------------------------------------------------------------
interface Props {
  ds: any;
  dsName: string;
  labels: any;
  color: string;
}
//--------------------------------------------------------------
//--------------------------------------------------------------
const LineChart: React.FC<Props> = (props: Props) => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.dsName,
        data: props.ds,
        fill: true,
        backgroundColor: props.color,
        borderColor: props.color,
        tension: 0.3,
      },
    ],
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
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
        radius: 0,
      },
    },
    pointDotRadius:5 ,
    pointDotStrokeWidth: 8,
    pointHitDetectionRadius: 20,
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return <Line data={data} options={options} />;
};

export default LineChart;
