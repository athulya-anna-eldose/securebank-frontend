
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Transactions from "./pages/Transactions/Transactions";
import Transfer from "./pages/Transfer/Transfer";
import Deposit from "./pages/Deposit/Deposit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/deposit" element={<Deposit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
