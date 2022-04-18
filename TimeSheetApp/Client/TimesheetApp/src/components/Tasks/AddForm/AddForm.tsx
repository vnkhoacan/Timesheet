// stylesheet
import { useState } from "react";
import "./AddForm.css";

interface Props {
  closeAddForm: any;
  addItem: any;
  title: string;
  style: any;
}

const ListTitle: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState<string>("");
  return (
    <div style={props.style} className="list-title">
      <div className="relative-position mb-2">
        <input
          className="title-input w-100"
          type="text"
          placeholder={props.title}
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
        />
        <i
          onClick={props.closeAddForm}
          style={{
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            fontSize: "17px",
            cursor: "pointer",
          }}
          className="material-icons-outlined absolute-position"
        >
          close
        </i>
      </div>
      <button
        onClick={() => {
          props.addItem(value);
        }}
        className="add-title"
      >
        Add
      </button>
    </div>
  );
};

export default ListTitle;
