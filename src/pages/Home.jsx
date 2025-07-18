import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  storiesData, 
  getNextOccurrence, 
  currentYear, 
  formatDate, 
  getFilteredEvents, 
  facebookLink 
} from '../data/dataService';

const HeroSection = () => (
  <div className="relative h-screen overflow-hidden">
    {/* Video overlay for darkening the video */}
    <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-5 z-10"></div>
    
    {/* Video background */}
    <video 
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/videos/IntroVideo.mp4" type="video/mp4" />
      {/* Fallback for browsers that don't support video */}
      Your browser does not support the video tag.
    </video>
    
    {/* Content overlay */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20">
      <div className="flex flex-wrap justify-center gap-4">
      </div>
    </div>
  </div>
);

const ServiceInfo = () => {
  // Get service information from data service
  const sundayService = getNextOccurrence("sunday-service");
  
  return (
    <div className="bg-white py-16">
    <div className="container mx-auto px-4">
    {/* heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-2 text-gray-900">
        Service Time &amp; Location
      </h2>
      <div className="w-20 h-1 bg-black mx-auto" />
    </div>

    {/* grid wrapper */}
    <div
      className="
        grid grid-cols-1           
        md:grid-cols-2             
        gap-8 max-w-4xl mx-auto
        justify-items-center       
      "
    >
      {/* single card that spans both cols and stays centred */}
      <div
        className="
          bg-gray-50 p-8 md:p-10   
          rounded-lg shadow-lg
          w-full max-w-2xl         
          md:col-span-2            
        "
      >
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">
          {sundayService.title}
        </h3>

        <p className="mb-3 text-gray-700">
          Sunday {sundayService.time}
        </p>

        <p className="text-gray-700">{sundayService.location}</p>

        <p className="mt-3 text-gray-700">
          *Kids program available
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = storiesData.imageCarousel;
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Our Church</h2>
          <div className="w-20 h-1 bg-black mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-justify">
           Hope Church Canberra is a multicultural, vibrant, Spirit-filled community who love God and people. We are firm believers that the church is not a building but a community of people who share lives together and we would love to welcome you!  Our main worship service is held on Sunday mornings in Canberra city, 10 minutes walk from Canberra Centre.  We seek to be a community of Christ centred believers that are inspired by God's Word and Presence!
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <div className="relative h-96">
              {slides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <p className="text-white text-xl">{slide.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none"
          >
            <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
          
          <button 
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none"
          >
            <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
          
          <div className="flex justify-center mt-4">
            {slides.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === currentSlide ? 'bg-black' : 'bg-gray-300'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable EventCard for events
const EventCard = ({ event, facebookLink }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <div className="h-48 bg-gray-300">
      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
    </div>
    <div className="p-6">
      <div className="text-sm text-gray-600 mb-2">
        {!event.date ? "Date and time to be announced" : formatDate(event)}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{event.title}</h3>
      <p className="text-gray-600 mb-4 text-justify">{event.description}</p>
      <a
        href={facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-black font-medium"
      >
        Learn More →
      </a>
    </div>
  </div>
);

// UpcomingEvents now uses event data from dataService
const UpcomingEvents = () => {
  // Get the next few upcoming events (limit to 3 for homepage)
  const events = getFilteredEvents().slice(0, 3);
  // Use the imported facebookLink for all events

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Upcoming Events</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} facebookLink={facebookLink} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/events" className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            View All Events
          </Link>
        </div>
      </div>
    </div>
  );
};

const CommunityStories = () => {
  const stories = storiesData.communityStories;
  
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Community Stories</h2>
          <div className="w-20 h-1 bg-black mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-justify">
            Hear stories from our community members about their experiences and feelings at Hope Church.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200">
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 text-gray-700 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"></path>
                  </svg>
                  <h3 className="text-xl font-semibold">{story.name}</h3>
                </div>
                <p className="text-gray-600 italic mb-4">"{story.quote}"</p>
                <p className="text-gray-700">{story.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServiceInfo />
      <UpcomingEvents />
      <ImageCarousel />
      <CommunityStories />
    </div>
  );
};

export default Home; 