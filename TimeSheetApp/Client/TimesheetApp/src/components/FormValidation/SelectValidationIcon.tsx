import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import { useState } from "react";

interface Props {
  isChanged: boolean;
  error: string;
}

const SelectValidationIcon: React.FC<Props> = (props: Props) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  function showInvalidMessage(): void {
    setIsShown(true);
    console.log(isShown);
  }

  function hideInvalidMessage(): void {
    setIsShown(false);
  }

  if (props.isChanged) {
    return (
      <>
        <div
          style={{ top: "50%", right: "30px", transform: "translateY(-50%)" }}
          className="absolute-position"
        >
          {props.error ? (
            <WarningIcon
              onMouseOver={showInvalidMessage}
              onMouseOut={hideInvalidMessage}
              sx={{ color: "orange" }}
            />
          ) : (
            <CheckIcon sx={{ color: "green" }} />
          )}
        </div>
        {props.error && isShown ? (
          <div
            className="absolute-position base-box-shadow px-3 py-1 base-radius light-color"
            style={{
              width: "100%",
              bottom: "30px",
              right: "0",
              background: "white",
              fontSize: "15px",
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

export default SelectValidationIcon;
