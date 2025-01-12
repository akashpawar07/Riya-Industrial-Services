import React from 'react';
import ImageSlider from '@/components/ImageSlider';

export default function HomePage() {
  const industries = [
    {
      icon: "https://cdn-icons-png.freepik.com/256/5823/5823400.png?uid=R176198366&ga=GA1.1.919035732.1724917926&semt=ais_hybrid",
      title: "Oil Refining"
    },
    {
      icon: "https://cdn-icons-png.freepik.com/512/13363/13363066.png?uid=R176198366&ga=GA1.1.919035732.1724917926",
      title: "Petrochemicals"
    },
    {
      icon: "https://cdn-icons-png.freepik.com/256/15050/15050809.png?uid=R176198366&ga=GA1.1.919035732.1724917926&semt=ais_hybrid",
      title: "Power Plants"
    },
    {
      icon: "https://cdn-icons-png.freepik.com/256/5672/5672087.png?uid=R176198366&ga=GA1.1.919035732.1724917926&semt=ais_hybrid",
      title: "Steel Plants"
    },
    {
      icon: "https://cdn-icons-png.freepik.com/256/1157/1157969.png?uid=R176198366&ga=GA1.1.919035732.1724917926&semt=ais_hybrid",
      title: "Painting"
    },
    {
      icon: "https://cdn-icons-png.freepik.com/256/13591/13591688.png?uid=R176198366&ga=GA1.1.919035732.1724917926&semt=ais_hybrid",
      title: "Heat Exchangers and\nPressure Vessels"
    },
    {
      icon: "https://cdn-icons-png.freepik.com/256/2194/2194886.png?uid=R176198366&ga=GA1.1.919035732.1724917926&semt=ais_hybrid",
      title: "Fertilizers"
    }
  ];

  return (
    <>
      <ImageSlider />
      
      {/* About Section */}
      <section className="py-20 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-lg text-blue-500 font-medium border-b-2 border-blue-400 inline-block">
                ABOUT US
              </h3>
              <h2 className="text-4xl font-bold text-blue-500 leading-tight">
                Trusted Industrial service provider
              </h2>
              <p className="text-gray-700">
                RIYA INDUSTRIAL SERVICES PVT LTD. Established on the 15th of November 2011 by MR. VIKAS MANZA, He embarked on this voyage with a vision to scale new heights of success.
              </p>
              <p className="text-gray-600">
                They believe that all companies are built with trust, mutual respect and co-operation between client and company and they do just that.
              </p>
              <p className="text-gray-700">
              RIYA INDUSTRIAL SERVICES PVT LTD has grown in leaps and bounds over the years following its inception. In the able hands of MR.VIKAS MANZA, a diverse workforce of the highest caliber and a strong infrastructure the company's portfolio of diversified services by exceeding client expectations and achieving market leadership.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://img.freepik.com/free-photo/workers-examining-work_1122-970.jpg" 
                alt="Industrial Services" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-500">
              Industries We Serve
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                      src={industry.icon} 
                      alt={industry.title}
                      className="w-12 h-12 text-[#1E3A8A] group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 whitespace-pre-line">
                    {industry.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}