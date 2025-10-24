// Login view
import LoginForm from "../../components/forms/LoginForm";
import SolarImage from '../../components/ui/SolarImage'

export default function Login() {
    return (
        <div className="flex h-screen font-sans">
            <div className="w-1/2 flex flex-col justify-center items-center">
                <LoginForm />
            </div>
            <div className="w-1/2 bg-[#fff7f2] flex flex-col justify-center px-16 text-black">
                <SolarImage />
            </div>
        </div>
    )
}