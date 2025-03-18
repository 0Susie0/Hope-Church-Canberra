import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, subtitle, backgroundImage }) => (
  <div className="relative bg-gray-900 py-20">
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

const LifeGroupsSection = () => {
  const lifeGroups = [
    {
      id: 1,
      name: "Zion Life Group",
      leader: "John & Mary Smith",
      time: "Friday 7:30 PM",
      location: "Belconnen",
      description: "A vibrant young adults group focused on deep Bible study and community building.",
      image: "/images/Lifegroups/Zion.jpg"
    },
    {
      id: 2,
      name: "Eden Life Group",
      leader: "David & Sarah Johnson",
      time: "Wednesday 7:00 PM",
      location: "Gungahlin",
      description: "A welcoming family group that combines worship, prayer, and fellowship.",
      image: "/images/Lifegroups/Eden.jpg"
    },
    {
      id: 3,
      name: "Bethel Life Group",
      leader: "Michael & Emma Wilson",
      time: "Thursday 7:30 PM",
      location: "Woden",
      description: "A diverse group that focuses on prayer and spiritual growth.",
      image: "/images/Lifegroups/Bethel.jpg"
    },
    {
      id: 4,
      name: "Hope on Campus",
      leader: "James Lee",
      time: "Tuesday 6:00 PM",
      location: "ANU Campus",
      description: "A dynamic student group meeting on campus for fellowship and Bible study.",
      image: "/images/Lifegroups/HopeOnCampus.jpg"
    },
    {
      id: 5,
      name: "Ablaze Youth",
      leader: "Daniel & Rachel Brown",
      time: "Friday 6:30 PM",
      location: "Church",
      description: "Our youth group for teenagers, full of energy and passion for God.",
      image: "/images/Lifegroups/Ablaze.jpg"
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Life Groups</h2>
          <div className="w-20 h-1 bg-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Life groups are an important part of our church, providing a small, intimate environment where members can build relationships, learn, and grow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lifeGroups.map((group, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-300">
                <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="border-t pt-4">
                  <p className="flex items-center text-gray-700 mb-2">
                    <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                    {group.time}
                  </p>
                  <p className="flex items-center text-gray-700 mb-2">
                    <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    {group.location}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                    Leader: {group.leader}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-700 mb-6">Want to join a life group or learn more?</p>
          <Link to="/contact" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

const LifeGroups = () => {
  return (
    <div>
      <PageHeader 
        title="Life Groups" 
        subtitle="Find your community and grow together in faith"
        backgroundImage="/images/Connection.jpg"
      />
      <LifeGroupsSection />
    </div>
  );
};

export default LifeGroups; 