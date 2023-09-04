import { Button, Col, Container, Form, NavLink, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { FormEventHandler, useState } from "react";
import Person from "../models/Person";

export default function ParticipantView() {
  //const [values, setValues] = useState({});
  //const [showAlert, setShowAlert] = useState(false);

  // const onFormChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setValues({ ...values, [name]: value });
  // };

  // const submitHandler: FormEventHandler = async (e) => {
  //   e.preventDefault();
  //   e.persist();

  //   try {
  //     await createPerson(values as Person);
  //     //setShowAlert(true);
  //   } catch (error) {
  //     console.error("Error saving person:", error);
  //   }
  // };

  const [persons, setPersons] = useState<Person[]>([]);

  const fetchPersons = async () => {
    try {
      let fetchedPersons: Person[] = [];
      if (fetchedPersons) {
        fetchedPersons = await get();
      }
      setPersons(fetchedPersons);
      console.log(fetchedPersons);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <PageTitle value="Osavõtja info" />
        <Form className="form_wrapper">
          <Form.Group as={Row} className="mb-3">
            <Form.Label className="form_label" column>
              Ürituse nimi:
            </Form.Label>
            <Col>
              <Form.Control required type="text" name="name" />
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
    </>
  );
}
