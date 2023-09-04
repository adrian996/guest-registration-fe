import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import PageTitle from "./PageTitle";
import { FormEventHandler, useState } from "react";
import { ParticipantType } from "../enums/ParticipantType";
import { PaymentMethod } from "../enums/PaymentMethod";
import { stringToParticipantTypeEnum } from "../utils/Utils";
import Person from "../models/Person";
import { addParticipant } from "../services/PersonService";
import Company from "../models/Company";

export default function ParticipantForm({
  title,
  typeParticipant,
  editParticipant,
}: {
  title: string;
  typeParticipant: string | null;
  editParticipant: boolean;
}) {
  const [values, setValues] = useState({});

  const participantType =
    typeParticipant !== null
      ? stringToParticipantTypeEnum(typeParticipant)
      : undefined;

  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      await addParticipant(values as Person);
      //setShowAlert(true);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <>
      <Container>
        {editParticipant === true && <PageTitle value={title} />}
        <div className="view_wrapper">{title}</div>
        {participantType !== undefined && (
          <Form className="form_wrapper" onSubmit={submitHandler}>
            {participantType === ParticipantType.PERSON && (
              <>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label className="form_label" column>
                    Eesnimi:
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      type="text"
                      name="firstName"
                      onChange={onFormChange}
                    />
                  </Col>
                </Form.Group>
              </>
            )}

            {participantType === ParticipantType.PERSON && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="form_label" column>
                  Perenimi:
                </Form.Label>
                <Col>
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    onChange={onFormChange}
                  />
                </Col>
              </Form.Group>
            )}

            {participantType === ParticipantType.PERSON && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="form_label" column>
                  Isikukood:
                </Form.Label>
                <Col>
                  <Form.Control
                    required
                    type="text"
                    name="idCode"
                    onChange={onFormChange}
                  />
                </Col>
              </Form.Group>
            )}

            {participantType === ParticipantType.COMPANY && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="form_label" column>
                  Juriidiline nimi:
                </Form.Label>
                <Col>
                  <Form.Control
                    required
                    type="text"
                    name="legalName"
                    onChange={onFormChange}
                  />
                </Col>
              </Form.Group>
            )}

            {participantType === ParticipantType.COMPANY && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="form_label" column>
                  Registrikood:
                </Form.Label>
                <Col>
                  <Form.Control
                    required
                    type="text"
                    name="registryCode"
                    onChange={onFormChange}
                  />
                </Col>
              </Form.Group>
            )}

            {participantType === ParticipantType.COMPANY && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="form_label" column>
                  Osavõtjate arv:
                </Form.Label>
                <Col>
                  <Form.Control
                    required
                    type="text"
                    name="numberOfParticipants"
                    onChange={onFormChange}
                  />
                </Col>
              </Form.Group>
            )}

            <Form.Group as={Row} className="mb-3">
              <Form.Label className="form_label" column>
                Maksmisviis:
              </Form.Label>
              <Col>
                <Form.Control
                  as="select"
                  required
                  name="paymentMethod"
                  onChange={onFormChange}
                >
                  <option value=""></option>
                  {Object.values(PaymentMethod).map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </Form.Control>
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
                  name="additionalInformation"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>

            <div className="button_wrapper">
              <NavLink to="/home" className="custom_nav_link">
                <Button className="button back">Tagasi</Button>{" "}
              </NavLink>
              <Button className="button add" type="submit">
                Salvesta
              </Button>{" "}
            </div>
          </Form>
        )}
      </Container>
    </>
  );
}
