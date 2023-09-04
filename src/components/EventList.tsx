import { Button } from "react-bootstrap";
import "./EventList.css";
import { useEffect, useState } from "react";
import Event from "../models/Event";
import { formatDate } from "../utils/DateUtils";
import { getFutureEvents, getPastEvents, deleteEvent} from "../services/EventService";
import { NavLink } from "react-router-dom";

export default function EventList({title, futureEvents}: {title: string; futureEvents: boolean;}) {
  const heading = title;
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      let fetchedEvents: Event[] = [];
      if (futureEvents) {
        fetchedEvents = await getFutureEvents();
      } else {
        fetchedEvents = await getPastEvents();
      }
      setEvents(fetchedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (eventId: number) => {
    try {
      await deleteEvent(eventId);
      await fetchEvents();
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [futureEvents]);

  return (
    <>
      <div className="table_wrapper">
        <div className="table_heading">{heading}</div>
        <table className="table table-borderless">
          <tbody className="table_body">
            {events.map((event, index) => (
              <tr key={event.id}>
                <td>
                  {index + 1}. {event.name}
                </td>
                <td>{formatDate(event.date)}</td>
                <td>
                  <NavLink to={`/event-view/${event.id}`}>
                    <Button variant="link" className="table_button">
                      OSAVÕTJAD
                    </Button>{" "}
                  </NavLink>
                </td>
                {futureEvents && (
                  <td className="button_td">
                    <Button
                      variant="link"
                      className="table_button"
                      onClick={() =>
                        event.id !== undefined && handleDelete(event.id)
                      }
                    >
                      <b>X</b>
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
