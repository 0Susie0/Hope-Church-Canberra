import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  processedEvents, 
  getFilteredEvents, 
  formatDate as formatEventDate
} from '../data/dataService';

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

// Reusable EventCard component
const EventCard = ({ event, facebookLink, formatDate }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <div className="h-48 bg-gray-300">
      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
    </div>
    <div className="p-6">
      <div className="text-sm text-gray-600 mb-2">
        {!event.date ? "Date and time to be announced" : formatDate(event)}
      </div>
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="flex items-center text-gray-700 mb-4">
        <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
        </svg>
        {event.location}
      </div>
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

// Event list component
const EventList = ({ events }) => {
  // Facebook link for all events
  const facebookLink = "https://www.facebook.com/HopeCanberra";
  // Format date for display
  const formatDate = (event) => {
    return formatEventDate(event);
  };

  // Group events by frequency type
  const groupedEvents = React.useMemo(() => {
    // Separate recurring and annual events
    const recurring = events.filter(event => 
      event.id.includes('sunday-service') || 
      event.id.includes('kids-church') || 
      event.id.includes('encounter-night') ||
      event.id.includes('community-service') ||
      event.id.includes('water-baptism')
    );
    
    const annual = events.filter(event => 
      !event.id.includes('sunday-service') && 
      !event.id.includes('kids-church') && 
      !event.id.includes('encounter-night') &&
      !event.id.includes('community-service') &&
      !event.id.includes('water-baptism')
    );

    // Sort recurring events by frequency (weekly first, then monthly, then community service, then water baptism)
    const sortedRecurring = [...recurring].sort((a, b) => {
      // Weekly events first (Sunday service, kids church)
      if ((a.id.includes('sunday-service') || a.id.includes('kids-church')) && 
          !(b.id.includes('sunday-service') || b.id.includes('kids-church'))) {
        return -1;
      }
      if (!(a.id.includes('sunday-service') || a.id.includes('kids-church')) && 
          (b.id.includes('sunday-service') || b.id.includes('kids-church'))) {
        return 1;
      }
      
      // Encounter Night events second
      if (a.id.includes('encounter-night') && !b.id.includes('encounter-night')) {
        return -1;
      }
      if (!a.id.includes('encounter-night') && b.id.includes('encounter-night')) {
        return 1;
      }
      
      // Community Service events third
      if (a.id.includes('community-service') && !b.id.includes('community-service')) {
        return -1;
      }
      if (!a.id.includes('community-service') && b.id.includes('community-service')) {
        return 1;
      }
      
      // Water baptism events fourth
      if (a.id.includes('water-baptism') && !b.id.includes('water-baptism')) {
        return -1;
      }
      if (!a.id.includes('water-baptism') && b.id.includes('water-baptism')) {
        return 1;
      }
      
      // Sort by date
      if (a.date && b.date) {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

    // Sort annual events by date
    const sortedAnnual = [...annual].sort((a, b) => {
      if (a.date && b.date) {
        return new Date(a.date) - new Date(b.date);
      }
      // If no date, sort by title
      if (!a.date && !b.date) {
        return a.title.localeCompare(b.title);
      }
      // Events with dates come first
      return a.date ? -1 : 1;
    });

    return { recurring: sortedRecurring, annual: sortedAnnual };
  }, [events]);
  
  return (
    <div>
      {groupedEvents.recurring.length > 0 && (
        <>
          <h3 className="text-2xl font-semibold mb-6 mt-8">Recurring Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {groupedEvents.recurring.map(event => (
              <EventCard key={event.id} event={event} facebookLink={facebookLink} formatDate={formatDate} />
            ))}
          </div>
        </>
      )}

      {groupedEvents.annual.length > 0 && (
        <>
          <h3 className="text-2xl font-semibold mb-6 mt-8">Annual Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupedEvents.annual.map(event => (
              <EventCard key={event.id} event={event} facebookLink={facebookLink} formatDate={formatDate} />
            ))}
          </div>
        </>
      )}

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No events found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

// Main page component
const Events = () => {
  return (
    <div>
      <PageHeader 
        title="Events" 
        subtitle="Join us in our upcoming events and activities"
        backgroundImage="/images/Events/ChurchCamp.jpg"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Church Events</h2>
        </div>
        
        <EventList events={getFilteredEvents()} />
      </div>
    </div>
  );
};

export default Events;
export { processedEvents as allEventsData }; 