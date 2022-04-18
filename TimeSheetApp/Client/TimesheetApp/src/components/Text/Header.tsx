interface Props {
  title: string;
}

const Header: React.FC<Props> = (props: Props) => {
  return (
    <div style={{ background: "#1e293b" }} className="light-bg p-4">
      <h1 style={{ color: "white" }} className="m-0">
        {props.title}
      </h1>
    </div>
  );
};

export default Header;
