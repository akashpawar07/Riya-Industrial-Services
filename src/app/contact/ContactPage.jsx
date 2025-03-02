"use client"
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    })
  }

  const sendMessageButtonText = useMemo(() =>
    loading ? "Sending..." : "Send Message",
    [loading]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true at the beginning of submission

    try {
      // Validate mandatory fields
      if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
        toast.error("All fields are mandatory.");
        setLoading(false); // Reset loading state if validation fails
        return; // Exiting the function after warning
      }

      // User name validation
      const usernameRegex = /^(?!.*\d)(?!.*\s{2,})[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

      if (!usernameRegex.test(formData.name)) {
        toast.error("For your name, please use letters only. No numbers or multiple spaces allowed.");
        setLoading(false); // Reset loading state
        return; // Exiting the function
      }

      if (formData.name.length < 3 || formData.name.length > 25) {
        toast.error("To proceed, please make sure that your name is between 3 to 25 characters long.");
        setLoading(false); // Reset loading state
        return; // Exiting the function
      }

      // Email validation
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        setLoading(false); // Reset loading state
        return; // Exiting the function
      }

      if (formData.email.length < 5 || formData.email.length > 30) {
        toast.error("Please ensure your email address is between 5 to 30 characters in length.");
        setLoading(false); // Reset loading state
        return; // Exiting the function
      }

      // Phone number validation
      const phonePattern = /^[1-9]\d{9}$/; // Matches 10 digits starting from 1-9
      if (!phonePattern.test(formData.phone)) {
        toast.error("Phone number should be exactly 10 digits and cannot start with 0 and spaces are not allowed.");
        setLoading(false); // Reset loading state
        return; // Exiting the function
      }
      // else if(!formData.phone.startsWith([7,8,9])){
      //   toast.error("Phone number digits should starts with 9,8,7 only")
      //   return;
      // }

      // Subject validation 
      if (formData.subject.length < 3 || formData.subject.length > 100) {
        toast.error("Subject should be in between 3 to 100 words")
        setLoading(false); // Reset loading state
        return;
      }

      // message validation
      if (formData.message.length < 3 || formData.message.length > 1000) {
        toast.error("Please leave a message atleast in between 3 to 1000 words")
        setLoading(false); // Reset loading state
        return;
      }

      // Post API request on the "register" endpoint
      const response = await axios.post("/api/users/contact", formData);
      // console.log("response data :", response)

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to send message.");
      }

      handleResetForm(); // Resetting the form fields

    } catch (error) {
      console.error("An error occurred:", error.message);
      toast.error("Something went Wrong while sending the message");
    } finally {
      setLoading(false); // Reset loading state no matter what happened
    }
  };

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <div className="min-h-screen  bg-slate-200 dark:bg-gray-900 pb-6">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full mb-24">
          <img
            src="https://img.freepik.com/free-photo/lifestyle-technology-concept-portrait-cheerful-happy-ginger-red-hair-girl-with-joyful-exc_1258-123883.jpg?t=st=1735212988~exp=1735216588~hmac=af50fe5ebfdbbeac4f463c8be087ed5d32100a06d9089d849489ccf58a536602&w=1060"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Connect with us!
            </h1>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Contact Information Sidebar */}
              <div className="bg-blue-600 p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Our Location</h3>
                      <p className="text-blue-100">
                        Near Padmavati Complex, B-158,
                        SanskatDham Residency,
                        Valia Road Kosamdi
                        Ankleshwar, Bharuch,
                        Gujarat, India - 393001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Phone</h3>
                      <p className="text-blue-100">+91 22 5072 700</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-blue-100">riyais2017@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Working Hours</h3>
                      <p className="text-blue-100">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium dark:text-gray-100 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border dark:border-gray-700 dark:text-white dark:bg-gray-800 border-gray-300  rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium dark:text-gray-100 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border dark:border-gray-700 dark:text-white dark:bg-gray-800 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium dark:text-gray-100 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border dark:border-gray-700 dark:text-white dark:bg-gray-800 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium dark:text-gray-100 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border dark:border-gray-700 dark:text-white dark:bg-gray-800 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium dark:text-gray-100 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border dark:border-gray-700 dark:text-white dark:bg-gray-800 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                      disabled={loading}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    <Send className="h-5 w-5" />
                    {sendMessageButtonText}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}