import { Pie } from "react-chartjs-2";

interface Props
{
  ds1:any;
  ds2:any;
  ds1Name:string;
  ds2Name:string;
}

const PieChart: React.FC<Props> = (props:Props) => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const data: any = {
    labels: [props.ds1Name, props.ds2Name],
    datasets: [
      {
        label: "# of Votes",
        data: [props.ds1, props.ds2],
        backgroundColor: [
          "#252f3e",
          "#22d3ee",
        ],
        borderColor: [
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return <Pie options={options} data={data} />;
};

export default PieChart;
