import { Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import "../styles/EventAdd.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";

export default function EventAdd() {
  const [value, onChange] = useState(null);

  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <PageTitle value="Ürituse lisamine" />

        <Form className="form_wrapper">
          <Form.Group as={Row} className="mb-3" controlId="formEventName">
            <Form.Label className="form_label" column>
              Ürituse nimi:
            </Form.Label>
            <Col>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formEventDate">
            <Form.Label className="form_label" column>
              Toimumisaeg:
            </Form.Label>
            <Col>
              {/* <Form.Control type="date" /> */}
              <DateTimePicker
                className="dt_picker"
                onChange={onChange}
                value={value}
              ></DateTimePicker>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formEventVenue">
            <Form.Label className="form_label" column>
              Koht:
            </Form.Label>
            <Col>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formAdditionalInfo">
            <Form.Label className="form_label" column>
              Lisainfo:
            </Form.Label>
            <Col>
              <Form.Control as="textarea" />
            </Col>
          </Form.Group>
        </Form>
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}
