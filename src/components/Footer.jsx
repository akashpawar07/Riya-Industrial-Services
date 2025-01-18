"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube, MapPin, Phone, Mail, ChevronDown, Wrench, Factory, Settings } from 'lucide-react';

export default function Footer() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { label: 'Maintenance', icon: <Wrench className="w-5 h-5" />, href: '/services/maintenance' },
    { label: 'Manufacturing', icon: <Factory className="w-5 h-5" />, href: '/services/manufacturing' },
    { label: 'Engineering', icon: <Settings className="w-5 h-5" />, href: '/services/engineering' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true, dropdownItems: services },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Career', path: '/career' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Admin Dashbaord', path: '/admin-dashboard' }
  ];

  return (
    <footer className="w-full border-t-2">
      {/* Main Footer Section */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Quick Links Section */}
          <div className=" p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-blue-500 pb-2">
              Quick Links
            </h2>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center text-gray-300 hover:text-blue-400 transition-colors w-full group"
                      >
                        <span>{link.name}</span>
                        <ChevronDown 
                          className={`ml-1 w-4 h-4 transition-transform duration-200 group-hover:text-blue-400 ${isServicesOpen ? 'transform rotate-180' : ''}`}
                        />
                      </button>
                      {isServicesOpen && (
                        <ul className="pl-4 mt-2 space-y-2 border-l-2 border-blue-500">
                          {services.map((service) => (
                            <li key={service.label}>
                              <Link
                                href={service.href}
                                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors gap-2"
                              >
                                {service.icon}
                                <span>{service.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors block"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Office Address Section */}
          <div className=" p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-blue-500 pb-2">
              Office
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start group">
                <MapPin className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0 mt-1 group-hover:text-blue-300" />
                <span className="group-hover:text-gray-100 transition-colors">
                  Near Padmavati Complex,B-158,<br />
                  SanskatDham Residency,<br />
                  Valia Road Kosamdi<br />
                  Ankleshwar, Bharuch, Gujrat India, 393001
                </span>
              </div>
              <div className="flex items-center group hover:text-gray-100">
                <Phone className="mr-2 h-5 w-5 text-blue-400 group-hover:text-blue-300" />
                <span>+91 22 5072 700</span>
              </div>
            </div>
          </div>

          {/* Workshop Address Section */}
          <div className=" p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-blue-500 pb-2">
              Work Shop
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start group">
                <MapPin className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0 mt-1 group-hover:text-blue-300" />
                <span className="group-hover:text-gray-100 transition-colors">
                  Near Padmavati Complex,B-158,<br />
                  SanskatDham Residency,<br />
                  Valia Road Kosamdi<br />
                  Ankleshwar, Bharuch, Gujrat India, 393001
                </span>
              </div>
              <div className="flex items-center group hover:text-gray-100">
                <Mail className="mr-2 h-5 w-5 text-blue-400 group-hover:text-blue-300" />
                <span className="break-all">riyais2017@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className=" p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-blue-500 pb-2">
              Follow Us
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-700/50">
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-700/50">
                <Twitter className="h-5 w-5" />
                <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-700/50">
                <Youtube className="h-5 w-5" />
                <span>Youtube</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-700/50">
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="bg-gray-900 text-gray-300 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col text-center md:flex-row justify-between items-center text-sm">
          <p>Copyright © 2024 Riya Industrial Services. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">
            Website Design | Developed By: <span className="text-blue-400 hover:text-blue-300"><a href="">Akash S Pawar</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
}