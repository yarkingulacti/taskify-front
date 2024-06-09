import React from "react";
import { Calendar, EventApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const TaskCalendar: React.FC = () => {
  const calendar = React.useRef<Calendar | null>(null);
  const navigate = useNavigate();

  const [events] = React.useState<EventApi[]>([
    {
      id: "1",
      url: "/task/1",
      startEditable: true,
      textColor: "black",
      allDay: false,
      allow: true,
      start: moment().toDate(),
      end: moment().add(1, "hour").toDate(),
      backgroundColor: "red",
      borderColor: "white",
      classNames: ["event"],
      constraint: "businessHours",
      display: "auto",
      groupId: "1",
      durationEditable: true,
      overlap: true,
      title: "Meeting",
      endStr: moment().add(1, "hour").format(),
      startStr: moment().format(),
      extendedProps: {
        description: "Meeting with the team",
        location: "Office",
        attendees: ["John Doe", "Jane Doe"],
      },
      source: null,
      formatRange: () => {
        return "Meeting";
      },
      moveDates: () => {
        return null;
      },
      moveEnd: () => {
        return null;
      },
      moveStart: () => {
        return null;
      },
      remove: () => {
        return null;
      },
      setEnd: () => {
        return null;
      },
      setProp: () => {
        return null;
      },
      setStart: () => {
        return null;
      },
      setExtendedProp: () => {
        return null;
      },
      setAllDay: () => {
        return null;
      },
      setDates: () => {
        return null;
      },
      toJSON: () => ({
        id: "1",
        url: "",
        startEditable: true,
        textColor: "black",
        allDay: false,
        allow: true,
        start: moment().toDate(),
        end: moment().add(1, "hour").toDate(),
        backgroundColor: "red",
        borderColor: "white",
        classNames: ["event"],
        constraint: "businessHours",
        display: "auto",
        groupId: "1",
        durationEditable: true,
        overlap: true,
        title: "Meeting",
        endStr: moment().add(1, "hour").format(),
        startStr: moment().format(),
        extendedProps: {
          description: "Meeting with the team",
          location: "Office",
          attendees: ["John Doe", "Jane Doe"],
        },
        source: null,
      }),
      toPlainObject: () => ({
        id: "1",
        url: "/task/1",
        startEditable: true,
        textColor: "black",
        allDay: false,
        allow: true,
        start: moment().toDate(),
        end: moment().add(1, "hour").toDate(),
        backgroundColor: "red",
        borderColor: "white",
        classNames: ["event"],
        constraint: "businessHours",
        display: "auto",
        groupId: "1",
        durationEditable: true,
        overlap: true,
        title: "Meeting",
        endStr: moment().add(1, "hour").format(),
        startStr: moment().format(),
        extendedProps: {
          description: "Meeting with the team",
          location: "Office",
          attendees: ["John Doe", "Jane Doe"],
        },
        source: null,
      }),
    },
  ]);
  const calendarElement = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!calendarElement.current) {
      return;
    }

    calendar.current = new Calendar(calendarElement.current, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,listWeek,dayGridDay",
      },
    });

    for (const event of events) {
      calendar.current.addEvent(event.toPlainObject());
    }
    calendar.current.render();

    calendar.current.on("eventClick", (info) => {
      info.jsEvent.preventDefault();
      navigate(info.event.url);
    });

    return () => {
      calendar.current?.destroy();
    };
  }, []);
  return <div ref={calendarElement} className="w-full h-full"></div>;
};

export default TaskCalendar;
