// stylesheet
import DateConverter from "../../../services/Date/DateConverter";
import "./Mail.css";

interface Props {
  title: string;
  content: string;
  member_name: string;
  created_on: string;
  is_read: boolean;
}

const Mail: React.FC<Props> = (props: Props) => {

  return (
    <div className="sub-sub-ListMail pointer-cursor light-border-bottom">
      <div className="email">
        <div className="sub-Email">
          <div className="name d-flex align-items-center justify-content-between">
            <div className="right d-flex align-items-center">
              <div className="sub-sub-Name">{props.member_name}</div>
              {props.is_read ? (
                ""
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#EF4444"
                  height="16px"
                  width="16px"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
            <div className="left">
              {DateConverter.parseShortDate(props.created_on)}
            </div>
          </div>
          <div className="title d-flex align-items-center justify-content-between">
            <div className="right">{props.title}</div>
            <div className="left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#64748B"
                height="16px"
                width="16px"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#F97316"
                height="16px"
                width="16px"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <div className="content">
            <div
              dangerouslySetInnerHTML={{
                __html: props.content.replaceAll("\\", ""),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mail;
