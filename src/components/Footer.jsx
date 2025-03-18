import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h4 className="text-xl font-bold mb-4">Hope Church</h4>
            <p className="mb-4">Hope Church is a community filled with love and care. We welcome everyone to join our family.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/HopeCanberra" className="text-white hover:text-primary-300 transition-colors" aria-label="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/hopecanberra/" className="text-white hover:text-primary-300 transition-colors" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.youtube.com/@hopecanberra6351" className="text-white hover:text-primary-300 transition-colors" aria-label="YouTube">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-primary-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-primary-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/lifegroups" className="text-white hover:text-primary-300 transition-colors">Life Groups</Link>
              </li>
              <li>
                <Link to="/events" className="text-white hover:text-primary-300 transition-colors">Events & Calendar</Link>
              </li>
              <li>
                <Link to="/visit" className="text-white hover:text-primary-300 transition-colors">Visit Us</Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-xl font-bold mb-4">Service Times</h4>
            <ul className="space-y-2">
              <li>Sunday 10:00 AM - 12:00 PM</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaPhone className="mr-2" /> <span>(02) 1234 5678</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" /> <span>hopechurchact@gmail.com</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> <span>P.O. Box 123, Canberra, ACT 2601</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {currentYear} Hope Church Canberra. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 