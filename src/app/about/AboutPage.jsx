import React from 'react';
import { Building2 } from 'lucide-react';

const ClientCard = ({ name, logoUrl }) => (
  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-lg p-2">
        <img
          src={ logoUrl }  
          alt={`${name} logo`}
          className="max-w-full max-h-full object-cover bg-transparent"
        />
      </div>
      <h4 className="text-center text-gray-800 dark:text-white font-medium">{name}</h4>
    </div>
  </div>
);

export default function AboutPage() {
  const clients = [
    {
      name: "Reliance Industries Ltd.",
      logoUrl: 'https://logos-world.net/wp-content/uploads/2023/03/Reliance-Industries-Ltd.-Logo-500x281.png'
    },
    {
      name: "Essar Oil Limited",
      logoUrl: 'https://www.essar.com/wp-content/uploads/2017/08/eassar.png'
    },
    {
      name: "Larsen & Toubro Ltd",
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/L%26T.png'
    },
    {
      name: "Samsung Engineering",
      logoUrl: 'https://iticampus.co.in/wp-content/uploads/2024/01/Samsung_Logo.svg_.png'
    },
    {
      name: "Indian Oil Corporation Limited",
      logoUrl: 'https://toppng.com/uploads/preview/indian-oil-corporation-vector-logo-11574259324ulqkuccpqn.png'
    },
    {
      name: "Gail India Ltd",
      logoUrl: 'https://etimg.etb2bimg.com/thumb/msid-102981649,width-1200,height-900,resizemode-4/.jpg'
    },
    {
      name: "Huntsman International",
      logoUrl: 'https://cdn.worldvectorlogo.com/logos/huntsman.svg'
    },
    {
      name: "United Phosphorus Limited",
      logoUrl: 'https://seeklogo.com/images/U/united-phosphorus-limited-logo-9B420498A4-seeklogo.com.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br  bg-slate-200 dark:bg-gray-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-semibold tracking-wide uppercase mb-2">ABOUT US</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-6">
            Trusted Industrial service provider
          </h1>
        </div>

        {/* Company Introduction */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <Building2 className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-gray-100">Our Foundation</h3>
              <p className=" dark:text-gray-200 leading-relaxed">
                RIYA INDUSTRIAL SERVICES PVT LTD. Established on the 15th of November 2017 by 
                MR.VIKAS MANZA, embarked on this voyage with a vision to 
                scale new heights of success.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-gray-100">Our Values</h3>
              <p className=" dark:text-gray-200  leading-relaxed">
                They believe that all companies are built with trust, mutual respect 
                and co-operation between client and company and they do just that.
              </p>
            </div>
          </div>
        </div>

        {/* Growth Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100">Our Growth Story</h3>
          <p className=" dark:text-gray-200 leading-relaxed mb-6">
            RIYA INDUSTRIAL SERVICES PVT LTD has grown in leaps and bounds over the years 
            following its inception. In the able hands of MR. Vikas Manza a diverse 
            workforce of the highest caliber and a strong infrastructure the company's portfolio of 
            diversified services by exceeding client expectations and achieving market leadership.
          </p>
        </div>

        {/* Clients Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-gray-100">Our Valued Clients</h3>
          <p className=" dark:text-gray-200 leading-relaxed mb-8">
            In its never-ending quest for customer satisfaction, RIYA INDUSTRIAL SERVICES PVT LTD 
            has along the road bagged contracts with an impressive group of clients including:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {clients.map((client, index) => (
              <ClientCard
                key={index}
                name={client.name}
                logoUrl={client.logoUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};