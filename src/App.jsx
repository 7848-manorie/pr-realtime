import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrowseDoctors from "./pages/Patient/BrowseDoctors";
import BookAppointment from "./pages/Patient/BookAppointment";
import MedicalHistory from "./pages/Patient/MedicalHistory";
import ManageSchedule from "./pages/Doctor/ManageSchedule";
import PatientHistory from "./pages/Doctor/PatientHistory";
// import DoctorDashboard from "./pages/Doctor/DoctorDashbaord";
import ManageUsers from "./pages/Admin/ManageUsers";
import Analytics from "./pages/Admin/Analytics";
// import AdminDashboard from "./pages/Admin/AdminDashboard";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-teal-600 text-white p-4 flex gap-4">
        {/* <Link to="/" className="hover:underline">
          Home
        </Link> */}
        <Link to="/" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
      </nav>

      {/* Routes */}
      <main className="flex-grow p-6">
        <Routes>
          {/* <Route
            path="/"
            element={
              <h1 className="text-2xl font-bold">
                Smart Healthcare Appointment System
              </h1>
            }
          /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Patient */}
          <Route path="/browse-doctors" element={<BrowseDoctors />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/medical-history" element={<MedicalHistory />} />

          {/* Doctor */}
          <Route path="/manage-schedule" element={<ManageSchedule />} />
          <Route path="/patient-history" element={<PatientHistory />} />

          {/* Admin */}
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* <Route path="/admindashboard" element={<AdminDashboard />} /> */}
        </Routes>
      </main>
    </div>

  );
}
