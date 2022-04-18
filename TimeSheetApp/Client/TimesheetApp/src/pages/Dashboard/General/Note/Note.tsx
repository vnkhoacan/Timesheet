// components
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoteForm from "../../../../components/Note/NoteForm/NoteForm";
import NoteItem from "../../../../components/Note/NoteItem/NoteItem";
import HttpClient from "../../../../services/HttpClient/HttpClient";

// stylesheet
import "./Note.css";

const Note: React.FC = () => {
  const [notes, setNotes] = useState<any>([]);

  const [defaultNotes, setDefaultNotes] = useState<any>([]);

  const [noteDetail, setNoteDetail] = useState<any>({});

  const [noteIndex, setNoteIndex] = useState<number>(-1);

  const [isShownNoteForm, setIsShownNoteForm] = useState<boolean>(false);

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const isLogedIn = useSelector((s: any) => s.isLogedIn);

  const openNoteForm = (): void => {
    setIsShownNoteForm(true);
  };

  const closeNoteForm = (): void => {
    setIsShownNoteForm(false);
  };

  const openNoteFormFromItem = (note: any, index: number): void => {
    setNoteDetail(note);
    openNoteForm();
    setNoteIndex(index);
  };

  const handleChange = (value: any, name: string): void => {
    noteDetail[name] = value;
    console.log(noteDetail);
    setNoteDetail(noteDetail);
  };

  const addNote = async (): Promise<void> => {
    console.log({
      title: noteDetail.title,
      note_content: noteDetail.note_content,
      member_id: memberInfo.member_id,
    });
    if (noteDetail.title && noteDetail.note_content) {
      var note: any = {
        title: noteDetail.title,
        note_content: noteDetail.note_content,
        member_id: memberInfo.member_id,
      };
      var result = await HttpClient.post("Note/AddNote", note);

      note.note_id = result;

      var newNotes = [...notes];
      newNotes.push(note);

      setDefaultNotes(newNotes);
      setNotes(newNotes);
      setIsShownNoteForm(false);
    }
  };

  const editNote = async (): Promise<void> => {
    if (noteDetail.title && noteDetail.note_content) {
      var note = {
        note_id: noteDetail.note_id,
        title: noteDetail.title,
        note_content: noteDetail.note_content,
      };

      var result = await HttpClient.post("Note/EditNote", note);

      var newNotes = [...notes];
      newNotes[noteIndex] = note;

      setDefaultNotes(newNotes);
      setNotes(newNotes);
      setIsShownNoteForm(false);
    }
  };

  const deleteNote = async (note_id: string, index: number): Promise<void> => {
    await HttpClient.post("Note/DeleteNote", { note_id: note_id });

    var newNotes = [...notes];

    newNotes = newNotes.filter((note: any, nIndex: number) => nIndex !== index);

    setNotes(newNotes);
    setDefaultNotes(newNotes);
  };

  const saveNote = async (): Promise<void> => {
    if (noteIndex >= 0) editNote();
    else addNote();
  };

  const searchNote = async (title: string): Promise<void> => {
    if (title) {
      var newNotes = [...notes];

      newNotes = newNotes.filter(
        (note: any) =>
          note.title.toUpperCase().indexOf(title.toUpperCase()) >= 0
      );

      setDefaultNotes(newNotes);
    } else setDefaultNotes(notes);
  };

  const loadNote = async (): Promise<void> => {
    if (isLogedIn) {
      var result = await HttpClient.post("Note/LoadNote", {
        member_id: memberInfo.member_id,
      });
      setNotes(result);
      setDefaultNotes(result);
    }
  };

  const bindByColumn = (col: number,countNumber:number) => {
    var count = col;
    return defaultNotes.map((note: any, index: number) => {
      const openNoteDetail = (): void => {
        openNoteFormFromItem(note, index);
      };

      if (index === count) {
        count += countNumber;
        return (
          // {"note_container-item"+(defaultNotes.length >= 5 ? "" : "me-3")}
          <div className={"note_container-item"}>
            <NoteItem
              key={index}
              title={note.title}
              content={note.note_content}
              remind_date={note.remind_date}
              openNoteDetail={openNoteDetail}
              deleteNote={() => deleteNote(note.note_id, index)}
            />
          </div>
        );
      }
      return "";
    });
  };

  const bindNotes = () => {
    if (window.innerWidth > 1700) {
      return (
        <>
          <div className="w-25">{bindByColumn(0,5)}</div>
          <div className="w-25">{bindByColumn(1,5)}</div>
          <div className="w-25">{bindByColumn(2,5)}</div>
          <div className="w-25">{bindByColumn(3,5)}</div>
          <div className="w-25">{bindByColumn(4,5)}</div>
        </>
      );
    }
    if (window.innerWidth > 1000) {
      return (
        <>
          <div className="w-25">{bindByColumn(0,4)}</div>
          <div className="w-25">{bindByColumn(1,4)}</div>
          <div className="w-25">{bindByColumn(2,4)}</div>
          <div className="w-25">{bindByColumn(3,4)}</div>
        </>
      );
    }
    if(window.innerWidth <= 500)
    {
      return (
        <>
          <div className="w-50">{bindByColumn(0,2)}</div>
          <div className="w-50">{bindByColumn(1,2)}</div>
        </>
      );
    }
    return "";
  };

  useEffect(() => {
    loadNote();
  }, [isLogedIn]);

  return (
    <>
      {isShownNoteForm ? (
        <NoteForm
          title={noteDetail.title}
          note_content={noteDetail.note_content}
          closeNoteForm={closeNoteForm}
          handleChange={handleChange}
          saveNote={saveNote}
        />
      ) : (
        ""
      )}
      <div className="note">
        <div className="search-note">
          <div className="search-bar">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#94A3B8"
                height="20px"
                width="20px"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="text">
              <input
                onChange={(e: any) => searchNote(e.target.value)}
                className="input"
                type="text"
                placeholder="Search notes"
              />
            </div>
          </div>
          <button
            onClick={() => {
              openNoteForm();
              setNoteDetail({});
              setNoteIndex(-1);
            }}
            className="new-note"
          >
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#fff"
                height="20px"
                width="20px"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span>New note</span>
          </button>
        </div>
        {/* {"note-container"+(defaultNotes.length >= 5 ? " justify-content-between" : "")} */}
        <div className={"note-container"}>
          {bindNotes()}
          {/* {defaultNotes.map((note: any, index: number) => {
            const openNoteDetail = (): void => {
              openNoteFormFromItem(note, index);
            };
            return (
              // {"note_container-item"+(defaultNotes.length >= 5 ? "" : "me-3")}
              <div className={"note_container-item"}>
                <NoteItem
                  key={index}
                  title={note.title}
                  content={note.note_content}
                  remind_date={note.remind_date}
                  openNoteDetail={openNoteDetail}
                  deleteNote={() => deleteNote(note.note_id, index)}
                />
              </div>
            );
          })} */}
        </div>
      </div>
    </>
  );
};

export default Note;
