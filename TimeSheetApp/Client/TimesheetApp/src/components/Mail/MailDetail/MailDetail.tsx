// components
import { useEffect, useState } from "react";
import FlexAvatar from "../../Avatar/FlexAvatar";
import ListMember from "../ListMember/ListMember";
import Alert_YESNO from "../../Alert/ButtonAlert/Alert_YESNO/Alert_YESNO";
// stylesheet
import "./MailDetail.css";

interface Props {
  closeMailDetail: any;
  title: string;
  content: string;
  member_name: string;
  avatar: string;
  created_on: string;
  members: any;
  deleteMail: any;
  mailType: string;
}

const MailDetail: React.FC<Props> = (props: Props) => {
  const [isShownListMember, setIsShownListMember] = useState<boolean>(false);

  const openListMember = (): void => {
    setIsShownListMember(true);
  };

  const closeListMember = (): void => {
    setIsShownListMember(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeListMember);
    return () => document.removeEventListener("mousedown", closeListMember);
  }, []);

  return (
    <div className="detailsMail">
      <div style={{ height: "14%" }} className="top-detailsMail d-flex">
        <div style={{ height: "50%" }} className="tag light-border-bottom">
          <i
            onClick={() => props.closeMailDetail()}
            className="material-icons-outlined pointer-cursor"
          >
            arrow_back_ios
          </i>
          <div className="d-flex align-items-center pointer-cursor">
            {props.mailType === "sent" ? (
              <span className="relative-position d-flex align-items-center">
                <i className="material-icons">delete_outline</i>
                <Alert_YESNO
                  header="Message"
                  message="Do you want to delete this mail ?"
                  yesText="Ok"
                  noText="Cancel"
                  yesFunction={() => props.deleteMail()}
                  noFunction={() => {}}
                />
              </span>
            ) : (
              ""
            )}
            <svg
              className="margin-left"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height="24px"
              width="24px"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              ></path>
            </svg>

            <svg
              className="margin-left"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height="24px"
              width="24px"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>

            <svg
              className="margin-left"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height="24px"
              width="24px"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              ></path>
            </svg>

            <svg
              className="margin-left"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height="24px"
              width="24px"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </div>
        </div>
        <div style={{ height: "50%" }} className="title light-border-bottom">
          <div className="sub-title">{props.title}</div>
        </div>
      </div>
      <div className="content-detailsMail">
        <div className="sub-content-detailsMail">
          <div className="content">
            <div className="name">
              <div className="avatar">
                <FlexAvatar
                  style={{}}
                  src={props.avatar}
                  name={props.member_name}
                />
              </div>
              <div className="sub-name">
                <div className="top medium-weight">{props.member_name}</div>
                <div className="bottom d-flex align-items-center relative-position">
                  <span style={{ fontSize: "13px" }} className="">
                    {props.members.length ? (
                      <>
                        to <span className="medium-weight">me</span> and{" "}
                        <span className="medium-weight">
                          {props.members.length > 1
                            ? props.members.length + " others"
                            : "another"}
                        </span>
                      </>
                    ) : (
                      <>
                        to <span className="medium-weight">me</span>
                      </>
                    )}
                  </span>
                  {props.members.length ? (
                    <div
                      onClick={() => openListMember()}
                      className="d-flex align-items-center pb-1 pointer-cursor"
                    >
                      <i className="material-icons-outlined light-color">
                        keyboard_arrow_down
                      </i>
                    </div>
                  ) : (
                    ""
                  )}
                  {isShownListMember ? (
                    <div>
                      <ListMember members={props.members} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="letter">
              <div
                dangerouslySetInnerHTML={{
                  __html: props.content.replaceAll("\\", ""),
                }}
              />
            </div>
            {/* <div className="attachments">
              <div className="top">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#64748B"
                  height="20px"
                  width="20px"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div className="right">3 Attachments</div>
              </div>
              <div className="bottom">
                <div className="file-attachments">
                  <div className="img"></div>
                  <div className="file-details">
                    <div className="name-file"> mystery-forest.jpg </div>
                    <div className="size-file"> 15.54 KB</div>
                  </div>
                </div>
                <div className="file-attachments">
                  <div className="img"></div>
                  <div className="file-details">
                    <div className="name-file"> mystery-forest.jpg </div>
                    <div className="size-file"> 15.54 KB</div>
                  </div>
                </div>
                <div className="file-attachments">
                  <div className="img"></div>
                  <div className="file-details">
                    <div className="name-file"> mystery-forest.jpg </div>
                    <div className="size-file"> 15.54 KB</div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="footer">
            <div className="sub-footer">
              <button className="footer-btn">
                <span className="Reply">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#4F46E5"
                    height="20px"
                    width="20px"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sub-Reply">Reply</span>
                </span>
              </button>
              <button className="footer-btn">
                <span className="Reply-All">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#4F46E5"
                    height="20px"
                    width="20px"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sub-Reply-All">Reply All</span>
                </span>
              </button>
              {/* <button className="footer-btn">
                <span className="Forward">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#4F46E5"
                    height="20px"
                    width="20px"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sub-Forward">Forward</span>
                </span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailDetail;
