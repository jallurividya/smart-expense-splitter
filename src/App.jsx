import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Group from "./pages/Group";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group/:id" element={<Group />} />
      </Routes>
    </BrowserRouter>
  );
}
