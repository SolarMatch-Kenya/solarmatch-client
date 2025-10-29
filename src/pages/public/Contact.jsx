import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import API from '../../services/api'; 
import { toast } from 'sonner'; 
import bg from '/assets/contact.jpg'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        customSubject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setIsLoading(true);

        const finalSubject = formData.subject === 'Other' ? formData.customSubject : formData.subject;

        // Basic validation
        if (!formData.name || !formData.email || !finalSubject || !formData.message) {
            toast.error("Please fill out all required fields.");
            setIsLoading(false);
            return;
        }

        // Prepare data for the backend
        const dataToSend = {
            name: formData.name,
            email: formData.email,
            subject: finalSubject,
            message: formData.message
         };

        try {
            // --- Call the backend ---
            const response = await API.post('/contact', dataToSend);

            toast.success(response.data.message || 'Message sent successfully!'); // <-- Success toast

            // Reset form
            setFormData({
                name: '', email: '', subject: '', customSubject: '', message: ''
            });

        } catch (error) {
            // --- Error handling ---
            toast.error(error.response?.data?.error || 'Failed to send message. Please try again.'); // <-- Error toast
            console.error('Form submission error:', error);
        } finally {
            setIsLoading(false); // <-- Stop loading
        }
    };

    return (
        <div className="app-container">
            <div className="home-container">
                <div className="header">
                    <Navbar />
                </div>
                <div className="text-base font-normal">
                    {/* Hero Section */}
                    <div
                        className="hero relative bg-cover bg-center min-h-[50vh] flex items-center justify-center"
                        style={{ backgroundImage: `url(${bg})` }}
                    >
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-white text-4xl font-bold lg:text-5xl text-center">Contact Us</h1>
                            <p className="text-white xt-lg mt-4 max-w-2xl mx-auto text-center">We'd love to hear from you. Get in touch with us for any inquiries.</p>
                        </div>
                    </div>

                    {/* Contact Details and Form Section */}
                    <div className="py-20 px-[120px]">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Contact Information */}
                                <div className="text-gray-700">
                                    <h2 className="text-3xl font-bold lg:text-4xl text-[#006800] mb-6">Get in Touch</h2>
                                    <p className="text-base font-normal mb-4">Have a question or a project in mind? <br />Fill out the form or contact us through the details below.</p>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-[#006800] mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span>123 Solar Street, Nairobi, Kenya</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-[#006800] mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                            <a href="mailto:contact@solarmatch.com" className="hover:text-secondary">contact@solarmatch.com</a>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-[#006800] mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                            <span>+254 712 345 678</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div className="bg-white p-8 rounded-lg shadow-md">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006800]" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006800]" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
                                            <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006800]" required>
                                                <option value="">Select a Subject</option>
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="I am an Installer">I am an Installer</option>
                                                <option value="I am a Financer">I am a Financer</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        {formData.subject === 'Other' && (
                                            <div className="mb-4">
                                                <label htmlFor="customSubject" className="block text-gray-700 font-bold mb-2">Custom Subject</label>
                                                <input type="text" id="customSubject" name="customSubject" value={formData.customSubject} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006800]" placeholder="Enter your subject" required />
                                            </div>
                                        )}
                                        <div className="mb-6">
                                            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006800]" required></textarea>
                                        </div>
                                        {/* --- Update Button --- */}
                                        <PrimaryButton type="submit" className='bg-[#f79436] text-white disabled:opacity-50' disabled={isLoading}>
                                            {isLoading ? 'Sending...' : 'Send Message'}
                                        </PrimaryButton>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Contact;