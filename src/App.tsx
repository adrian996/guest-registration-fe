import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventAdd from "./pages/EventAdd";
import EventView from "./pages/EventView";
import ParticipantView from "./pages/ParticipantView";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/event-view" element={<EventView />}></Route>
          <Route path="/participant-view" element={<ParticipantView />}></Route>
          <Route path="/event-add" element={<EventAdd />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
