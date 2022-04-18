import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import { useState } from "react";

interface Props {
  isChanged: boolean;
  error: string;
  clickCheck:any;
  clickClose:any;
}

const ValidationIcon: React.FC<Props> = (props: Props) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  function showInvalidMessage(): void {
    setIsShown(true);
    console.log(isShown);
  }

  function hideInvalidMessage(): void {
    setIsShown(false);
  }

  if (props.isChanged) 
  {
    return (
      <>
        <div
          style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
          className="absolute-position"
        >
          {props.error ? (
            <WarningIcon
              onClick={props.clickClose}
              onMouseOver={showInvalidMessage}
              onMouseOut={hideInvalidMessage}
              sx={{ color: "orange" }}
            />
          ) : (
            <CheckIcon onClick={props.clickCheck} sx={{ color: "green" }} />
          )}
        </div>
        {props.error && isShown ? (
          <div
            className="absolute-position base-box-shadow px-3 py-1 base-radius light-color medium-font-size"
            style={{
              width: "100%",
              bottom: "30px",
              right: "0",
              background: "white",
              fontSize: "13px",
              zIndex:5
            }}
          >
            {props.error}
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
  return <></>;
};

export default ValidationIcon;
