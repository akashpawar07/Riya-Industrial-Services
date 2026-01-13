"use client"
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import Image from 'next/image';
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

  // handling submit for normal user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation Logic
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error("All fields are mandatory.");
      return;
    }

    const usernameRegex = /^(?!.*\d)(?!.*\s{2,})[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    if (!usernameRegex.test(formData.name) || formData.name.length < 3 || formData.name.length > 25) {
      toast.error("Invalid name. Use 3-25 letters only.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email) || formData.email.length < 5 || formData.email.length > 30) {
      toast.error("Please enter a valid email (5-30 chars).");
      return;
    }

    const phonePattern = /^[1-9]\d{9}$/;
    if (!phonePattern.test(formData.phone)) {
      toast.error("Phone number must be 10 digits and not start with 0.");
      return;
    }

    // 2. The API Call & Toast Promise
    setLoading(true);

    try {
      const contactPromise = axios.post("/api/users/contact", formData);

      await toast.promise(
        contactPromise,
        {
          pending: "Sending your message...",
          success: {
            render({ data }) {
              handleResetForm(); // ✅ Reset ONLY on success
              return data.data.message || "Message sent successfully!";
            },
          },
          error: {
            render({ data }) {
              return data.response?.data?.message || "Failed to send message. ❌";
            },
          },
        }
      );

    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose="3000" />
      <div className="min-h-screen  bg-slate-200 dark:bg-gray-900 pb-6">

        {/* Hero Section */}
        <div className="relative h-[60vh] w-full mb-12">
          <Image
            src="https://img.freepik.com/free-photo/lifestyle-technology-concept-portrait-cheerful-happy-ginger-red-hair-girl-with-joyful-exc_1258-123883.jpg?t=st=1735212988~exp=1735216588~hmac=af50fe5ebfdbbeac4f463c8be087ed5d32100a06d9089d849489ccf58a536602&w=1060"
            alt="Contact Us"
            fill // Makes the image fill the 60vh container
            priority // Loads the image immediately (essential for hero sections)
            className="object-cover"
            sizes="100vw" // Tells the browser the image takes the full width
          />

          {/* Overlay and Text */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center animate-bounce">
              Connect with us!
            </h1>
          </div>
        </div>


        {/* map section */}
        <div className="max-w-7xl mx-auto p-2 mb-16">
          <div className="bg-white shadow-lg overflow-hidden">
            {/* Optional: Add a header */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Our Location</h3>
              <p className="text-sm text-gray-600 mt-1">Visit us at our office</p>
            </div>

            {/* Map container */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7419.342988612175!2d73.01712642728667!3d21.5987424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be023a49047e2ff%3A0x300ecd6c51915626!2sSanskardham%20Apartment!5e0!3m2!1sen!2sin!4v1752337554489!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Riya Industrial Services Location"
              />
            </div>

            {/* Optional: Add address info below map */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">

                <div className="flex space-x-4">
                  <a
                    href="tel:+919096149604"
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    📞 Call Us
                  </a>
                  <a
                    href="https://maps.google.com/?q=Sanskardham%20Apartment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    🗺️ Get Directions
                  </a>
                </div>
              </div>
            </div>
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