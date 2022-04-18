interface Props {
    color:string;
    name:string;
}

const Priority: React.FC<Props> = (props:Props) => {
  return (
    <div className="pe-1">
      <div
        className="py-1 px-2"
        style={{
          color: "white",
          background: props.color,
          borderRadius: "15px",
          fontSize: "13px",
        }}
      >
        {props.name}
      </div>
    </div>
  );
};

export default Priority;
