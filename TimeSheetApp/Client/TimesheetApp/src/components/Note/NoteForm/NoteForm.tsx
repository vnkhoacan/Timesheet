// components
import TransparentTextInput from "../../FormValidation/NoLabel/TransparentTextInput/TransparentTextInput";
import TransparentTextArea from "../../FormValidation/NoLabel/TransparentTextArea/TransparentTextArea";

// stylesheet
import "./NoteForm.css";
import { Button } from "@mui/material";
import DateConverter from "../../../services/Date/DateConverter";

interface Props {
  title: string;
  note_content: string;
  closeNoteForm: any;
  handleChange: any;
  saveNote:any;
}

const NoteForm: React.FC<Props> = (props: Props) => {
  return (
    <div className="note-form">
      <div
        style={{ position: "relative" }}
        className="m-auto note-form_container"
      >
        <i
          onClick={() => props.closeNoteForm()}
          style={{ position: "absolute", top: "5px", right: "5px", zIndex: 1 , fontSize:"20px" }}
          className="material-icons pointer-cursor"
        >
          close
        </i>
        

        <TransparentTextInput
          regex={/^[A-Za-z\d]{3,}$/}
          errorMessage="Title must contain minimum 3 characters"
          handleChange={(e: any) => props.handleChange(e.target.value, "title")}
          defaultValue={props.title}
          isRequired={true}
          isSubmited={false}
          placeholder="Title"
        />

        <TransparentTextArea
          regex={/^[A-Za-z\d\s]{3,}$/}
          errorMessage="Content must contain minimum 3 characters"
          handleChange={(e: any) => props.handleChange(e.target.value, "note_content")}
          defaultValue={props.note_content}
          isRequired={true}
          isSubmited={false}
          placeholder="Content"
        />

        <div onClick={()=>props.saveNote()} className="d-flex justify-content-end">
          <Button variant="contained"> Save</Button>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
