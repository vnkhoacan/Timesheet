import Button from "@mui/material/Button/Button";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NativeStorage from "../../../services/NativeStorage/NativeStorage";
import "./ProjectItem.css";
//--------------------------------------------------------------
//--------------------------------------------------------------
interface Props {
  project_id: string;
  project_name: string;
  name: string;
  url: string;
}
//--------------------------------------------------------------
//--------------------------------------------------------------
const ProjectItem: React.FC<Props> = (props: Props) => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const dispatch = useDispatch();
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const saveProjectID = async (): Promise<void> => {
    await NativeStorage.set("project_id", props.project_id);
    dispatch({
      type: "SET_STATE",
      payload: {
        project_id: props.project_id,
      },
    });
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <div
      style={{ borderRadius: "5px", color: "white" }}
      className="row m-0 mb-3 project-item"
    >
      <div className="col-9">
        <h4 className="mt-0">Project Name : {props.project_name}</h4>
        <p style={{fontSize:"14px",color:"#747d8c"}} className="m-0">{props.name}</p>
      </div>
      <div
        onClick={saveProjectID}
        className="d-flex align-items-center col-3 justify-content-end"
      >
        <Button variant="contained">
          <Link style={{ color: "white" }} className="base-link" to={props.url}>
            Join
          </Link>
        </Button>
      </div>
    </div>
  );
};
//--------------------------------------------------------------
//--------------------------------------------------------------
export default ProjectItem;
