import { useState } from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import GlobalStyle from "./assets/globalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";



export default function App() {
  const [where, setWhere] = useState("Page1");
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/sessoes/:idFilme" element={<Page2 />} />
        <Route path="/assentos/:idSessao" element={<Page3 />} />
        <Route path="/sucesso" element={<Page4 />} />
      </Routes>
    </BrowserRouter>
  );
}


