import { Button, Container, Form, Spinner } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  getEventById,
  getParticipantsByEventId,
  addCompanyParticipant,
  addPersonParticipant,
  deleteParticipantFromEvent,
} from "../services/EventService";
import { useEffect, useState } from "react";
import "../styles/EventView.css";
import { formatDate } from "../utils/DateUtils";
import Person from "../models/Person";
import Company from "../models/Company";
import Event from "../models/Event";
import ParticipantForm from "../components/ParticipantForm";
import { ParticipantType } from "../enums/ParticipantType";
import { stringToParticipantTypeEnum } from "../utils/Utils";

export default function EventView() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event>();
  const [participants, setParticipants] = useState<Person[] | Company[]>();
  const [selectedType, setSelectedType] = useState<ParticipantType>(
    ParticipantType.PERSON
  );

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

  const handleParticipantDTO = (participant: Person | Company) => {
    try {
      if (selectedType === ParticipantType.PERSON) {
        addPersonParticipant(participant, eventId);
      } else if (selectedType === ParticipantType.COMPANY) {
        addCompanyParticipant(participant, eventId);
      }
      navigate("/home");
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const fetchParticipantsById = async () => {
    try {
      if (eventId) {
        const participants = await getParticipantsByEventId(eventId);
        setParticipants(participants);
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleParticipantTypeChange = (event: {
    target: { value: string };
  }) => {
    const selectedType = stringToParticipantTypeEnum(event.target.value);
    setSelectedType(selectedType);
  };

  const handleDeleteParticipant = async (
    eventId: number,
    participantId: number,
    participantType: ParticipantType
  ) => {
    try {
      await deleteParticipantFromEvent(eventId, participantId, participantType);
      await fetchParticipantsById();
    } catch (error) {
      console.error("Error deleting participant: ", error);
    }
  };

  useEffect(() => {
    fetchEventById();
    fetchParticipantsById();
  }, [eventId]);

  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <PageTitle value="Osavõtjad" />
        <div className="view_wrapper">
          <p>Osavõtjad</p>
          {event === undefined ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
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
                    {participants && participants.length > 0 ? (
                      <table className="table table-borderless">
                        <tbody>
                          {participants.map((participant, index) => (
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
                                <NavLink
                                  to={`/${event.id}/participant-view/${participant.id}?type=${participant.type}`}
                                >
                                  <Button
                                    variant="link"
                                    className="table_button"
                                  >
                                    VAATA
                                  </Button>{" "}
                                </NavLink>
                              </td>
                              <td>
                                <Button
                                  variant="link"
                                  className="table_button"
                                  onClick={() =>
                                    event.id !== undefined &&
                                    handleDeleteParticipant(
                                      event.id,
                                      participant.id,
                                      participant.type
                                    )
                                  }
                                >
                                  KUSTUTA
                                </Button>{" "}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <Form className="myform">
          <div className="view_wrapper">Osavõtjate lisamine</div>
          <div className="typeform_wrapper d-flex justify-content-center">
            <Form.Check
              className="type_radio"
              type="radio"
              label="Eraisik"
              name="participantType"
              value={ParticipantType.PERSON.toString()}
              checked={selectedType === ParticipantType.PERSON}
              onChange={handleParticipantTypeChange}
            />
            <Form.Check
              type="radio"
              label="Ettevõte"
              name="participantType"
              value={ParticipantType.COMPANY.toString()}
              checked={selectedType === ParticipantType.COMPANY}
              onChange={handleParticipantTypeChange}
            />
          </div>
        </Form>
      </Container>

      <div className="participantform_wrapper"></div>
      <ParticipantForm
        title=""
        typeParticipant={selectedType}
        editParticipant={false}
        sendParticipantObject={handleParticipantDTO}
      />

      {/* <CustomAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message="Person successfully saved!"
      ></CustomAlert> */}

      <Container>
        <Footer />
      </Container>
    </>
  );
}
