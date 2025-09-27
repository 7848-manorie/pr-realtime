import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default function Analytics() {
  const [stats, setStats] = useState({
    users: 1,
    doctors: 2,
    appointments: 4,
    cancelled: 1,
    revenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all patients, doctors, and appointments
        const patientsSnap = await getDocs(collection(db, "patients"));
        const doctorsSnap = await getDocs(collection(db, "doctors"));
        const appointmentsSnap = await getDocs(collection(db, "appointments"));

        const doctorsMap = {};
        doctorsSnap.forEach((doc) => {
          const data = doc.data();
          doctorsMap[doc.id] = data;
        });

        let cancelledCount = 0;
        let revenue = 0;

        appointmentsSnap.forEach((doc) => {
          const data = doc.data();

          // Count cancelled
          if (data.status === "cancelled") {
            cancelledCount += 1;
          }

          // Add revenue if completed
          if (data.status === "completed") {
            const doctor = doctorsMap[data.doctorId];
            if (doctor && typeof doctor.fee === "number") {
              revenue += doctor.fee;
            }
          }
        });

        // Set state
        setStats({
          users: patientsSnap.size,
          doctors: doctorsSnap.size,
          appointments: appointmentsSnap.size,
          cancelled: cancelledCount,
          revenue: revenue,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📊 Analytics Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Patients</h2>
          <p>{stats.users}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Doctors</h2>
          <p>{stats.doctors}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Appointments</h2>
          <p>{stats.appointments}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Cancelled</h2>
          <p>{stats.cancelled}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Revenue</h2>
          <p>₹{stats.revenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
