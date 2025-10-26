import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from '../components/common/ProtectedRoute';
import Home from "../pages/public/Home";
import About from "../pages/public/About"
import Register from "../pages/auth/Register";
import ARView from "../pages/dashboard/ARView";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from '../pages/auth/ForgotPassword'
import InstallerContract from "../pages/installer/InstallerContract";
import VerifyCode from "../pages/auth/VerifyCode";
import Contact from "../pages/public/Contact";
import HowItWorks from "../pages/public/HowItWorks";
import Analysis from "../pages/public/Analysis";
import Financing from "../pages/public/Financing";
import Installers from "../pages/dashboard/Installers";
import Reports from "../pages/dashboard/Reports";
import Profile from "../pages/dashboard/Profile";

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />}/> 
            <Route path='/about' element={<About />}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} /> 
            <Route path="/financing" element={<Financing />} />

            <Route path='/login' element={<Login />}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/register' element={<Register />}/>
            <Route path="/verify" element={<VerifyCode />} />
            <Route path='/analysis' element={<Analysis />}/>
            <Route path='/installers' element={<Installers />}/>
            <Route path="/installer-contract" element={<ProtectedRoute><InstallerContract /></ProtectedRoute>} />

            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            <Route path='/dashboard/reports' element={<ProtectedRoute><Reports /></ProtectedRoute>}/>
            <Route path='/dashboard/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>

            {/* <Route path='/admin-dashboard' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                <Route index element={AdminOverview}/>
                <Route path='/admin-dashboard/user-management' element={UserManagement}/>
                <Route path='/admin-dashboard/installer-management' element={InstallerManagement}/>
                <Route path='/admin-dashboard/content' element={Content}/>
            <Route/> */}
            {/* <Route path='/installer-dashboard' element={<ProtectedRoute><InstallerDashboard /></ProtectedRoute>}>
                <Route index element={<InstallerOverview />} />
                <Route path="leads" element={<CustomerLeads />} />
                <Route path="roof-analysis" element={<RoofReports />} />
            </Route> */}
        </Routes>
    )
}

export default AppRouter;