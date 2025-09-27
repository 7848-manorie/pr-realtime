import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { ref, onValue, off, set, update } from "firebase/database";

export default function ManageSchedule() {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState("");
  const [appointments, setAppointments] = useState([]);

  // Doctor ID (auth UID if logged in, fallback for testing)
  const doctorId = auth.currentUser ? auth.currentUser.uid : "doctor123";

  // Fetch doctor slots
  useEffect(() => {
    const slotsRef = ref(db, `doctors/${doctorId}/slots`);
    const callback = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSlots(Object.values(data));
      } else {
        // fallback: if no slots in DB, show a default empty array
        setSlots([]);
      }
    };
    onValue(slotsRef, callback);
    return () => off(slotsRef, "value", callback);
  }, [doctorId]);

  // Fetch appointments assigned to this doctor
  useEffect(() => {
    const apptRef = ref(db, "appointments");
    const callback = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .filter((a) => a.doctorId === doctorId);
        setAppointments(list);
      } else {
        setAppointments([]);
      }
    };
    onValue(apptRef, callback);
    return () => off(apptRef, "value", callback);
  }, [doctorId]);

  // Add new slot
  const addSlot = () => {
    if (!newSlot) return;
    const updatedSlots = [...slots, newSlot];
    set(ref(db, `doctors/${doctorId}/slots`), updatedSlots);
    setNewSlot("");
  };

  // Update appointment status
  const updateStatus = (id, status) => {
    update(ref(db, `appointments/${id}`), { status });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🗓 Manage Schedule</h1>

      {/* Add Slots */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add time slot (e.g., 10:00 AM)"
          value={newSlot}
          onChange={(e) => setNewSlot(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addSlot}
          className="bg-green-500 text-white px-3 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Display Slots */}
      <h2 className="font-semibold mb-2">Available Slots:</h2>
      <ul>
        {slots.length === 0 ? (
          <p className="text-gray-500">No slots available</p>
        ) : (
          slots.map((slot, i) => (
            <li key={i} className="p-2 bg-gray-100 rounded mb-1">
              {slot}
            </li>
          ))
        )}
      </ul>

      {/* Appointments */}
      <h2 className="font-semibold mt-6 mb-2">Appointments:</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found</p>
      ) : (
        appointments.map((a) => (
          <div key={a.id} className="p-4 bg-white shadow rounded mb-4">
            <p><b>Patient:</b> {a.patientName}</p>
            <p><b>Date:</b> {a.date}</p>
            <p><b>Notes:</b> {a.notes}</p>
            <p>
              <b>Status:</b>{" "}
              <span
                className={`ml-2 px-2 py-1 rounded text-white ${
                  a.status === "approved"
                    ? "bg-green-600"
                    : a.status === "rejected"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {a.status}
              </span>
            </p>

            {/* Approve / Reject Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(a.id, "approved")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                ✅ Approve
              </button>
              <button
                onClick={() => updateStatus(a.id, "rejected")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                ❌ Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
