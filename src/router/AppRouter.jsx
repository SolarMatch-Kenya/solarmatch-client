// Handles navigation and route protection
// Defines all app routes using React Router

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from '../components/common/ProtectedRoute';
import Home from "../pages/public/Home";
import About from "../pages/public/About"
import Register from "../pages/auth/Register";
import AnalysisForm from "../components/forms/AnalysisForm";
import ARView from "../pages/dashboard/ARView";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from '../pages/auth/ForgotPassword'
import InstallerContract from "../pages/installer/InstallerContract";
import VerifyCode from "../pages/auth/VerifyCode";

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />}/> 
            <Route path='/about' element={<About />}/>
            {/* <Route path="/financing" element={<Financing />} /> */}

            <Route path='/login' element={<Login />}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/register' element={<Register />}/>
            <Route path="/verify" element={<VerifyCode />} />
            <Route path='/analysis-form' element={<AnalysisForm />}/>
            <Route path="/installer-contract" element={<ProtectedRoute><InstallerContract /></ProtectedRoute>} />

            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                {/* <Route index element={<Overview/>}/> */}
                {/* <Route path='analysis-result' element={<AnalysisResult/>}/> */}
                <Route path='ARview' element={<ARView/>}/>
                {/* <Route path='energy-data' element={<EnergyData/>}/>
                <Route path='installers' element={<Installers/>}/>
                <Route path='profile' element={<Profile/>}/> */}
            </Route>
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