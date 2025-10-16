// Handles navigation and route protection
// Defines all app routes using React Router

import { Routes, Route, Navigate } from "react-router-dom";

function AppRouter() {
    return (
        <Routes>
            {/* <Route path='/' element={Home}/> */}
            {/* <Route path='/about' element={About}/>
            <Route path='/login' element={Login}/>
            <Route path='/forgot-password' element={ForgotPassword}/>
            <Route path='/register' element={Register}/>
            <Route path='/dashboard' element={Dashboard}>
                <Route path='/dashboard/overview' element={Overview}/>
                <Route path='/dashboard/analysis-result' element={AnalysisResult}/>
                <Route path='/dashboard/ar-view' element={ARView}/>
                <Route path='/dashboard/energy-data' element={EnergyData}/>
                <Route path='/dashboard/installers' element={Installers}/>
                <Route path='/dashboard/profile' element={Profile}/>
            <Route/>
            <Route path='/admin-dashboard' element={AdminDashboard}>
                <Route path='/admin-dashboard/overview' element={AdminOverview}/>
                <Route path='/admin-dashboard/user-management' element={UserManagement}/>
                <Route path='/admin-dashboard/installer-management' element={InstallerManagement}/>
                <Route path='/admin-dashboard/content' element={Content}/>
            <Route/>
            <Route path='/installer-dashboard' element={InstallerDashboard}/> */}
        </Routes>
    )
}

export default AppRouter;