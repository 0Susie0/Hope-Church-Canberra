import React, { useState } from 'react';
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

// Mock event data
export const eventsData = [
  // Recurring Events - Sunday Service (weekly)
  ...Array.from({ length: 104 }, (_, i) => {
    const startDate = new Date(2025, 0, 5); // First Sunday of 2025
    startDate.setDate(startDate.getDate() + (i * 7)); // Add weeks
    if (startDate.getFullYear() <= 2026) { // Only include 2025-2026
      return {
        id: `sunday-service-${i}`,
        title: "Sunday Service",
        date: startDate.toISOString().split('T')[0],
        time: "10:00 AM",
        location: "Copland Theater",
        description: "Join us for our weekly worship service.",
        image: "/images/Events/SundayService.jpg",
        category: "Service"
      };
    }
    return null;
  }).filter(Boolean),

  // Recurring Events - Kids Church (weekly, same as Sunday Service)
  ...Array.from({ length: 104 }, (_, i) => {
    const startDate = new Date(2025, 0, 5); // First Sunday of 2025
    startDate.setDate(startDate.getDate() + (i * 7)); // Add weeks
    if (startDate.getFullYear() <= 2026) { // Only include 2025-2026
      return {
        id: `kids-church-${i}`,
        title: "Kids Church",
        date: startDate.toISOString().split('T')[0],
        time: "10:00 AM",
        location: "Kids Area",
        description: "A special program for children with games, stories, and activities.",
        image: "/images/Events/KidsChurch.jpg",
        category: "Children"
      };
    }
    return null;
  }).filter(Boolean),

  // Recurring Events - Encounter Night (monthly)
  ...Array.from({ length: 24 }, (_, i) => {
    const startDate = new Date(2025, 0, 28); // First Encounter Night - Jan 28, 2025
    startDate.setMonth(startDate.getMonth() + i);
    if (startDate.getFullYear() <= 2026) { // Only include 2025-2026
      return {
        id: `encounter-night-${i}`,
        title: "Encounter Night",
        date: startDate.toISOString().split('T')[0],
        time: "07:00 PM",
        location: "Vision Church",
        description: "A night of extended worship and prayer.",
        image: "/images/Events/Encounter Night.jpg",
        category: "Worship"
      };
    }
    return null;
  }).filter(Boolean),

  // Recurring Events - Community Service (weekly on Saturdays)
  ...Array.from({ length: 104 }, (_, i) => {
    const startDate = new Date(2025, 0, 4); // First Saturday of 2025
    startDate.setDate(startDate.getDate() + (i * 7)); // Add weeks
    if (startDate.getFullYear() <= 2026) { // Only include 2025-2026
      return {
        id: `community-service-${i}`,
        title: "Community Service",
        date: startDate.toISOString().split('T')[0],
        time: "10:00 AM",
        location: "The Early Morning Centre",
        description: "Serving our local community through various outreach projects.",
        image: "/images/Events/Community Service.jpg",
        category: "Service"
      };
    }
    return null;
  }).filter(Boolean),

  // One-time Events
  {
    id: "womens-morning-tea-2025",
    title: "Women's Morning Tea",
    date: "2025-03-01",
    time: "10:00 AM",
    location: "Rotate in different locations",
    description: "A time of fellowship and encouragement for women.",
    image: "/images/Events/Women's Morning Tea.jpg",
    category: "Workshop"
  },
  {
    id: "water-baptism-2025",
    title: "Water Baptism",
    date: "2025-02-19",
    time: "06:00 PM",
    location: "Depends on the weather",
    description: "Witness and celebrate new believers taking their next step in faith.",
    image: "/images/Events/WaterBaptism.jpg",
    category: "Service"
  },
  // Heaven Invade Worship Concert (yearly placeholder)
  {
    id: "heaven-invade-2025",
    title: "Heaven Invade Worship Concert",
    date: "2025-07-01", // Placeholder date
    time: "TBA",
    location: "T2 Kambri",
    description: "A special concert of worship and praise with our worship team. Date to be announced.",
    image: "/images/Worship3.jpg",
    category: "Worship",
    isPlaceholder: true
  },
  {
    id: "heaven-invade-2026",
    title: "Heaven Invade Worship Concert",
    date: "2026-01-01", // Placeholder date
    time: "TBA",
    location: "T2 Kambri",
    description: "A special concert of worship and praise with our worship team. Date to be announced.",
    image: "/images/Worship3.jpg",
    category: "Worship",
    isPlaceholder: true
  }
];

// Date formatting function
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Calendar component
const Calendar = ({ events, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // Start from 2025
  const [currentView, setCurrentView] = useState('month'); // 'month', 'week', 'day'
  
  // Pre-process events to only include nearest future occurrences of recurring events
  const getFilteredCalendarEvents = () => {
    // Get current date
    const now = new Date();
    
    // Identify recurring event types from their IDs
    const recurringTypes = ['sunday-service', 'kids-church', 'encounter-night', 'community-service'];
    
    // Group events by recurring type
    const eventsByType = {};
    recurringTypes.forEach(type => {
      eventsByType[type] = [];
    });
    
    // Separate recurring events from one-time events
    const oneTimeEvents = [];
    
    events.forEach(event => {
      let isRecurring = false;
      
      // Check if this is a recurring event
      for (const type of recurringTypes) {
        if (event.id.includes(type)) {
          eventsByType[type].push(event);
          isRecurring = true;
          break;
        }
      }
      
      // If not recurring, add to one-time events
      if (!isRecurring) {
        oneTimeEvents.push(event);
      }
    });
    
    // Find nearest future occurrence for each recurring event type
    const nearestRecurringEvents = [];
    
    recurringTypes.forEach(type => {
      if (eventsByType[type].length > 0) {
        // Filter future events
        const futureEvents = eventsByType[type].filter(e => new Date(e.date) >= now);
        
        // Sort by date (ascending)
        futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Add the nearest one (if exists)
        if (futureEvents.length > 0) {
          nearestRecurringEvents.push(futureEvents[0]);
        } else {
          // If no future events, add the last past occurrence
          const pastEvents = eventsByType[type].sort((a, b) => new Date(b.date) - new Date(a.date));
          if (pastEvents.length > 0) {
            nearestRecurringEvents.push(pastEvents[0]);
          }
        }
      }
    });
    
    // Combine one-time events with nearest recurring events
    return [...oneTimeEvents, ...nearestRecurringEvents];
  };
  
  // Memoize filtered events to avoid recalculating on every render
  const filteredCalendarEvents = React.useMemo(() => getFilteredCalendarEvents(), [events]);
  
  // Get the number of days in the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get the day of the week for the first day of the current month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Generate month view
  const generateMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add days from the previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days from the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Divide days into weeks
    const weeks = [];
    let week = [];
    
    days.forEach((day, index) => {
      if (index % 7 === 0 && index > 0) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
      if (index === days.length - 1) {
        weeks.push(week);
      }
    });
    
    return weeks;
  };
  
  // Check if a day has events (using filtered events)
  const hasEvents = (day) => {
    if (!day) return false;
    
    return filteredCalendarEvents.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day.getDate() &&
             eventDate.getMonth() === day.getMonth() &&
             eventDate.getFullYear() === day.getFullYear();
    });
  };
  
  // Get events for a specific day (using filtered events)
  const getEventsForDay = (day) => {
    if (!day) return [];
    
    return filteredCalendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day.getDate() &&
             eventDate.getMonth() === day.getMonth() &&
             eventDate.getFullYear() === day.getFullYear();
    });
  };
  
  // Go to previous month/week/day
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
      if (newDate.getFullYear() >= 2025) {
        setCurrentDate(newDate);
      }
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
      if (newDate.getFullYear() >= 2025) {
        setCurrentDate(newDate);
      }
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
      if (newDate.getFullYear() >= 2025) {
        setCurrentDate(newDate);
      }
    }
  };
  
  // Go to next month/week/day
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
      if (newDate.getFullYear() <= 2026) {
        setCurrentDate(newDate);
      }
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
      if (newDate.getFullYear() <= 2026) {
        setCurrentDate(newDate);
      }
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
      if (newDate.getFullYear() <= 2026) {
        setCurrentDate(newDate);
      }
    }
  };
  
  // Change view
  const changeView = (view) => {
    setCurrentView(view);
  };
  
  // Render month view
  const renderMonthView = () => {
    const weeks = generateMonthView();
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <button 
            onClick={goToPrevious}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleString('en-US', { year: 'numeric', month: 'long' })}
          </h2>
          <button 
            onClick={goToNext}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="bg-gray-50 text-center py-2">
              <span className="text-sm font-medium text-gray-500">{day}</span>
            </div>
          ))}
          
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => (
                <div 
                  key={dayIndex} 
                  className={`bg-white min-h-[80px] p-2 ${
                    day && day.getDate() === new Date().getDate() && 
                    day.getMonth() === new Date().getMonth() && 
                    day.getFullYear() === new Date().getFullYear() 
                      ? 'bg-gray-100' 
                      : ''
                  }`}
                  onClick={() => day && onDateClick(day)}
                >
                  {day && (
                    <>
                      <div className="flex justify-between">
                        <span className={`text-sm ${
                          day.getDate() === new Date().getDate() && 
                          day.getMonth() === new Date().getMonth() && 
                          day.getFullYear() === new Date().getFullYear() 
                            ? 'font-bold text-gray-900' 
                            : 'text-gray-700'
                        }`}>
                          {day.getDate()}
                        </span>
                        {hasEvents(day) && (
                          <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
                        )}
                      </div>
                      <div className="mt-1">
                        {getEventsForDay(day).slice(0, 2).map((event, eventIndex) => (
                          <div 
                            key={eventIndex} 
                            className="text-xs truncate p-1 mb-1 rounded bg-gray-200 text-gray-800"
                          >
                            {event.title}
                          </div>
                        ))}
                        {getEventsForDay(day).length > 2 && (
                          <div className="text-xs text-gray-500 pl-1">
                            +{getEventsForDay(day).length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => changeView('month')} 
            className={`px-4 py-2 rounded ${currentView === 'month' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Month View
          </button>
          <button 
            onClick={() => changeView('week')} 
            className={`px-4 py-2 rounded ${currentView === 'week' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Week View
          </button>
          <button 
            onClick={() => changeView('day')} 
            className={`px-4 py-2 rounded ${currentView === 'day' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Day View
          </button>
        </div>
        <button 
          onClick={() => setCurrentDate(new Date(2025, 0, 1))} 
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
        >
          Reset View
        </button>
      </div>
      
      {currentView === 'month' && renderMonthView()}
      {currentView === 'week' && <div className="text-center p-8 bg-white rounded-lg shadow">Week view feature is under development</div>}
      {currentView === 'day' && <div className="text-center p-8 bg-white rounded-lg shadow">Day view feature is under development</div>}
    </div>
  );
};

// Event list component
const EventList = ({ events }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map(event => (
        <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-600 mb-2">
              {event.date} at {event.time}
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
              className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-150"
            >
              Learn More
            </Link>
          </div>
        </div>
      ))}
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
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  
  // Get the filtered events (showing only nearest future occurrences of recurring events)
  const getFilteredEvents = () => {
    // Get current date
    const now = new Date();
    
    // Identify recurring event types from their IDs
    const recurringTypes = ['sunday-service', 'kids-church', 'encounter-night', 'community-service'];
    
    // Group events by recurring type
    const eventsByType = {};
    recurringTypes.forEach(type => {
      eventsByType[type] = [];
    });
    
    // Separate recurring events from one-time events
    const oneTimeEvents = [];
    
    eventsData.forEach(event => {
      let isRecurring = false;
      
      // Check if this is a recurring event
      for (const type of recurringTypes) {
        if (event.id.includes(type)) {
          eventsByType[type].push(event);
          isRecurring = true;
          break;
        }
      }
      
      // If not recurring, add to one-time events
      if (!isRecurring) {
        oneTimeEvents.push(event);
      }
    });
    
    // Find nearest future occurrence for each recurring event type
    const nearestRecurringEvents = [];
    
    recurringTypes.forEach(type => {
      if (eventsByType[type].length > 0) {
        // Filter future events
        const futureEvents = eventsByType[type].filter(e => new Date(e.date) >= now);
        
        // Sort by date (ascending)
        futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Add the nearest one (if exists)
        if (futureEvents.length > 0) {
          nearestRecurringEvents.push(futureEvents[0]);
        } else {
          // If no future events, add the last past occurrence
          const pastEvents = eventsByType[type].sort((a, b) => new Date(b.date) - new Date(a.date));
          if (pastEvents.length > 0) {
            nearestRecurringEvents.push(pastEvents[0]);
          }
        }
      }
    });
    
    // Combine one-time events with nearest recurring events
    return [...oneTimeEvents, ...nearestRecurringEvents];
  };
  
  // Initialize with filtered events
  const [filteredEvents, setFilteredEvents] = useState(getFilteredEvents());
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Get the filtered events list (memoized)
  const filteredEventsList = React.useMemo(() => getFilteredEvents(), []);
  
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
      filtered = filtered.filter(event => new Date(event.date) >= new Date());
    } else if (filter.time === 'past') {
      filtered = filtered.filter(event => new Date(event.date) < new Date());
    }
    
    // Filter by type
    if (filter.type !== 'all') {
      filtered = filtered.filter(event => event.category === filter.type);
    }
    
    setFilteredEvents(filtered);
  };
  
  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    
    const selectedDateEvents = filteredEventsList.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
    
    // Set filtered events for list view to show events on the selected date
    setFilteredEvents(selectedDateEvents);
  };
  
  // Reset filter when clearing date filter
  const clearDateFilter = () => {
    setSelectedDate(null);
    setFilteredEvents(filteredEventsList);
  };
  
  return (
    <div>
      <PageHeader 
        title="Events & Calendar" 
        subtitle="Join us in our upcoming events and activities"
        backgroundImage="/images/Events/ChurchCamp.jpg"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Church Events</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setView('list')} 
              className={`px-4 py-2 rounded ${view === 'list' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              List View
            </button>
            <button 
              onClick={() => setView('calendar')} 
              className={`px-4 py-2 rounded ${view === 'calendar' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Calendar View
            </button>
          </div>
        </div>
        
        <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
        
        {selectedDate && (
          <div className="bg-gray-100 p-4 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Events for {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
              <button 
                onClick={clearDateFilter}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear Filter
              </button>
            </div>
          </div>
        )}
        
        {view === 'list' ? (
          filteredEvents.length > 0 ? (
            <EventList events={filteredEvents} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No events found matching your criteria</p>
            </div>
          )
        ) : (
          <Calendar events={eventsData} onDateClick={handleDateClick} />
        )}
      </div>
    </div>
  );
};

export default Events; 