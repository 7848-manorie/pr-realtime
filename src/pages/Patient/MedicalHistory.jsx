import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue, off } from "firebase/database";

export default function MedicalHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const appointmentsRef = ref(db, "appointments");

    const callback = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allRecords = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        console.log("Appointments:", allRecords);
        setHistory(allRecords);
      } else {
        setHistory([]);
      }
    };

    onValue(appointmentsRef, callback);

    return () => {
      off(appointmentsRef, "value", callback);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🧾 All Medical Records</h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No medical history found.</p>
      ) : (
        history.map((h) => (
          <div key={h.id} className="p-4 bg-gray-100 mb-2 rounded">
            <p><strong>Doctor:</strong> {h.doctorName}</p>
            <p><strong>Patient:</strong> {h.patientName}</p>
            <p><strong>Date:</strong> {h.date}</p>
            <p><strong>Status:</strong> {h.status}</p>
            {h.notes && <p><strong>Notes:</strong> {h.notes}</p>}
          </div>
        ))
      )}
    </div>
  );
}
