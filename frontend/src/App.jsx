import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import ChangePassword from "./pages/ChangePassword"
import AdminAddStudent from "./pages/AdminAddStudent"
import AdminDashboard from "./pages/AdminDashboard"
import StudentDashboard from "./pages/StudentDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"

function App() {
  return (
    <div className="page-wrapper">
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/admin/add-student" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminAddStudent />
          </ProtectedRoute>
        } />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App;