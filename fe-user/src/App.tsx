import React from "react";
import "./App.css";
import CreateUser from "./Components/CreateUser/CreateUser";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ListUser from "./Components/ListUser/ListUser";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<CreateUser />} />
            <Route path="/list-user" element={<ListUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
