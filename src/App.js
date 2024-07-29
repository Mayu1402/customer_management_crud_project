import React from "react";
import { CustomerForm } from './components/CustomerForm';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomerList from "./components/CustomerList";
import { EditCustomer } from "./components/EditCustomer";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CustomerForm />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/edit-customer/:index" element={<EditCustomer />} />


      </Routes>
    </Router>
  );
}

export default App;
