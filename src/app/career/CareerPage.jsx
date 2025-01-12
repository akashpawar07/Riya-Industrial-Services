"use client"
import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Send, Search, Users, Award, Target, Building, ArrowRight, Frown } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import JobsSection from '@/components/JobSection';

const CareerPage = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const PostImageUrl = "https://img.freepik.com/free-photo/shine-stylish-young-adult-studio-shot-smart_1134-902.jpg?t=st=1736098001~exp=1736101601~hmac=c7b09b5ff7385b6527a86ba73a169ebae2ae5dde34cb47b70a499440b915d0e6&w=1060"

  const office1 = "https://img.freepik.com/free-photo/side-view-relaxed-happy-businessman-sitting-office_23-2147839951.jpg?t=st=1736100340~exp=1736103940~hmac=bf46b72527f3a0ee8c69b835944c62e1a1793fa1d0d54f8a109b5e8c8e9b7b94&w=900"

  const office2 = "https://img.freepik.com/free-photo/management-young-businessman-moving-office_155003-28719.jpg?t=st=1736100405~exp=1736104005~hmac=00a08b052316e6e1b455985ae83ea12da40afa4f1d41183b145eb744bd154ddd&w=900"

  const office3 = "https://img.freepik.com/free-photo/medium-shot-woman-working-laptop_23-2149358476.jpg?t=st=1736155386~exp=1736158986~hmac=1050e52d56ae32ed2e44fe8e4dc73b4c21f4f1c10d89a9191874bb7e4c126046&w=900"

  const office4 = "https://img.freepik.com/free-photo/charming-man-white-shirt-cap-glasses-is-against-blue-space-guy-holds-laptop-works-vacation_197531-15465.jpg?t=st=1736155432~exp=1736159032~hmac=aa4d08c88a3b5ca3e028c8ce870de48eefdb44999366da5c601c666853df1fe2&w=900" 
  // const jobs = [
  //   {
  //     id: 1,
  //     title: "Senior Software Engineer",
  //     location: "San Francisco, CA",
  //     type: "Full-time",
  //     department: "Engineering",
  //     description: "We're looking for an experienced software engineer to join our team and help build amazing products.",
  //     requirements: ["5+ years experience", "React expertise", "Strong CS fundamentals"]
  //   },
  //   {
  //     id: 2,
  //     title: "Product Designer",
  //     location: "Remote",
  //     type: "Full-time",
  //     department: "Design",
  //     description: "Join our design team to create beautiful and intuitive user experiences for our global users.",
  //     requirements: ["3+ years experience", "UI/UX expertise", "Figma proficiency"]
  //   },
  //   {
  //     id: 3,
  //     title: "Marketing Manager",
  //     location: "New York, NY",
  //     type: "Full-time",
  //     department: "Marketing",
  //     description: "Lead our marketing initiatives and drive growth through innovative strategies.",
  //     requirements: ["4+ years experience", "Digital marketing", "Team leadership"]
  //   }
  // ];

  const benefits = [
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Collaborative Culture",
      description: "Work with talented individuals in a supportive environment focused on growth and learning."
    },
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "Competitive Benefits",
      description: "Comprehensive health coverage, 401(k) matching, and generous PTO policy."
    },
    {
      icon: <Target className="w-12 h-12 text-blue-600" />,
      title: "Career Growth",
      description: "Clear career progression paths with regular feedback and mentorship opportunities."
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We believe in pushing boundaries and thinking outside the box."
    },
    {
      title: "Customer Obsession",
      description: "Everything we do starts with our customers' needs."
    },
    {
      title: "Diversity & Inclusion",
      description: "We celebrate differences and create an inclusive environment for all."
    }
  ];

  // const filteredJobs = jobs.filter(job =>
  //   job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   job.department.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="min-h-screen  bg-slate-200 dark:bg-gray-800">
      <ToastContainer />

      {/* Hero Section */}
      <div className="relative bg-blue-950 text-white py-32">
        <img
          src={PostImageUrl}
          alt="Career hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-6xl font-bold mb-6">Shape the Future With Us</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Join a team of innovators, dreamers, and doers. Build technologies that make a difference.
          </p>
          {/* <button 
              onClick={() => setSearchTerm('')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Positions
            </button> */}

        </div>
      </div>

      {/* Culture Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Our Culture</h2>
          <p className="text-xl dark:text-gray-300 max-w-3xl mx-auto">
            We're building more than just a company. We're creating a place where innovative minds thrive.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white dark:bg-gray-600 p-8 rounded-xl shadow-lg text-center">
              <div className="flex justify-center mb-6 ">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-4 dark:text-slate-100">{benefit.title}</h3>
              <p className="dark:text-gray-200">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>


      <JobsSection/>

      {/* Company Values */}
      <div className=" py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 text-gray-600 dark:text-gray-400 ">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Our Values</h2>
            <p className="text-xl dark:text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do and shape our company culture.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-600 p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 dark:text-slate-100">{value.title}</h3>
                <p className="dark:text-gray-200">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Life at Company */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Life at Our Company</h2>
            <p className="text-xl dark:text-gray-400 mb-8">
              Experience a workplace that celebrates creativity, embraces challenges, and rewards innovation. Our team members enjoy:
            </p>
            <ul className="space-y-4">
              {[
                "Flexible work arrangements",
                "Regular team building events",
                "Professional development opportunities",
                "Health and wellness programs",
                "Modern office spaces"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <ArrowRight className="w-5 h-5 text-blue-600 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={office1} alt="Office life 1" className="rounded-lg" />
            <img src={office2} alt="Office life 2" className="rounded-lg mt-8" />
            <img src={office3} alt="Office life 3" className="rounded-lg" />
            <img src={office4} alt="Office life 4" className="rounded-lg mt-8" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default CareerPage;