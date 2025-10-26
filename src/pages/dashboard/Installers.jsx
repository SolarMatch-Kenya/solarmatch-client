import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import InstallerCard from '../../components/cards/InstallerCard';
import Logo from '../../assets/logo-color.svg';

const Installers = () => {
  const installerList = [
    {
      id: 1,
      name: 'Bright Solar Solutions',
      description: 'Bright Solar Solutions is a leading solar installer in Nairobi, with over 120 projects completed.',
      logo: Logo,
      rating: 4.8,
      reviews: 45,
      contact: '+254 712 345 678',
    },
    {
      id: 2,
      name: 'Green Energy Installers',
      description: 'Green Energy Installers is a Mombasa-based solar installer with a focus on residential projects.',
      logo: Logo,
      rating: 4.5,
      reviews: 32,
      contact: '+254 723 456 789',
    },
    {
      id: 3,
      name: 'SunPower Kenya',
      description: 'SunPower Kenya is a top-rated solar installer in Kisumu, with over 150 projects completed.',
      logo: Logo,
      rating: 4.9,
      reviews: 67,
      contact: '+254 734 567 890',
    },
    {
      id: 4,
      name: 'EcoWatt Solar',
      description: 'EcoWatt Solar is a Nakuru-based solar installer that specializes in commercial projects.',
      logo: Logo,
      rating: 4.7,
      reviews: 28,
      contact: '+254 745 678 901',
    },
  ];

  return (
    <div className="app-container">
        <div className="header">
            <Navbar />
        </div>
        <div className="body">
            {/* Hero section */}
            <div className="hero relative bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/src/assets/contact.jpg)' }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-8 py-30 mb-8 relative text-center max-w-7xl">
                    <img src={Logo} alt="SolarMatch Logo" className="h-24 mx-auto mb-8" />
                    <h1 className="text-4xl font-bold lg:text-5xl text-white tracking-tight">Find the Best Solar Installers in Kenya</h1>
                    <p className="text-body mt-6 max-w-2xl mx-auto text-lg text-white/90">We have a network of certified and experienced solar installers across Kenya. Browse through our list of installers and find the perfect one for your project.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {installerList.map((installer) => (
                        <InstallerCard key={installer.id} installer={installer} />
                    ))}
                </div>
            </div>
        </div>
        <div className="footer">
            <Footer />
        </div>
    </div>
  );
};

export default Installers;