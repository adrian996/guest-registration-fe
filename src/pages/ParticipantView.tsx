import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLocation, useParams } from "react-router-dom";
import ParticipantForm from "../components/ParticipantForm";
import { Container } from "react-bootstrap";

export default function ParticipantView() {
  const location = useLocation();
  const typeParticipant = new URLSearchParams(location.search).get("type");

  const { participantId } = useParams();

  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <ParticipantForm
          title="Osavõtja info"
          typeParticipant={typeParticipant}
          editParticipant={true}
        />
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}
