// componenens
import Mail from "../Mail/Mail";
import TablePagination from "@mui/material/TablePagination";
// stylesheet
import "./ListMail.css";
import { useState } from "react";
interface Props {
  toggleSidebar: any;
  openMailDetail: any;
  mails: any;
  getFirstReceiverInfo: any;
  mailIndex: number;
}

const ListMail: React.FC<Props> = (props: Props) => {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="ListMail w-100 h-100 light-border-right">
      <div className="top-ListMail d-flex justify-content-between  align-items-center light-border-bottom">
        <div className="left d-flex justify-between ">
          <div
            onClick={() => {
              props.toggleSidebar();
            }}
            className="menu d-flex align-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </div>
          <div className="medium-weight">INBOX</div>
        </div>
        <div className="right d-flex">
          <TablePagination
            component="div"
            count={props.mails.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]}
          />
        </div>
      </div>
      <div className="sub-ListMail">
        {props.mails.map((mail: any, index: number) => {
          var start = page * 10;
          var end = page * 10 + 10;
          if (index >= start && index <= end)
            return (
              <div
                className={
                  props.mailIndex >= 0 && props.mailIndex === index
                    ? "light-bg"
                    : ""
                }
                onClick={() => props.openMailDetail(mail,index)}
              >
                <Mail
                  key={index}
                  title={mail.title}
                  content={mail.content}
                  member_name={
                    props.getFirstReceiverInfo(mail.mail_id).member_name
                  }
                  created_on={mail.created_on}
                  is_read={mail.is_read === undefined ? true : mail.is_read}
                />
              </div>
            );
          return "";
        })}
      </div>
    </div>
  );
};

export default ListMail;
