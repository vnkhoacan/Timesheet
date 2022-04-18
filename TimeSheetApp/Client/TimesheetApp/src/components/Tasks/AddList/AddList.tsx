// stylesheet
import "./AddList.css";

interface Props
{
  openAddForm:any;
}

const AddList: React.FC<Props> = (props:Props) => {
  return (
    <div onClick={props.openAddForm} className="add-list-btn ms-4">
      <i className="bx bxs-plus-circle me-2" style={{ color: "#f13a06" }} />
      <span>Add a list</span>
    </div>
  );
};

export default AddList;
