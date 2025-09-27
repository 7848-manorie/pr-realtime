import { Link } from "react-router-dom";
import { 
  FaUserMd, 
  FaClipboardList, 
  FaUsers, 
  FaChartBar, 
  FaCalendarCheck 
} from "react-icons/fa";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { MdHistory, MdManageAccounts } from "react-icons/md";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Smart Healthcare Appointment System
      </h1>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700 flex items-center justify-center gap-2">
  <MdOutlineMonitorHeart className="text-red-500" />
  Dashboard
</h2>


      <div className="max-w-6xl mx-auto space-y-12">
        {/* Patient Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-6">👨‍⚕️ Patient Section</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Link to="/browse-doctors">
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition">
                <FaUserMd className="text-blue-500 text-4xl mb-4" />
                <h2 className="font-semibold text-lg">Browse Doctors</h2>
              </div>
            </Link>

            <Link to="/book-appointment">
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition">
                <FaCalendarCheck className="text-green-500 text-4xl mb-4" />
                <h2 className="font-semibold text-lg">Book Appointment</h2>
              </div>
            </Link>

            <Link to="/medical-history">
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition">
                <MdHistory className="text-purple-500 text-4xl mb-4" />
                <h2 className="font-semibold text-lg">Medical History</h2>
              </div>
            </Link>
          </div>
        </div>

        {/* Doctor Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-6">🩺 Doctor Section</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Link to="/manage-schedule">
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition">
                <FaClipboardList className="text-orange-500 text-4xl mb-4" />
                <h2 className="font-semibold text-lg">Manage Schedule</h2>
              </div>
            </Link>

            <Link to="/patient-history">
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition">
                <FaUsers className="text-red-500 text-4xl mb-4" />
                <h2 className="font-semibold text-lg">Patient History</h2>
              </div>
            </Link>
          </div>
        </div>

        {/* Admin Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-6">⚙️ Admin Section</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Link to="/manage-users">
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition">
                <MdManageAccounts className="text-yellow-500 text-4xl mb-4" />
                <h2 className="font-semibold text-lg">Manage Users</h2>
              </div>
            </Link>

            <Link to="/analytics">
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition">
                <FaChartBar className="text-indigo-500 text-4xl mb-4" />
                <h2 className="font-semibold text-lg">Analytics</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
