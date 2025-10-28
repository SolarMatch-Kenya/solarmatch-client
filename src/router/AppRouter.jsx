// AppRouter.js - Updated with Code-Splitting

import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react'; // <-- 1. IMPORTED
import ProtectedRoute from '../components/common/ProtectedRoute';

// 2. IMPORT A LOADER
// You'll need to create this component. 
// It will show while the page chunks are downloading.
import Loader from "../components/common/Loader"; // <-- Or wherever you create it

// 3. LAZY-LOAD ALL YOUR PAGES
const Home = lazy(() => import("../pages/public/Home"));
const About = lazy(() => import("../pages/public/About"));
const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const InstallerContract = lazy(() => import("../pages/installer/InstallerContract"));
const VerifyCode = lazy(() => import("../pages/auth/VerifyCode"));
const Contact = lazy(() => import("../pages/public/Contact"));
const HowItWorks = lazy(() => import("../pages/public/HowItWorks"));
const Analysis = lazy(() => import("../pages/public/Analysis"));
const Financing = lazy(() => import("../pages/public/Financing"));
const DashboardLayout = lazy(() => import("../components/layout/DashboardLayout"));
const AnalysisResult = lazy(() => import("../pages/dashboard/AnalysisResult"));
const EnergyData = lazy(() => import("../pages/dashboard/EnergyData"));
const Installers = lazy(() => import("../pages/dashboard/Installers"));
const Profile = lazy(() => import("../pages/dashboard/Profile"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const AdminOverview = lazy(() => import("../pages/admin/AdminOverview"));
const UserManagement = lazy(() => import("../pages/admin/UserManagement"));
const InstallerManagement = lazy(() => import("../pages/admin/InstallerManagement"));
const Content = lazy(() => import("../pages/admin/Content"));
const ChangePassword = lazy(() => import("../pages/auth/ChangePassword"));
const InstallerDashboard = lazy(() => import('../pages/InstallerDashboard'));
const InstallerOverview = lazy(() => import("../pages/installer/InstallerOverview"));
const CustomerLeads = lazy(() => import("../pages/installer/CustomerLeads"));
const RoofReports = lazy(() => import("../pages/installer/RoofReports"));

// (All your old static 'import' lines for pages are now GONE)

function AppRouter() {
    return (
        // 4. WRAP EVERYTHING IN <Suspense>
        <Suspense fallback={<Loader />}>
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
                <Route path="/installer-contract" element={<ProtectedRoute><InstallerContract /></ProtectedRoute>} />
                <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

                {/* regular user routes */}
                <Route path='/dashboard' element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path='analysis-result' element={<AnalysisResult/>}/>
                    <Route path='energy-data' element={<EnergyData/>}/>
                    <Route path='installers' element={<Installers/>}/>
                    <Route path='profile' element={<Profile/>}/>
                </Route>

                {/* admin routes */}
                <Route path='/admin-dashboard' element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}>
                    <Route index element={<AdminOverview />}/>
                    <Route path='user-management' element={<UserManagement />}/>
                    <Route path='installer-management' element={<InstallerManagement />}/>
                    <Route path='content' element={<Content />}/>
                </Route>

                <Route path='/installer-dashboard' element={<ProtectedRoute><InstallerDashboard /></ProtectedRoute>}>
                    <Route index element={<InstallerOverview />} />
                    <Route path="leads" element={<CustomerLeads />} />
                    <Route path="roof-analysis" element={<RoofReports />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRouter;