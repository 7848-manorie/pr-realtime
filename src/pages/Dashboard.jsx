import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCalendarCheck,
} from "react-icons/fa";
import { MdOutlineMonitorHeart, MdHistory, MdManageAccounts } from "react-icons/md";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
          Smart Healthcare Appointment System
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Centralized dashboard for patients, doctors, and administrators
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-slate-600">
          <MdOutlineMonitorHeart className="text-red-500 text-2xl" />
          <span className="text-xl font-semibold">Dashboard</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Patient Section */}
        <Section title="Patient Module" subtitle="Appointment booking & health records">
          <Card to="/browse-doctors" icon={<FaUserMd />} color="text-blue-600" title="Browse Doctors" desc="Search and view available specialists" />
          <Card to="/book-appointment" icon={<FaCalendarCheck />} color="text-green-600" title="Book Appointment" desc="Schedule appointments in real time" />
          <Card to="/medical-history" icon={<MdHistory />} color="text-purple-600" title="Medical History" desc="Access past consultations and reports" />
        </Section>

        {/* Doctor Section */}
        <Section title="Doctor Module" subtitle="Patient care & schedule management">
          <Card to="/manage-schedule" icon={<FaClipboardList />} color="text-orange-600" title="Manage Schedule" desc="Control availability and appointments" />
          <Card to="/patient-history" icon={<FaUsers />} color="text-red-600" title="Patient History" desc="View assigned patient records" />
        </Section>

        {/* Admin Section */}
        <Section title="Admin Module" subtitle="System control & analytics">
          <Card to="/manage-users" icon={<MdManageAccounts />} color="text-yellow-600" title="Manage Users" desc="Role-based user management" />
          <Card to="/analytics" icon={<FaChartBar />} color="text-indigo-600" title="Analytics" desc="Monitor system usage & insights" />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
        <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {children}
      </div>
    </div>
  );
}

function Card({ to, icon, title, desc, color }) {
  return (
    <Link to={to}>
      <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 h-full">
        <div className={`text-4xl mb-4 ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-2">{desc}</p>
      </div>
    </Link>
  );
}
