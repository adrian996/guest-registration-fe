import { Container } from "react-bootstrap";
import "../styles/Home.css";
import image from "../assets/pilt.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EventList from "../components/EventList";

export default function Home() {
  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container className="block_container">
        <div className="block_wrapper">
          Aliquam lorem ante, bdapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
          Aenean imperdiet. Etiam ultricies
        </div>
        <div className="block_wrapper">
          <img src={image} alt="Image" />
        </div>
      </Container>

      <Container className="events_container">
        <EventList value="Tulevased üritused" />
        <EventList value="Toimunud üritused" />
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}
