import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "appointments"), where("doctorId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAppointments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Doctor Dashboard</h2>
      <ul>
        {appointments.map((a) => (
          <li key={a.id} className="p-2 border mb-2 rounded">
            Patient: {a.patientEmail} | Time: {a.timeSlot} | Status: {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
