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

// Event list component
const EventList = ({ events }) => {
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
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md">
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
                  <Link 
                    to={`/events/${event.id}`} 
                    className="text-gray-700 hover:text-black font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {groupedEvents.annual.length > 0 && (
        <>
          <h3 className="text-2xl font-semibold mb-6 mt-8">Annual Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupedEvents.annual.map(event => (
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md">
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
                  <Link 
                    to={`/events/${event.id}`} 
                    className="text-gray-700 hover:text-black font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
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

// Search and filter component
const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    time: 'all', // 'all', 'upcoming', 'past'
    type: 'all' // 'all', 'Worship', 'Service', 'Workshop', 'Children'
  });
  
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  const handleFilterChange = (key, value) => {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
    onFilter(newFilter);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input 
            type="text" 
            placeholder="Search events..." 
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-gray-800 text-white px-4 py-2 rounded-r hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Filter by Time</label>
          <select 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            value={filter.time}
            onChange={(e) => handleFilterChange('time', e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming Events</option>
            <option value="past">Past Events</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Filter by Type</label>
          <select 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            value={filter.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Worship">Worship</option>
            <option value="Service">Service</option>
            <option value="Workshop">Workshop</option>
            <option value="Children">Children</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Main page component
const Events = () => {
  // Get the filtered events list (memoized)
  const filteredEventsList = React.useMemo(() => getFilteredEvents(), []);
  
  // Initialize state
  const [filteredEvents, setFilteredEvents] = useState(filteredEventsList);
  
  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredEvents(filteredEventsList);
      return;
    }
    
    const filtered = filteredEventsList.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredEvents(filtered);
  };
  
  // Handle filter
  const handleFilter = (filter) => {
    let filtered = [...filteredEventsList];
    
    // Filter by time
    if (filter.time === 'upcoming') {
      filtered = filtered.filter(event => event.date && new Date(event.date) >= new Date());
    } else if (filter.time === 'past') {
      filtered = filtered.filter(event => event.date && new Date(event.date) < new Date());
    }
    
    // Filter by type
    if (filter.type !== 'all') {
      filtered = filtered.filter(event => event.category === filter.type);
    }
    
    setFilteredEvents(filtered);
  };
  
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
        
        <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
        
        <EventList events={filteredEvents} />
      </div>
    </div>
  );
};

export default Events;
export { processedEvents as allEventsData }; 