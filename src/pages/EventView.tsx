import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";

export default function EventView() {
  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <PageTitle value="Osavõtjad" />
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}
