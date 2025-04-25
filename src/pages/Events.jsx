import React, { useState, useEffect } from 'react';
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
  
  // For last Tuesday of the month (Encounter Night)
  const isLastWeekOfMonth = weekOfMonth >= 20;
  
  // Generate dates until we have enough or exceed the end year
  while (dates.length < count && current.year <= endYear) {
    // Find the first occurrence of the day in the month
    let targetDate = current.set({ day: 1 });
    while (targetDate.weekday !== dayOfWeek) {
      targetDate = targetDate.plus({ days: 1 });
    }
    
    if (isLastWeekOfMonth) {
      // For "last Tuesday of month" type events
      // Find the last day of the month
      const lastDay = current.endOf('month');
      // Start from the last day and go backwards until we find the right weekday
      let lastOccurrence = lastDay;
      while (lastOccurrence.weekday !== dayOfWeek) {
        lastOccurrence = lastOccurrence.minus({ days: 1 });
      }
      targetDate = lastOccurrence;
    } else {
      // Adjust to the specified week of the month (e.g., 4th Tuesday)
      if (weekOfMonth > 1) {
        targetDate = targetDate.plus({ weeks: weekOfMonth - 1 });
        
        // If this pushes us into the next month, use the last occurrence in the current month
        if (targetDate.month !== current.month) {
          targetDate = targetDate.minus({ weeks: 1 });
        }
      }
    }
    
    // Add the date if it's still in the target year range
    if (targetDate.year <= endYear && targetDate.year >= startYear) {
      dates.push(targetDate.toISODate());
    }
    
    // Move to the next month
    current = current.plus({ months: 1 });
  }
  
  // For debugging
  if (dayOfWeek === 2 && weekOfMonth === 99) {
    console.log('Generated Encounter Night dates:', dates);
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
    location: "Kambri Cultural Centre",
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
  ...generateMonthlyDatesForDayOfWeek(currentYear, nextYear, 2, 99, 24).map((date, i) => ({
    id: `encounter-night-${i}`,
    title: "Encounter Night",
    date: date,
    time: "07:00 PM",
    location: "Vision Church",
    description: "A night of extended worship and prayer.",
    image: "/images/Events/Encounter Night.jpg",
    category: "Worship",
    isMonthly: true
  })),

  // Recurring Events - Community Service (weekly on Saturdays)
  ...generateDatesForDayOfWeek(currentYear, nextYear, 6, 104).map((date, i) => ({
    id: `community-service-${i}`,
    title: "Community Service",
    date: null,
    time: "Date and time to be announced",
    location: "The Early Morning Centre",
    description: "Serving our local community through various outreach projects.",
    image: "/images/Events/Community Service.jpg",
    category: "Service"
  })),

  // Annual Events (occur once per year)
  {
    id: `church-camp-${currentYear}`,
    title: "Church Camp",
    date: null,
    endDate: null,
    time: "TBC",
    location: "TBC",
    description: "Three days of outdoor activities, fellowship, and spiritual growth for church families.",
    image: "/images/Church Fire.jpg",
    category: "Workshop",
    isMultiDay: true,
    detailedInfo: {
      expectations: [
        "Spiritual Growth & Reflection - Bible study and writing activities",
        "Participate in the themed Lifegroup Skit",
        "Fellowship & Connection through Guardian Angel activity",
        "Campfire night skits, discussions, and games",
        "Comfortable clothing, outdoor sports gear, and snacks for casual social times"
      ]
    }
  },
  {
    id: `womens-fellowship-${currentYear}`,
    title: "Women's Morning Tea",
    date: null,
    time: "TBC",
    location: "TBC",
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
    date: null,
    time: "TBC",
    location: "TBC",
    description: "Witness and celebrate new believers taking their next step in faith.",
    image: "/images/Events/WaterBaptism.jpg",
    category: "Service"
  },
  // Heaven Invade Worship Concert
  {
    id: `heaven-invade-${nextYear}`,
    title: "Heaven Invade Worship Concert",
    date: null,
    time: "TBC",
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

// Event list component
const EventList = ({ events }) => {
  // Format date for display
  const formatDate = (event) => {
    if (!event || !event.date) return "Date to be announced";
    
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
    
    if (event.time === "TBC") {
      return `${startDate} (Time to be announced)`;
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
  // Get the filtered events (showing only nearest future occurrences of recurring events)
  const getFilteredEvents = () => {
    // Get current date
    const now = new Date();
    
    // Identify recurring event types from their IDs
    const recurringTypes = ['sunday-service', 'kids-church', 'encounter-night', 'community-service', 'worship-night'];
    
    // Group events by recurring type
    const eventsByType = {};
    recurringTypes.forEach(type => {
      eventsByType[type] = [];
    });
    
    // Separate recurring events from one-time events
    const oneTimeEvents = [];
    const weeklyRecurringEvents = [];
    const monthlyRecurringEvents = [];
    
    eventsData.forEach(event => {
      let isRecurring = false;
      
      // Check if this is a recurring event
      for (const type of recurringTypes) {
        if (event.id.includes(type)) {
          eventsByType[type].push(event);
          
          // Special handling for monthly events like Encounter Night
          if (type === 'encounter-night') {
            monthlyRecurringEvents.push(event);
          } else {
            weeklyRecurringEvents.push(event);
          }
          
          isRecurring = true;
          break;
        }
      }
      
      // If not recurring, add to one-time events
      if (!isRecurring) {
        oneTimeEvents.push(event);
      }
    });
    
    // Find nearest future occurrence for each weekly recurring event type
    const nearestWeeklyEvents = [];
    
    // Process weekly recurring events
    Object.keys(eventsByType).forEach(type => {
      if (type !== 'encounter-night' && eventsByType[type].length > 0) {
        // Filter future events
        const futureEvents = eventsByType[type].filter(e => new Date(e.date) >= now);
        
        // Sort by date (ascending)
        futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Add the nearest one (if exists)
        if (futureEvents.length > 0) {
          nearestWeeklyEvents.push(futureEvents[0]);
        } else {
          // If no future events, add the last past occurrence
          const pastEvents = eventsByType[type].sort((a, b) => new Date(b.date) - new Date(a.date));
          if (pastEvents.length > 0) {
            nearestWeeklyEvents.push(pastEvents[0]);
          }
        }
      }
    });
    
    // For monthly events like Encounter Night, show only the nearest one
    const nearestMonthlyEvents = [];
    
    // Process Encounter Night events
    if (eventsByType['encounter-night'] && eventsByType['encounter-night'].length > 0) {
      // Filter future events
      const futureEvents = eventsByType['encounter-night'].filter(e => new Date(e.date) >= now);
      
      // Sort by date (ascending)
      futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      
      // Add only the nearest occurrence
      if (futureEvents.length > 0) {
        nearestMonthlyEvents.push(futureEvents[0]);
      } else {
        // If no future events, add the last past occurrence
        const pastEvents = eventsByType['encounter-night'].sort((a, b) => new Date(b.date) - new Date(a.date));
        if (pastEvents.length > 0) {
          nearestMonthlyEvents.push(pastEvents[0]);
        }
      }
    }
    
    // Combine one-time events with nearest recurring events
    return [...oneTimeEvents, ...nearestWeeklyEvents, ...nearestMonthlyEvents];
  };
  
  // Get the filtered events list (memoized)
  const filteredEventsList = React.useMemo(() => getFilteredEvents(), [eventsData]);
  
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
        
        {filteredEvents.length > 0 ? (
          <EventList events={filteredEvents} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No events found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events; 