import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav, Footer, ProgressBar, ScrollToTop } from "./components/Shared.jsx";
import Home from "./pages/Home.jsx";
import Prd from "./pages/Prd.jsx";
import Roadmap from "./pages/Roadmap.jsx";
import Board from "./pages/Board.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ProgressBar />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prd" element={<Prd />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/board" element={<Board />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
