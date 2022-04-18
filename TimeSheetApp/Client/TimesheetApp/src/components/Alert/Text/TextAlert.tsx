import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props{
  severity:any;
  error:any;
}

const TextAlert: React.FC<Props> = (props: Props) => {
  return (
    <Alert className="mb-3" severity={props.severity}>
      {props.error}
    </Alert>
  );
};
export default TextAlert;
