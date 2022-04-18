// components
import Draft, { htmlToDraft } from "react-wysiwyg-typescript";
import TextInput from "../../FormValidation/NoLabel/TextInput/TextInput";
import AutoCompleteMulti from "../../FormValidation/NoLabel/AutoCompleteMulti/AutoCompleteMulti";
import { Button } from "@mui/material";
// modules
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HttpClient from "../../../services/HttpClient/HttpClient";
// stylesheet
import "./MailForm.css";

import EmailItem from "../EmailItem/EmailItem";

interface Props {
  closeMailForm: any;
}

const MailForm: React.FC<Props> = (props: Props) => {
  const [mail, setMail] = useState<any>({});

  const [members, setMembers] = useState<any>([]);

  const [receivers, setReceivers] = useState<any>({
    bcc: [],
    cc: [],
    main: [],
  });

  const [memberByOrganizationEmail, setMemberByOrganizationEmail] =
    useState<any>([]);

  const socket = useSelector((s: any) => s.socket);

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const [content, setContent] = useState<any>(htmlToDraft(""));

  const handleChange = (value: any, name: string): void => {
    var newMail = { ...mail };
    newMail[name] = value;
    setMail(newMail);
  };

  const handleChangeValue = (values: any, type: string): void => {
    var newValues = [...values];
    for (var i in newValues) newValues[i].mail_type = type;
    var newMembers = [...members, ...newValues];
    setMembers(newMembers);
    if (type === "main") filterMember(["cc", "bcc"], newMembers);
    if (type === "cc") filterMember(["main", "bcc"], newMembers);
    if (type === "bcc") filterMember(["cc", "main"], newMembers);
  };

  const sendMail = (): void => {
    var newMail = { ...mail };
    //newMail.content = newMail.content.replaceAll('"',"'");
    newMail.members = members;
    newMail.member_id = memberInfo.member_id;
    newMail.member_name = memberInfo.first_name + ' ' + memberInfo.last_name;
    newMail.avatar = memberInfo.avatar;
    newMail.created_on = new Date().toString();
    newMail.is_read = false;
    props.closeMailForm();
    socket.emit("SendMail", newMail);
  };

  const loadMemberByOrganizationEmail = async (): Promise<void> => {
    var result = await HttpClient.post("User/LoadMemberByOrganizationEmail", {
      member_id: memberInfo.member_id,
    });
    setMemberByOrganizationEmail(result);
    setReceivers({
      bcc: result,
      cc: result,
      main: result,
    });
  };

  const filterMember = (typeMails: any, unrenderedMembers: any): any => {
    var newReceivers: any = { ...receivers };
    typeMails.map((value: any) => {
      var newMembers = memberByOrganizationEmail.filter((member: any) =>
        !unrenderedMembers.some((m: any) => m.member_id === member.member_id)
      );
      newReceivers[value] = newMembers;
    });
    
    setReceivers(newReceivers);
  };

  useEffect(() => {
    loadMemberByOrganizationEmail();
  }, []);

  return (
    <div className="mail-form">
      <div className="mail-form_header d-flex justify-content-between">
        <span>New Mail</span>
        <i
          onClick={() => props.closeMailForm()}
          className="material-icons-outlined pointer-cursor"
        >
          close
        </i>
      </div>
      <div className="mail-form_body">
        <AutoCompleteMulti
          errorMessage=""
          handleChange={(values: any) => {
            handleChangeValue(values, "main");
          }}
          defaultValue={mail.receiver}
          isRequired={true}
          isSubmited={false}
          options={receivers.main}
          getOptionLabel={(option: any) => option.email}
          placeholder="To"
        />
        <AutoCompleteMulti
          errorMessage=""
          handleChange={(values: any) => {
            handleChangeValue(values, "cc");
          }}
          defaultValue={mail.cc}
          isRequired={true}
          isSubmited={false}
          options={receivers.cc}
          getOptionLabel={(option: any) => option.email}
          placeholder="CC"
        />
        <AutoCompleteMulti
          errorMessage=""
          handleChange={(values: any) => {
            handleChangeValue(values, "bcc");
          }}
          defaultValue={mail.bcc}
          isRequired={true}
          isSubmited={false}
          options={receivers.bcc}
          getOptionLabel={(option: any) => option.email}
          placeholder="BCC"
        />
        <TextInput
          defaultValue=""
          errorMessage="Email is invalid. Ex : viet@gmail.com."
          placeholder="Title"
          regex={/^[A-Za-z\d\s]{3,}$/}
          isRequired={true}
          handleChange={(e: any) => handleChange(e.target.value, "title")}
          isSubmited={false}
        />
        <Draft
          editorState={content}
          onEditorStateChange={(editorState) => {
            var mailContent: any = document.getElementsByClassName(
              "react-wysiwyg-typescript-editor"
            )[0];
            setContent(editorState);
            handleChange(mailContent.innerHTML, "content");
          }}
        />
        <Button onClick={sendMail} className="mt-3" variant="contained">
          Send
        </Button>
      </div>
    </div>
  );
};

export default MailForm;
