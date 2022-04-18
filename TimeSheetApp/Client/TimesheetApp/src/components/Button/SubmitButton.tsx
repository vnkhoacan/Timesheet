import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface Props
{
    hasLoaded:any;
    text:any;
}

const SubmitButton: React.FC<Props> = (props: Props) => {
  return (
    <Button
      //onClick={authenticate}
      variant="contained"
      className="w-100"
      type="submit"
    >
      {props.hasLoaded ? (
        props.text
      ) : (
        <CircularProgress size={28} color="inherit" />
      )}
    </Button>
  );
};

export default SubmitButton;
