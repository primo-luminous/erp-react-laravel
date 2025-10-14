import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { CoreAuthProvider } from './context/CoreAuthContext'
import { ProtectedRoute } from './components/core/ProtectedRoute'
import { Layout } from './components/layout/Layout'
import { LoginPage } from './pages/core/LoginPage'
import { DashboardPage } from './pages/core/DashboardPage'
import { UsersPage } from './pages/core/UsersPage'
import { UserListPage } from './pages/core/UserListPage'
import { UserCreatePage } from './pages/core/UserCreatePage'
import { RolesPage } from './pages/core/RolesPage'
import { ErpDashboard } from './pages/erp/ErpDashboard'
import { HrDashboard } from './pages/erp/HrDashboard'
import { SalesDashboard } from './pages/erp/SalesDashboard'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'

function App() {
  return (
    <CoreAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Core Platform Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/core"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/core/users"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserListPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/core/users/create"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserCreatePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/core/roles"
            element={
              <ProtectedRoute>
                <Layout>
                  <RolesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* ERP System Routes */}
          <Route
            path="/erp"
            element={
              <ProtectedRoute>
                <Layout>
                  <ErpDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/erp/hr"
            element={
              <ProtectedRoute>
                <Layout>
                  <HrDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* Additional ERP Routes */}
          <Route
            path="/erp/sales"
            element={
              <ProtectedRoute>
                <Layout>
                  <SalesDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/erp/inventory"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Inventory Dashboard</h1>
                      <p className="text-gray-600">Coming Soon...</p>
                    </div>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/erp/accounting"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Accounting Dashboard</h1>
                      <p className="text-gray-600">Coming Soon...</p>
                    </div>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/erp/finance"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Finance Dashboard</h1>
                      <p className="text-gray-600">Coming Soon...</p>
                    </div>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* Car Rental Routes */}
          <Route
            path="/rental"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Car Rental Dashboard</h1>
                      <p className="text-gray-600">Coming Soon...</p>
                    </div>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* Smart Classroom Routes */}
          <Route
            path="/classroom"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Smart Classroom Dashboard</h1>
                      <p className="text-gray-600">Coming Soon...</p>
                    </div>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* Legacy Routes (for backward compatibility) */}
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <Layout>
                  <ChangePassword />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* Redirect to core dashboard */}
          <Route path="*" element={<Navigate to="/core" replace />} />
        </Routes>
      </BrowserRouter>
    </CoreAuthProvider>
  )
}
export default App