import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import { FormEventHandler, useEffect, useState } from "react";
import { ParticipantType } from "../enums/ParticipantType";
import { PaymentMethod } from "../enums/PaymentMethod";
import {stringToParticipantTypeEnum, validateEstonianIdCode} from "../utils/Utils";
import {fetchParticipantById, updateParticipant} from "../services/ParticipantService";

export default function ParticipantForm({
  title,
  participantId,
  typeParticipant,
  editParticipant,
  sendParticipantObject,
}: {
  title: string;
  participantId: number;
  typeParticipant: string | null;
  editParticipant: boolean;
  sendParticipantObject: (data: unknown) => void;
}) {
  const [values, setValues] = useState({});
  const navigate = useNavigate();

  const participantType = typeParticipant !== null
      ? stringToParticipantTypeEnum(typeParticipant)
      : undefined;

  const onFormChange = (e: Event) => {
    const { name, value } = e.target;
    validateAndSetValues(name, value);
  };

  const validateAndSetValues = (name: string, value: string) => {
    if (name === "firstName" || name === "lastName" || name === "legalName") {
      if (/^[a-zA-ZäöüõÄÖÜÕ]*$/.test(value) || value === "") {
        setValues({ ...values, [name]: value });
      }
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      if (values.idCode && !validateEstonianIdCode(values.idCode)) {
        alert("Vigane ID kood");
        return;
      }
  
      if (!editParticipant) {
        sendParticipantObject(values);
        setValues({});
      } else {
        await updateParticipant(participantId, values, typeParticipant);
      }
  
      navigate("/home");
    } catch (error) {
      console.error("Error saving participant:", error);
    }
  };

  const getParticipantById = async (participantId: number, typeParticipant: ParticipantType) => {
    try {
      if (participantId) {
        const participant = await fetchParticipantById(participantId, typeParticipant);
        setValues(participant);
      }
    } catch (error) {
      console.error("Error fetching participant details:", error);
    }
  };

  useEffect(() => {
    if (editParticipant) {
      getParticipantById(participantId, typeParticipant);
    }
  }, [participantId]);

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
                      value={values.firstName || ""}
                      type="text"
                      maxLength={50}
                      minLength={3}
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
                    value={values.lastName || ""}
                    type="text"
                    maxLength={50}
                    minLength={3}
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
                    value={values.idCode || ""}
                    type="number"
                    maxLength={11}
                    minLength={11}
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
                    value={values.legalName || ""}
                    type="text"
                    maxLength={50}
                    minLength={3}
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
                    value={values.registryCode || ""}
                    type="text"
                    maxLength={50}
                    minLength={5}
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
                    value={values.numberOfParticipants || ""}
                    type="number"
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
                  value={values.paymentMethod || ""}
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
                  maxLength={
                    typeParticipant === ParticipantType.PERSON ? 1500 : 5000
                  }
                  value={values.additionalInformation || ""}
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
