// Handles navigation and route protection
// Defines all app routes using React Router

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from '../components/common/ProtectedRoute';
import Home from "../pages/public/Home";
import About from "../pages/public/About"
import Register from "../pages/auth/Register";
import ARView from "../pages/dashboard/ARView";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import InstallerContract from "../pages/installer/InstallerContract";
import Contact from "../pages/public/Contact";
import HowItWorks from "../pages/public/HowItWorks";
import Analysis from "../pages/public/Analysis";
import Financing from "../pages/public/Financing";
import SolarAnalysis from "../pages/public/SolarAnalysis";
import Overview from "../pages/dashboard/Overview";
import AnalysisResult from "../pages/dashboard/AnalysisResult";
import EnergyData from "../pages/dashboard/EnergyData";
import Installers from "../pages/dashboard/Installers";
import Profile from "../pages/dashboard/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import AdminOverview from "../pages/admin/AdminOverview";
import UserManagement from "../pages/admin/UserManagement";
import InstallerManagement from "../pages/admin/InstallerManagement";
import Content from "../pages/admin/Content";
import InstallerDashboard from "../pages/InstallerDashboard";
import InstallerOverview from "../pages/installer/InstallerOverview";
import CustomerLeads from "../pages/installer/CustomerLeads";
import RoofReports from "../pages/installer/RoofReports";


function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/financing" element={<Financing />} />

            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/register' element={<Register />} />
            <Route path='/analysis' element={<Analysis />} />
            <Route path='/solar-analysis' element={<SolarAnalysis />} />
            <Route path="/installer-contract" element={<ProtectedRoute><InstallerContract /></ProtectedRoute>} />

            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                <Route index element={<Overview />} />
                <Route path='analysis-result' element={<AnalysisResult />} />
                <Route path='ARview' element={<ARView />} />
                <Route path='energy-data' element={<EnergyData />} />
                <Route path='installers' element={<Installers />} />
                <Route path='profile' element={<Profile />} />
            </Route>
            <Route path='/admin-dashboard' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                <Route index element={<AdminOverview />} />
                <Route path='user-management' element={<UserManagement />} />
                <Route path='installer-management' element={<InstallerManagement />} />
                <Route path='content' element={<Content />} />
            </Route>
            <Route path='/installer-dashboard' element={<ProtectedRoute><InstallerDashboard /></ProtectedRoute>}>
                <Route index element={<InstallerOverview />} />
                <Route path="leads" element={<CustomerLeads />} />
                <Route path="roof-analysis" element={<RoofReports />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;