import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import CloseIcon from "@mui/icons-material/Close";
import "./ImgDetail.css";
import { useState } from "react";
//--------------------------------------------------------------
//--------------------------------------------------------------
interface Props {
  src: string;
  siStyle: any;
  biStyle: any;
  type: string;
}
//--------------------------------------------------------------
//--------------------------------------------------------------
const ImgDetail: React.FC<Props> = (props: Props) => {
  const [isHidden, setIsHidden] = useState(true);
  const HOST_NAME = "http://localhost:5000/";
  return (
    <div className="img-detail mb-3">
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
      <span
        onClick={() => {
          setIsHidden(false);
        }}
      >
        <ZoomOutMapIcon style={{ width: "12px", height: "12px" }} />
      </span>
      <img
        style={props.siStyle}
        src={props.type === "client" ? props.src : HOST_NAME + props.src}
      />
    </div>
  );
};

export default ImgDetail;
