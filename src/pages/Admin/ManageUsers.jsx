import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function ManageUsers() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Smith", email: "john@hospital.com", specialization: "Cardiology", status: "Active" },
    { id: 2, name: "Dr. Sarah Lee", email: "sarah@hospital.com", specialization: "Pediatrics", status: "Inactive" },
  ]);

  const [newDoctor, setNewDoctor] = useState({ name: "", email: "", specialization: "", status: "Active" });
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Add Doctor
  const handleAddDoctor = () => {
    if (!newDoctor.name || !newDoctor.email) return;
    setDoctors([...doctors, { ...newDoctor, id: Date.now() }]);
    setNewDoctor({ name: "", email: "", specialization: "", status: "Active" });
  };

  // Delete Doctor
  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id));
  };

  // Edit Doctor
  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
  };

  const handleSaveEdit = () => {
    setDoctors(doctors.map((doc) => (doc.id === editingDoctor.id ? editingDoctor : doc)));
    setEditingDoctor(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👩‍⚕️ Manage Doctors</h2>

      {/* Add Doctor Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="font-semibold mb-3">Add New Doctor</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Name"
            value={newDoctor.name}
            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newDoctor.email}
            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Specialization"
            value={newDoctor.specialization}
            onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddDoctor}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Doctor Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Specialization</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="border-t">
                <td className="p-3">{doctor.name}</td>
                <td className="p-3">{doctor.email}</td>
                <td className="p-3">{doctor.specialization}</td>
                <td className="p-3">{doctor.status}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEditDoctor(doctor)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Doctor Modal */}
      {editingDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Doctor</h3>
            <input
              type="text"
              value={editingDoctor.name}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="email"
              value={editingDoctor.email}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              value={editingDoctor.specialization}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, specialization: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <select
              value={editingDoctor.status}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, status: e.target.value })}
              className="border p-2 rounded w-full mb-4"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditingDoctor(null)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
