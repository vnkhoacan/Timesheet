import CsvDownloader from "react-csv-downloader";

interface Props {
  content: any;
  rootData: any;
  fileName: string;
}

const ExportButton: React.FC<Props> = (props: Props) => {
  const convertDataToColumns = (rootData: any): any => {
    var columns: any = [];

    var column: any = rootData[0];

    for (var name in column) {
      columns.push({
        id: name,
        displayName: name,
      });
    }

    return columns;
  };

  return (
    <div>
      <CsvDownloader
        filename={props.fileName}
        extension=".csv"
        columns={convertDataToColumns(props.rootData)}
        datas={props.rootData}
      >{props.content}</CsvDownloader>
    </div>
  );
};

export default ExportButton;
