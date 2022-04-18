// modules
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// components

import DefaultMail from "../../../../components/Mail/DefaultMail/DefaultMail";
import ListMail from "../../../../components/Mail/ListMail/ListMail";
import MailDetail from "../../../../components/Mail/MailDetail/MailDetail";
import MailForm from "../../../../components/Mail/MailForm/MailForm";
import Sidebar from "../../../../components/Mail/Sidebar/Sidebar";
import HttpClient from "../../../../services/HttpClient/HttpClient";

// stylesheet
import "./Mailbox.css";

const Mailbox: React.FC = () => {
  const [mails, setMails] = useState<any>([]);

  const [mailIndex, setMailIndex] = useState<number>(-1);

  const mail = useSelector((s: any) => s.mail);

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const [isShownMailForm, setIsShownMailForm] = useState<boolean>(false);

  const [mailDetail, setMailDetail] = useState<any>({});

  const [isShownMailDetail, setIsShownMailDetail] = useState<boolean>(false);

  const [isShownSidebar, setIsShownSidebar] = useState<boolean>(true);

  const [mailType, setMailType] = useState<string>("inbox");

  const isMobile = window.innerWidth < 800;

  const toggleSidebar = () => {
    setIsShownSidebar(!isShownSidebar);
  };

  const openMailDetail = async (mail: any, index: number): Promise<void> => {
    setIsShownMailDetail(true);
    setMailDetail(mail);
    setMailIndex(index);
    mails[index].is_read = true;

    setMails(mails);
    await readMail(mail.mail_id);
  };

  const closeMailDetail = (): void => {
    setIsShownMailDetail(false);
  };

  const openMailForm = (): void => {
    setIsShownMailForm(true);
  };

  const closeMailForm = (): void => {
    setIsShownMailForm(false);
  };

  const loadMail = async (type: string): Promise<void> => {
    if (memberInfo.member_id) {
      var result = await HttpClient.post("Mailbox/LoadMail", {
        member_id: memberInfo.member_id,
        type: type,
      });

      setMailType(type);
      setMails(result);
      setMailIndex(-1);
      setIsShownMailDetail(false);
    }
  };

  const getFirstReceiverInfo = (mail_id: string): any => {
    if (mails.length) {
      if (mailType === "inbox") {
        for (var i in mails) {
          var mail = mails[i];
          if (mail.mail_id === mail_id) {
            return { member_name: mail.member_name, avatar: mail.avatar };
          }
        }
      } else {
        for (var i in mails) {
          var mail = mails[i];
          var members = mail.members;
          if (mail.mail_id === mail_id) {
            for (var j in members) {
              var member = members[j];
              if (member.mail_type === "main") {
                return member;
              }
            }
          }
        }
      }
    }
    return {};
  };

  const updateMail = (): void => {
    if (mail.title !== undefined) {
      console.log("receive mail");

      var newMails = [...mails];
      newMails.push(mail);
      setMails(newMails);
    }
  };

  const readMail = async (mail_id: string): Promise<void> => {
    await HttpClient.post("Mailbox/ReadMail", {
      mail_id: mail_id,
      member_id: memberInfo.member_id,
    });
  };

  const deleteMail = async (): Promise<void> => {
    await HttpClient.post("Mailbox/DeleteMail", {
      mail_id: mailDetail.mail_id,
    });
  };

  useEffect(() => {
    if (window.innerWidth < 800) {
      setIsShownSidebar(false);
    }
    loadMail("inbox");
  }, [memberInfo]);

  useEffect(() => {
    updateMail();
  }, [mail]);

  return (
    <div className="mail-box d-flex">
      {isShownSidebar ? (
        <>
          {isMobile ? (
            <div
              onClick={() => toggleSidebar()}
              className="mail-box_side-bar_dark-bg"
            ></div>
          ) : (
            ""
          )}
          <div className="mail-box_side-bar">
            <Sidebar
              mailType={mailType}
              loadMail={loadMail}
              openMailForm={openMailForm}
            />
          </div>
        </>
      ) : (
        ""
      )}

      {isShownMailForm ? <MailForm closeMailForm={closeMailForm} /> : ""}

      <div className="mail-box_list-mail">
        <ListMail
          toggleSidebar={toggleSidebar}
          openMailDetail={openMailDetail}
          mails={mails}
          getFirstReceiverInfo={getFirstReceiverInfo}
          mailIndex={mailIndex}
        />
      </div>

      {isShownMailDetail ? (
        <div className={"mail-box_content" + (isShownSidebar ? "" : " w-100")}>
          <MailDetail
            avatar={getFirstReceiverInfo(mailDetail.mail_id).avatar}
            title={mailDetail.title}
            content={mailDetail.content}
            member_name={getFirstReceiverInfo(mailDetail.mail_id).member_name}
            created_on={mailDetail.created_on}
            members={mailDetail.members}
            closeMailDetail={closeMailDetail}
            deleteMail={deleteMail}
            mailType={mailType}
          />
        </div>
      ) : isMobile ? (
        ""
      ) : (
        <div className={"mail-box_content" + (isShownSidebar ? "" : " w-100")}>
          <DefaultMail />
        </div>
      )}
    </div>
  );
};

export default Mailbox;
