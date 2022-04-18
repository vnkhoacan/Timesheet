import React, { useEffect, useState } from "react";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils";
import DetailTooltip from "../../../../components/Tooltip/Detail/Detail";
import { useSelector } from "react-redux";
import "./main.css";

const DemoApp: React.FC = () => {
  const [calendar, setCalendar] = useState<any>([]);

  const [weekendsVisible, setWeekendsVisible] = useState<any>(true);

  const [currentEvents, setCurrentEvents] = useState<any>([]);

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const isLogedIn = useSelector((s: any) => s.isLogedIn);

  async function loadCalendar() {
    var result = await HttpClient.post("Calendar/LoadCalendar", {
      member_id: memberInfo.member_id,
    });

    var newCalendar = result.calendar;

    setCalendar(newCalendar);
  }

  useEffect(() => {
    if (isLogedIn) loadCalendar();
  }, [isLogedIn]);

  const priority: any = [
    { name: "Low", color: "#4caf50" },
    { name: "Medium", color: "#2196f3" },
    { name: "High", color: "#ff9800" },
    { name: "Very High", color: "#f44336" },
  ];

  const getPriorityColor = (name: string): string => {
    var color: string = "";
    priority.map((value: any) => {
      if (value.name === name) color = value.color;
    });
    return color;
  };

  function renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h3>Notes</h3>
          <div className="d-flex align-items-center">
            <div style={{ background: "#4caf50" }} className="calendar_dot" />
            <p className="my-0 mx-2">Low</p>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ background: "#2196f3" }} className="calendar_dot" />
            <p className="my-0 mx-2">Medium</p>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ background: "#ff9800" }} className="calendar_dot" />
            <p className="my-0 mx-2">High</p>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ background: "#f44336" }} className="calendar_dot" />
            <p className="my-0 mx-2">Very High</p>
          </div>
        </div>
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Tasks ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo: DateSelectArg) {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo: EventClickArg) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
  }

  function handleEvents(events: EventApi[]) {
    setCurrentEvents(events);
  }

  function renderEventContent(eventContent: EventContentArg) {
    var timeText = eventContent.timeText;
    timeText +=
      timeText.indexOf("a") >= 0 || timeText.indexOf("p") >= 0 ? "m" : "";

    return (
      <span
        className="d-flex py-1 px-2 base-radius"
        style={{
          background: getPriorityColor(
            eventContent.event.extendedProps.task_priority
          ),
          color: "white",
        }}
      >
        <i>
          <DetailTooltip
            timeText={timeText}
            title={eventContent.event.title}
            description={eventContent.event.extendedProps.task_description}
          />
        </i>
      </span>
    );
  }

  function renderSidebarEvent(event: EventApi) {
    return (
      <li
        className="d-flex py-1 px-2 base-radius"
        key={event.id}
        style={{
          background: getPriorityColor(event.extendedProps.task_priority),
          color: "white",
        }}
      >
        <i>
          <DetailTooltip
            timeText={formatDate(event.start!, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            title={event.title}
            description={event.extendedProps.task_description}
          />
        </i>
      </li>
    );
  }

  return (
    <div className="demo-app">
      <div className="row w-100 h-100 p-0 m-0">
        <div className="col-xl-3 col-12 p-0">{renderSidebar()}</div>
        <div className="col-xl-9 col-12 p-0">
          {calendar.length ? (
            <div className="demo-app-main">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={weekendsVisible}
                initialEvents={calendar} // alternatively, use the `events` setting to fetch from a feed
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoApp;
