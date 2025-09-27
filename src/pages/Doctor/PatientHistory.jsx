import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue, off } from "firebase/database";

export default function PatientHistory() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const patientsRef = ref(db, "patients");

    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setPatients([]);
        setLoading(false);
        return;
      }

      // Convert patients object to array
      const patientList = Object.entries(data).map(([id, patientData]) => ({
        id,
        ...patientData,
      }));

      setPatients(patientList);
      setLoading(false);
    };

    onValue(patientsRef, handleData);

    return () => off(patientsRef, "value", handleData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🩺 Patient Records </h1>

      {loading ? (
        <p className="text-gray-500">Loading patients...</p>
      ) : patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="space-y-4">
          {patients.map((p) => (
            <div key={p.id} className="p-4 bg-white shadow rounded">
              <p>
                <b>Patient Name:</b> {p.name}
              </p>

              {p.medicalReports ? (
                <div className="mt-2 space-y-2">
                  <b>Medical Reports:</b>
                  {Object.entries(p.medicalReports).map(([id, r]) => (
                    <div key={id} className="p-2 bg-gray-100 rounded">
                      <p>
                        <b>Title:</b> {r.title}
                      </p>
                      <p>
                        <b>Date:</b> {r.date}
                      </p>
                      <p>
                        <b>Description:</b> {r.description}
                      </p>
                      {r.fileURL && (
                        <p>
                          <b>File:</b>{" "}
                          <a
                            href={r.fileURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-2">No medical reports available.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
