import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

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

// Helper function to generate dates that fall on a specific day of week
const generateDatesForDayOfWeek = (startYear, endYear, dayOfWeek, count) => {
  const dates = [];
  
  // Create a DateTime object for January 1st of the start year
  let current = DateTime.local(startYear, 1, 1);
  
  // Move to the first occurrence of the desired day of week
  while (current.weekday !== dayOfWeek) {
    current = current.plus({ days: 1 });
  }
  
  // Generate dates until we have enough or exceed the end year
  while (dates.length < count && current.year <= endYear) {
    dates.push(current.toISODate());
    current = current.plus({ weeks: 1 });
  }
  
  return dates;
};

// Helper function to generate monthly dates that fall on a specific day of week
const generateMonthlyDatesForDayOfWeek = (startYear, endYear, dayOfWeek, weekOfMonth, count) => {
  const dates = [];
  
  // Create a DateTime object for January 1st of the start year
  let current = DateTime.local(startYear, 1, 1);
  
  // Generate dates until we have enough or exceed the end year
  while (dates.length < count && current.year <= endYear) {
    // Find the first occurrence of the day in the month
    let targetDate = current.set({ day: 1 });
    while (targetDate.weekday !== dayOfWeek) {
      targetDate = targetDate.plus({ days: 1 });
    }
    
    // Adjust to the specified week of the month (e.g., 4th Tuesday)
    if (weekOfMonth > 1) {
      targetDate = targetDate.plus({ weeks: weekOfMonth - 1 });
      
      // If this pushes us into the next month, use the last occurrence in the current month
      if (targetDate.month !== current.month) {
        targetDate = targetDate.minus({ weeks: 1 });
      }
    }
    
    // Add the date if it's still in the target year range
    if (targetDate.year <= endYear && targetDate.year >= startYear) {
      dates.push(targetDate.toISODate());
    }
    
    // Move to the next month
    current = current.plus({ months: 1 });
  }
  
  return dates;
};

// Get current year and next year
const currentYear = DateTime.now().year;
const nextYear = currentYear + 1;

// Mock event data
export const eventsData = [
  // Recurring Events - Sunday Service (weekly on Sundays)
  ...generateDatesForDayOfWeek(currentYear, nextYear, 7, 104).map((date, i) => ({
    id: `sunday-service-${i}`,
    title: "Sunday Service",
    date: date,
    time: "10:00 AM",
    location: "Copland Theater",
    description: "Join us for our weekly worship service.",
    image: "/images/Events/SundayService.jpg",
    category: "Service"
  })),

  // Recurring Events - Kids Church (weekly on Sundays)
  ...generateDatesForDayOfWeek(currentYear, nextYear, 7, 104).map((date, i) => ({
    id: `kids-church-${i}`,
    title: "Kids Church",
    date: date,
    time: "10:00 AM",
    location: "Kids Area",
    description: "A special program for children with games, stories, and activities.",
    image: "/images/Events/KidsChurch.jpg",
    category: "Children"
  })),

  // Recurring Events - Encounter Night (monthly on the last Tuesday)
  ...generateMonthlyDatesForDayOfWeek(currentYear, nextYear, 2, 24).map((date, i) => ({
    id: `encounter-night-${i}`,
    title: "Encounter Night",
    date: date,
    time: "07:00 PM",
    location: "Vision Church",
    description: "A night of extended worship and prayer.",
    image: "/images/Events/Encounter Night.jpg",
    category: "Worship"
  })),

  // Recurring Events - Community Service (weekly on Saturdays)
  ...generateDatesForDayOfWeek(currentYear, nextYear, 6, 104).map((date, i) => ({
    id: `community-service-${i}`,
    title: "Community Service",
    date: date,
    time: "10:00 AM",
    location: "The Early Morning Centre",
    description: "Serving our local community through various outreach projects.",
    image: "/images/Events/Community Service.jpg",
    category: "Service"
  })),

  // Annual Events (occur once per year)
  {
    id: `church-camp-${currentYear}`,
    title: "Church Camp",
    date: `${currentYear}-03-21`,
    endDate: `${currentYear}-03-23`,
    time: "All Day",
    location: "Warrambui Retreat and Conference Centre",
    description: "Three days of outdoor activities, fellowship, and spiritual growth for church families.",
    image: "/images/Church Fire.jpg",
    category: "Workshop",
    isMultiDay: true,
    detailedInfo: {
      expectations: [
        "Spiritual Growth & Reflection - Bible study and writing activities",
        "Participate in the 'Recapture' themed Lifegroup Skit",
        "Fellowship & Connection through Guardian Angel activity",
        "Campfire night skits, discussions, and games",
        "Comfortable clothing, outdoor sports gear, and snacks for casual social times"
      ]
    }
  },
  {
    id: `womens-fellowship-${currentYear}`,
    title: "Women's Morning Tea",
    date: `${currentYear}-03-01`,
    time: "10:00 AM",
    location: "Deakin",
    description: "Join us for our first-ever Women's Fellowship — a time to connect, recharge, and grow in faith over warm drinks and heartfelt conversations.",
    image: "/images/Events/Women's Morning Tea.jpg",
    category: "Workshop",
    detailedInfo: {
      expectations: [
        "Drinks, light bites & laughter",
        "Craft tables, women leadership videos, book exchange, and conversation games",
        "Special beauty voucher gifts for participants in sharing & games"
      ],
      toBring: [
        "Garden party attire",
        "Wisdom and stories to share",
        "Curious life questions for games",
        "Devotional books on faith or women's topics for exchange"
      ],
      notes: "Kids and fluffy pets are welcome."
    }
  },
  {
    id: `water-baptism-${currentYear}`,
    title: "Water Baptism",
    date: `${currentYear}-02-19`,
    time: "06:00 PM",
    location: "Depends on the weather",
    description: "Witness and celebrate new believers taking their next step in faith.",
    image: "/images/Events/WaterBaptism.jpg",
    category: "Service"
  },
  // Heaven Invade Worship Concert
  {
    id: `heaven-invade-${nextYear}`,
    title: "Heaven Invade Worship Concert",
    date: "TBC",
    time: "07:00 PM",
    location: "Kambri Cultural Centre",
    description: "A special concert of worship and praise with our worship team.",
    image: "/images/Worship3.jpg",
    category: "Worship"
  }
];

// Date formatting function
const formatDate = (date) => {
  return DateTime.fromISO(date).setLocale('en').toLocaleString(DateTime.DATETIME_FULL);
};

// Calendar component
const Calendar = ({ events, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date(currentYear, 0, 1)); // Start from current year
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
      if (newDate.getFullYear() >= currentYear) {
        setCurrentDate(newDate);
      }
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
      if (newDate.getFullYear() >= currentYear) {
        setCurrentDate(newDate);
      }
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
      if (newDate.getFullYear() >= currentYear) {
        setCurrentDate(newDate);
      }
    }
  };
  
  // Go to next month/week/day
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
      if (newDate.getFullYear() <= nextYear) {
        setCurrentDate(newDate);
      }
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
      if (newDate.getFullYear() <= nextYear) {
        setCurrentDate(newDate);
      }
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
      if (newDate.getFullYear() <= nextYear) {
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
          onClick={() => setCurrentDate(new Date(currentYear, 0, 1))} 
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
  // Format date for display
  const formatDate = (event) => {
    if (!event) return "";
    
    const startDate = DateTime.fromISO(event.date).setLocale('en').toLocaleString({
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
    
    if (event.isMultiDay && event.endDate) {
      const endDate = DateTime.fromISO(event.endDate).setLocale('en').toLocaleString({
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });
      return `${startDate} - ${endDate}`;
    }
    
    return `${startDate} at ${event.time}`;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map(event => (
        <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-600 mb-2">
              {formatDate(event)}
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