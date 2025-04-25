import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { visitFaqData } from '../data/dataService';
import '../styles/VisitUs.css';

const PageHeader = ({ title, subtitle, backgroundImage }) => (
  <div className="relative bg-gray-900 py-32">
    {/* Background image with overlay */}
    {backgroundImage && (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <img 
          src={backgroundImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
    )}
    
    {/* Content */}
    <div className="container mx-auto px-4 text-center text-white relative z-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{title}</h1>
      <p className="text-xl max-w-3xl mx-auto text-gray-100">{subtitle}</p>
    </div>
  </div>
);

const LocationInfo = () => (
  <div className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Our Location</h2>
          <p className="text-gray-700 mb-6">
            Hope Church Canberra is located in the center of Canberra, with convenient transportation and a pleasant environment. Whether you drive or take public transportation, you can easily reach us.
          </p>
          
          <div className="relative rounded-lg shadow-md mb-6 overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/Sunday Service Location.jpg" 
                alt="Sunday Service Location" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-35"></div>
            </div>
            
            {/* Content overlay */}
            <div className="relative z-10 p-6 text-white">
              <h3 className="text-xl font-semibold mb-3 text-white">Service Information</h3>
              <p className="mb-3"><span className="font-medium">Service Time:</span> 10:00 AM - 12:30 PM Sundays</p>
              <p className="mb-1"><span className="font-medium">Service Location:</span></p>
              <p className="mb-1">T2 Theatre, Level 2</p>
              <p className="mb-1">Lowitja O'Donoghue Cultural Centre</p>
              <p className="mb-1">The Australian National University</p>
              <p>153 Tangney Rd, Acton ACT</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
            <p className="flex items-center text-gray-700 mb-2">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <a href="mailto:hopechurchact@gmail.com" className="hover:text-gray-900">hopechurchact@gmail.com</a>
            </p>
            <p className="flex items-center text-gray-700 mb-2">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              <span className="font-medium">Mailing Address:</span>
            </p>
            <p className="text-gray-700 ml-7 mb-1">P.O. Box 3444</p>
            <p className="text-gray-700 ml-7">Belconnen ACT 2616</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Tithes & Offerings</h3>
            <p className="text-gray-700 mb-3">Tithes, offerings and donations can be made to:</p>
            <p className="text-gray-700 mb-1"><span className="font-medium">Hope Church Canberra</span></p>
            <p className="text-gray-700 mb-1"><span className="font-medium">BSB:</span> 032-778</p>
            <p className="text-gray-700"><span className="font-medium">ACC:</span> 392865</p>
          </div>
        </div>
        
        <div className="md:w-1/2 md:self-center">
          <div className="max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-3 text-center">Find Us on the Map</h3>
            {/* Google Map */}
            <div className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6514.359999764052!2d149.1219398!3d-35.2766507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b164dee05699c33%3A0x35dc37aecc1fb698!2sCultural%20Centre%20Kambri%20(ANU%20Building%20153)!5e0!3m2!1sen!2sau!4v1745560202371!5m2!1sen!2sau" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church Location Map"
              ></iframe>
            </div>
            <div className="bg-gray-100 p-3 rounded-b-lg shadow-md">
              <p className="text-gray-700 text-center">
                We are conveniently located within the ANU campus, easily accessible 
                from the city center and public transportation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const VisitFAQ = () => {
  return (
    <section className="visit-faq py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visitFaqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <div className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <div className="py-16 bg-gray-900">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-white mb-6">We Look Forward to Your Visit</h2>
      <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
        Whether you're exploring faith for the first time or looking for a new church community, we welcome you to join our family.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/events" className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
          View Events
        </Link>
        <a href="mailto:hopechurchact@gmail.com" className="bg-transparent hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg border-2 border-white transition duration-300">
          Contact Us
        </a>
      </div>
    </div>
  </div>
);

const VisitUs = () => {
  return (
    <div>
      <PageHeader 
        title={"Visit Us"}
        subtitle="Learn how to find us and join our activities and worship"
        backgroundImage="/images/Ushering.jpg"
      />
      <LocationInfo />
      <VisitFAQ />
      <CTASection />
    </div>
  );
};

export default VisitUs; 