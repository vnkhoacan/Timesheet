// components
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import CloseIcon from "@mui/icons-material/Close";

// module
import HOST_NAME from "../../../models/HostName/HostName";
import { useState } from "react";

//stylesheet
import "./ImageDetail.css";

interface Props {
  src: string;
  siStyle: any;
  biStyle: any;
  type: string;
}

const ImageDetail: React.FC<Props> = (props: Props) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isShownZoom, setIsShownZoom] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsShownZoom(true);
        console.log(isShownZoom);
      }}
      onMouseLeave={() => {
        setIsShownZoom(false);
      }}
      className="img-detail mb-3"
    >
      {isHidden ? (
        ""
      ) : (
        <div className="zoom-in">
          <span
            onClick={() => {
              setIsHidden(true);
            }}
          >
            <CloseIcon />
          </span>
          <img
            style={props.biStyle}
            src={props.type === "client" ? props.src : HOST_NAME + props.src}
          />
        </div>
      )}
      <img
        style={props.siStyle}
        src={props.type === "client" ? props.src : HOST_NAME + props.src}
      />
      {isShownZoom ? (
        <div
          onClick={() => {
            setIsHidden(false);
          }}
          className="box"
        >
          <ZoomOutMapIcon style={{ width: "30px", height: "30px" }} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ImageDetail;
