// Handles navigation and route protection
// Defines all app routes using React Router

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from '../components/common/ProtectedRoute';
import Home from "../pages/public/Home";
import About from "../pages/public/About"
import Register from "../pages/auth/Register";

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />}/> 
            <Route path='/about' element={<About />}/>
            {/* <Route path="/financing" element={<Financing />} /> */}

            {/* <Route path='/login' element={<Login />}/> */}
            {/* <Route path='/forgot-password' element={ForgotPassword}/>  */}
            <Route path='/register' element={<Register />}/>
            {/* <Route path="/installer-contract" element={<InstallerContract />} />
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                <Route index element={Overview}/>
                <Route path='/dashboard/analysis-result' element={AnalysisResult}/>
                <Route path='/dashboard/ar-view' element={ARView}/>
                <Route path='/dashboard/energy-data' element={EnergyData}/>
                <Route path='/dashboard/installers' element={Installers}/>
                <Route path='/dashboard/profile' element={Profile}/>
            <Route/>
            <Route path='/admin-dashboard' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                <Route index element={AdminOverview}/>
                <Route path='/admin-dashboard/user-management' element={UserManagement}/>
                <Route path='/admin-dashboard/installer-management' element={InstallerManagement}/>
                <Route path='/admin-dashboard/content' element={Content}/>
            <Route/>
            <Route path='/installer-dashboard' element={<ProtectedRoute><InstallerDashboard /></ProtectedRoute>}>
                <Route index element={<InstallerOverview />} />
                <Route path="leads" element={<CustomerLeads />} />
                <Route path="roof-analysis" element={<RoofReports />} />
            </Route> */}
        </Routes>
    )
}

export default AppRouter;