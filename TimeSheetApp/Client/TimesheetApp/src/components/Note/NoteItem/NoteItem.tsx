import { useEffect, useState } from "react";
import Alert_YESNO from "../../Alert/ButtonAlert/Alert_YESNO/Alert_YESNO";

interface Props {
  title: string;
  content: string;
  remind_date: string;
  openNoteDetail: any;
  deleteNote: any;
}

const NoteItem: React.FC<Props> = (props: Props) => {
  const TAGS = ["Tasks", "Family", "Priority", "Personal", "Friend"];
  const [tags, setTags] = useState<any>([]);

  const generateTags = (): void => {
    var max = 3,
      arr = [];

    var tagsNumber = parseInt((Math.random() * max).toFixed(0)) + 1;

    for (var i = 0; i < tagsNumber; i++) {
      var tagsIndex = parseInt((Math.random() * max).toFixed(0));
      arr.push(TAGS[tagsIndex]);
    }

    setTags(arr);
  };

  useEffect(() => {
    generateTags();
  }, []);

  return (
    <div className="note-details relative-position">
      <div
        style={{ top: "20px", right: "10px" }}
        className="absolute-position light-color d-flex"
      >
        <div>
          <i
            style={{ fontSize: "20px" }}
            onClick={() => props.openNoteDetail()}
            className="material-icons"
          >
            edit
          </i>
        </div>
        <div className="relative-position">
          <i style={{ fontSize: "20px" }} className="material-icons">
            delete_outline
          </i>
          <Alert_YESNO
            header="Message"
            message="Do you want to delele this note ?"
            yesText="Ok"
            yesFunction={() => props.deleteNote()}
            noText="Cancel"
            noFunction={() => {}}
          />
        </div>
      </div>
      <div className="title">{props.title}</div>
      <div className="content"> {props.content} </div>
      <div className="tags">
        {tags.map((value: any) => {
          return <div className="sub-tags"> {value} </div>;
        })}
      </div>
    </div>
  );
};

export default NoteItem;
