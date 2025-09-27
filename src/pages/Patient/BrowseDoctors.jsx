import { useEffect, useState } from "react";
import {
  ref,
  onValue,
  push,
  update,
  remove,
} from "firebase/database";
import { db } from "../../firebase"; 

export default function BrowseDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    location: "",
    availability: "",
    fee: "",
  });
  const [editId, setEditId] = useState(null);

 const fetchDoctors = () => {
  const doctorsRef = ref(db, "doctors");

  onValue(doctorsRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Fetched data:", data); // ✅ Add this to debug

    if (data) {
      const doctorList = Object.entries(data)
        .filter(([_, val]) => typeof val === 'object')
        .map(([key, val]) => ({
          id: key,
          ...val,
        }));
      setDoctors(doctorList);
    } else {
      setDoctors([]);
    }
  });
};


  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorData = {
      ...form,
      fee: Number(form.fee),
    };

    if (editId) {
      const docRef = ref(db, `doctors/${editId}`);
      await update(docRef, doctorData);
      setEditId(null);
    } else {
      await push(ref(db, "doctors"), doctorData);
    }

    setForm({
      name: "",
      specialization: "",
      location: "",
      availability: "",
      fee: "",
    });
  };

  const handleEdit = (doctor) => {
    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      location: doctor.location,
      availability: doctor.availability,
      fee: doctor.fee,
    });
    setEditId(doctor.id);
  };

  const handleDelete = async (id) => {
    await remove(ref(db, `doctors/${id}`));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🩺 Manage Doctors</h1>

      {/* Doctor Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability (e.g., Mon-Fri, 10 AM - 4 PM)"
          value={form.availability}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="fee"
          placeholder="Consultation Fee"
          value={form.fee}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Doctor" : "Add Doctor"}
        </button>
      </form>

      {/* Doctor List */}
      <div>
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="p-4 bg-gray-100 mb-2 rounded flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{doc.name}</h2>
              <p>{doc.specialization}</p>
              <p>{doc.location}</p>
              <p>{doc.availability}</p>
              <p>₹{doc.fee}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(doc)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(doc.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
