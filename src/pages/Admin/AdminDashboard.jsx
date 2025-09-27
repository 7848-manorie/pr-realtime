import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubAppt = onSnapshot(collection(db, "appointments"), (snap) => {
      setAppointments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => {
      unsubUsers();
      unsubAppt();
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <h3 className="font-semibold">Users</h3>
      <ul>{users.map((u) => <li key={u.id}>{u.email} ({u.role})</li>)}</ul>
      <h3 className="font-semibold mt-4">Appointments</h3>
      <ul>{appointments.map((a) => <li key={a.id}>{a.patientEmail} → {a.doctorEmail}</li>)}</ul>
    </div>
  );
}
