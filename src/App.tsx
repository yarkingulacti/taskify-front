import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MasterLayout } from "./components/layout/MasterLayout";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="*" element={<>404</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
