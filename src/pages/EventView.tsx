import { Button, Container, Spinner } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { NavLink, useParams } from "react-router-dom";
import { getEventById } from "../services/EventService";
import { useEffect, useState } from "react";
import "../styles/EventView.css";
import { formatDate } from "../utils/DateUtils";
export default function EventView() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event>();

  const fetchEventById = async () => {
    try {
      if (eventId) {
        const eventDetails = await getEventById(eventId);
        setEvent(eventDetails);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useEffect(() => {
    fetchEventById();
  }, [eventId]);

  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <PageTitle value="Osavõtjad" />
        {event && (
          <>
            <div className="view_wrapper">
              <p>Osavõtjad</p>
              {event === undefined && (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              {event === null && <p>Error fetching event details.</p>}
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Ürituse nimi:</td>
                    <td className="table_value">{event.name}</td>
                  </tr>
                  <tr>
                    <td>Toimumisaeg:</td>
                    <td className="table_value">{formatDate(event.date)}</td>
                  </tr>
                  <tr>
                    <td>Koht:</td>
                    <td className="table_value">{event.venue}</td>
                  </tr>
                  <tr>
                    <td>Osavõtjad:</td>
                    <td>
                      <table className="table table-borderless">
                        <tbody>
                          {event.participants.map((participant, index) => (
                            <tr key={participant.id}>
                              <td>
                                {index + 1}.{" "}
                                {participant.hasOwnProperty("idCode")
                                  ? `${participant.firstName} ${participant.lastName}`
                                  : participant.legalName}
                              </td>
                              <td>
                                {" "}
                                {participant.hasOwnProperty("idCode")
                                  ? `${participant.idCode}`
                                  : participant.registryCode}
                              </td>

                              <td>
                                <NavLink to={`/home`}>
                                  <Button
                                    variant="link"
                                    className="table_button"
                                  >
                                    VAATA
                                  </Button>{" "}
                                </NavLink>
                              </td>

                              <td>
                                <NavLink to={`/`}>
                                  <Button
                                    variant="link"
                                    className="table_button"
                                  >
                                    KUSTUTA
                                  </Button>{" "}
                                </NavLink>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}
