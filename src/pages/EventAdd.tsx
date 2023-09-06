import { Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import "../styles/EventAdd.css";
import CustomAlert from "../components/CustomAlert";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Button from "react-bootstrap/Button";
import { FormEventHandler, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createEvent } from "../services/EventService";
import Event from "../models/Event";
import { validateDate } from "../utils/DateUtils";

export default function EventAdd() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});

  const onFormChange = (e) => {
    const name = e.target.name;
    const value =
      name === "date" ? validateDate(e.target.value) : e.target.value;

    setValues({ ...values, [name]: value });
  };

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      await createEvent(values as Event);
      navigate("/home");
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <PageTitle value="Ürituse lisamine" />
        <div className="view_wrapper">Ürituse lisamine</div>
        <Form className="form_wrapper" onSubmit={submitHandler}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label className="form_label" column>
              Ürituse nimi:
            </Form.Label>
            <Col>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label className="form_label" column>
              Toimumisaeg:
            </Form.Label>
            <Col>
              <Form.Control
                required
                type="text"
                name="date"
                placeholder="pp.kk.aaaa hh:mm"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label className="form_label" column>
              Koht:
            </Form.Label>
            <Col>
              <Form.Control
                required
                type="text"
                name="venue"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label className="form_label" column>
              Lisainfo:
            </Form.Label>
            <Col>
              <Form.Control
                as="textarea"
                type="text"
                maxLength={1000}
                name="additional_information"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>

          <div className="button_wrapper">
            <NavLink to="/home" className="custom_nav_link">
              <Button className="button back">Tagasi</Button>{" "}
            </NavLink>
            <Button className="button add" type="submit">
              Lisa
            </Button>{" "}
          </div>
        </Form>
      </Container>

      <Container>
        <Footer />
      </Container>

      {/* <CustomAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message="Event successfully saved!"
      ></CustomAlert> */}
    </>
  );
}
