// financing page with loan estimator

import React, { useState } from 'react';
import FinancerCard from '../../components/cards/FinancerCard';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import bg from '../../assets/contact.jpg'

const financers = [
    {
        name: 'Kenya Green Finance',
        logo: 'https://via.placeholder.com/150',
        description: 'Leading green energy financing solutions in Kenya.',
        location: 'Nairobi, Kenya',
        contact: '0712345678',
        website: 'https://www.kenyagreenfinance.co.ke',
    },
    {
        name: 'EcoBank Solar Loans',
        logo: 'https://via.placeholder.com/150',
        description: 'Affordable solar panel loans for Kenyan households.',
        location: 'Mombasa, Kenya',
        contact: '0723456789',
        website: 'https://www.ecobanksolar.co.ke',
    },
    {
        name: 'SustainaCredit Kenya',
        logo: 'https://via.placeholder.com/150',
        description: 'Sustainable financing for renewable energy projects.',
        location: 'Kisumu, Kenya',
        contact: '0734567890',
        website: 'https://www.sustainacredit.co.ke',
    },
];

const Financing = () => {
    const [loanAmount, setLoanAmount] = useState(200000);
    const [interestRate, setInterestRate] = useState(12);
    const [loanTerm, setLoanTerm] = useState(5);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const calculateMonthlyPayment = () => {
        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate) / 100 / 12;
        const term = parseFloat(loanTerm) * 12;

        if (principal > 0 && rate > 0 && term > 0) {
            const monthly = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
            setMonthlyPayment(monthly.toFixed(2));
        } else {
            setMonthlyPayment(0);
        }
    };

    return (
        <div className="app-container">
            <Navbar />
            <div className="body">
                {/* Hero section */}
                <div className="hero relative bg-cover bg-center min-h-[50vh] flex items-center justify-center" style={{ backgroundImage: `url(${bg})` }}>
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="container mx-auto px-8 relative text-center max-w-7xl">
                        <h1 className="text-4xl font-bold lg:text-5xl text-white tracking-tight">Power Your Home with Solar, Affordably.</h1>
                        <p className="text-body mt-6 max-w-2xl mx-auto text-lg text-white/90">Explore flexible financing options and calculate your potential loan payments for a sustainable future.</p>
                    </div>
                </div>
                <div>
                    {/* Introduction */}
                    <div className="container mx-auto px-4 py-8 max-w-7xl">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Affordable Solar Financing Options</h2>
                        <p className="text-center text-gray-700 mb-8">Discover a range of financing solutions tailored to help you invest in solar energy for your home or business. Use our loan calculator to estimate your monthly payments and explore green loan providers committed to sustainable energy.</p>
                        <p className="text-center text-gray-700 mb-8">Green loans are specialized financial products designed to support environmentally friendly projects, such as solar panel installations. They often come with
                            favorable terms, like lower interest rates, to encourage sustainable investments. These loans can cover the costs of equipment, installation, and related expenses,
                            making it easier for homeowners and businesses to adopt clean energy solutions.</p>
                    </div>
                </div>

                {/* Loan Calculator */}
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="border border-gray-300 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Loan Calculator</h2>
                        <div className="flex flex-col md:flex-row justify-around items-center gap-4 mb-4">
                            <div className="flex-1 w-full">
                                <label htmlFor="loanAmount" className="block text-gray-700 font-bold mb-2">
                                    Loan Amount (Ksh)
                                </label>
                                <input
                                    type="number"
                                    id="loanAmount"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <label htmlFor="interestRate" className="block text-gray-700 font-bold mb-2">
                                    Interest Rate (%)
                                </label>
                                <input
                                    type="number"
                                    id="interestRate"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <label htmlFor="loanTerm" className="block text-gray-700 font-bold mb-2">
                                    Loan Term (Years)
                                </label>
                                <input
                                    type="number"
                                    id="loanTerm"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <PrimaryButton onClick={calculateMonthlyPayment} className='bg-[#f79436]'>
                                Calculate Monthly Payment
                            </PrimaryButton>
                        </div>
                        {monthlyPayment > 0 && (
                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-semibold">Estimated Monthly Payment: Ksh {monthlyPayment}</h3>
                            </div>
                        )}
                    </div>
                </div>

                {/* Green Loan Providers */}
                <div className='financer bg-linear-to-b from-green-50 to-[#133b04]'>
                    <div className="container mx-auto px-4 py-8 max-w-7xl">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Green Loan Providers</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {financers.map((financer) => (
                                <FinancerCard key={financer.name} financer={financer} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Financing;