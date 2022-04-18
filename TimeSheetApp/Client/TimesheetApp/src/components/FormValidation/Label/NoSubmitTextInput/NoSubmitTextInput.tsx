interface Props {
  label: string;
  value: string;
}

const NoSubmitTextInput: React.FC<Props> = (props: Props) => {
  return (
    <div className="mb-3">
      <label className="form-label">{props.label}</label>
      <input
        type="email"
        className="form-control"
        disabled
        value={props.value}
      />
    </div>
  );
};

export default NoSubmitTextInput;
