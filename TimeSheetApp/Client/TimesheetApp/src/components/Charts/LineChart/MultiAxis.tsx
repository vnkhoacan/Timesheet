import { Line } from "react-chartjs-2";
//--------------------------------------------------------------
//--------------------------------------------------------------
interface Props {
  ds1: any;
  ds2: any;
  ds1Name: string;
  ds2Name: string;
  labels:any;
}
//--------------------------------------------------------------
//--------------------------------------------------------------
const MultiAxisLine: React.FC<Props> = (props: Props) => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.ds1Name,
        data: props.ds1,
        fill: true,
        
        // 666d77
        backgroundColor: "#252f3e",
        borderColor: "#252f3e",
      },
      {
        label: props.ds2Name,
        data:  props.ds2,
        fill: true,

        
        //35b4ca
        backgroundColor: "#22d3ee",
        borderColor: "#22d3ee",
      },
    ],
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const options: any = {
    scales: {
      yAxes: [
        {
          display: true,
          position: 'left',
          id: 'y-axis-1',
        },
        {
          display: true,
          position: 'right',
          id: 'y-axis-2',
        },
      ],
    },
    elements: {
      point: {
        radius: 0.3,
      },
    },
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return <Line data={data} options={options} />;
};

export default MultiAxisLine;
