import { useState } from "react";

export default function BookAppointment() {
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });
  const [appointments, setAppointments] = useState([]);

  const doctors = [
    { id: 1, name: "Dr. A Sharma", specialization: "Cardiologist" },
    { id: 2, name: "Dr. B Mehta", specialization: "Dermatologist" },
    { id: 3, name: "Dr. C Patel", specialization: "Pediatrician" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.doctor || !form.date || !form.time || !form.reason) {
      alert("Please fill all fields");
      return;
    }
    setAppointments([...appointments, form]);
    setForm({ doctor: "", date: "", time: "", reason: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📅 Book Appointment</h1>

      {/* Appointment Form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 max-w-md bg-gray-50 p-4 rounded shadow"
      >
        <select
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select a doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name} — {d.specialization}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="reason"
          placeholder="Reason for visit"
          value={form.reason}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Book Appointment
        </button>
      </form>

      {/* Appointments List */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">🧾 Your Appointments:</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments booked.</p>
        ) : (
          appointments.map((appt, i) => (
            <div
              key={i}
              className="p-3 bg-white border rounded mb-2 shadow-sm"
            >
              <p>
                <strong>Doctor:</strong> {appt.doctor}
              </p>
              <p>
                <strong>Date:</strong> {appt.date}
              </p>
              <p>
                <strong>Time:</strong> {appt.time}
              </p>
              <p>
                <strong>Reason:</strong> {appt.reason}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
