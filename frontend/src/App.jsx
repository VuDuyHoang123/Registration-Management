import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import ChangePassword from "./pages/ChangePassword"
import AdminAddStudent from "./pages/AdminAddStudent"
import AdminDashboard from "./pages/AdminDashboard"
import StudentDashboard from "./pages/StudentDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"
import CoSoPage from "./pages/CoSoPage"
import KhoaPage from "./pages/KhoaPage"
import GiangVienPage from "./pages/GiangVienPage"
import MonHocPage from "./pages/MonHocPage"
import LopHocPhanPage from "./pages/LopHocPhanPage"

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

        <Route path="/admin/coso" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <CoSoPage />
          </ProtectedRoute>
        } />

        <Route path="/admin/khoa" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <KhoaPage />
          </ProtectedRoute>
          } />

        <Route path="/admin/giangvien" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <GiangVienPage/>
          </ProtectedRoute>
        } />

        <Route path="/admin/monhoc" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <MonHocPage/>
          </ProtectedRoute>
        } />
        <Route
            path="/admin/lophp"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <LopHocPhanPage />
              </ProtectedRoute>
            }
          />

      </Routes>

    </div>
  )
}

export default App;