import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function EventView() {
  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}
