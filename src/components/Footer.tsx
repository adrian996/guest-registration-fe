import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <footer className="mt-5 footer">
        <Container>
          <Row>
            <Col md={3}>
              <h4 className="mb-4 font-weight-bold"> Curabitur</h4>
              <p>Emauris</p>
              <p>Kfringilla</p>
              <p>Oin magna sem</p>
              <p>Kelementum</p>
            </Col>
            <Col md={3}>
              <h4 className="mb-4 font-weight-bold">Fusce</h4>
              <p>Asdqwouiqw</p>
              <p>Fasijaosif</p>
              <p>Siqoiwqdasd</p>
              <p>Iasdnasjd</p>
            </Col>
            <Col md={3}>
              <h4 className="mb-4 font-weight-bold">Kontakt</h4>
              <p>
                <b>Peakontor: Tallinnas</b>
              </p>
              <p>Väike-Ameerika 1, 11415, Tallinn</p>
              <p>Telefon: 605 4450</p>
              <p>Faks: 1241249</p>
            </Col>
            <Col md={3} className="column">
              <p>
                <b>Harukontor: Võrus</b>
              </p>
              <p>Oja tn 7 külastusaadress</p>
              <p>Telefon: 605 4450</p>
              <p>Faks: 1241249</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
