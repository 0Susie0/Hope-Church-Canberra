import eventsData from './events.json';
import lifeGroupsData from './lifegroups.json';
import storiesData from './stories.json';
import { DateTime } from 'luxon';

// Helper function to calculate Easter Sunday for a given year
// This uses the Meeus/Jones/Butcher algorithm
const calculateEasterSunday = (year) => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  // Return date in ISO format (YYYY-MM-DD)
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

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
  
  return dates;
};

// Get current year and next year
const currentYear = 2025; // Set to 2025 as specified
const nextYear = currentYear + 1;

// Get Easter Sunday for current year
const easterSunday = calculateEasterSunday(currentYear);

// Generate event instances for recurring events
const generateEventInstances = () => {
  const instances = [];
  
  // Sunday Services
  instances.push(
    ...generateDatesForDayOfWeek(currentYear, nextYear, 7, 104).map((date, i) => ({
      id: `sunday-service-${i}`,
      ...eventsData.recurringEvents.sundayService,
      date: date
    }))
  );
  
  // Kids Church
  instances.push(
    ...generateDatesForDayOfWeek(currentYear, nextYear, 7, 104).map((date, i) => ({
      id: `kids-church-${i}`,
      ...eventsData.recurringEvents.kidsChurch,
      date: date
    }))
  );
  
  // Encounter Night
  instances.push(
    ...generateMonthlyDatesForDayOfWeek(currentYear, nextYear, 2, 99, 24).map((date, i) => ({
      id: `encounter-night-${i}`,
      ...eventsData.recurringEvents.encounterNight,
      date: date
    }))
  );
  
  // Community Service
  instances.push(
    ...generateDatesForDayOfWeek(currentYear, nextYear, 6, 104).map((date, i) => ({
      id: `community-service-${i}`,
      ...eventsData.recurringEvents.communityService,
      date: null
    }))
  );
  
  // Water Baptism (3 times a year)
  // Create 3 events per year, but with null dates to show "Date and time to be announced"
  for (let i = 0; i < 3; i++) {
    instances.push({
      id: `water-baptism-${currentYear}-${i}`,
      ...eventsData.recurringEvents.waterBaptism,
      date: null,
      recurrencePattern: "3 times a year"
    });
  }
  
  // Annual Events
  eventsData.annualEvents.forEach(event => {
    const annualEvent = { ...event };
    
    // Add year suffix to id
    annualEvent.id = `${event.id}-${currentYear}`;
    
    // Special handling for Easter
    if (event.id === 'easter-service') {
      annualEvent.date = easterSunday;
    } else {
      annualEvent.date = null;
    }
    
    // Add endDate for multi-day events if needed
    if (event.isMultiDay) {
      annualEvent.endDate = null;
    }
    
    instances.push(annualEvent);
  });
  
  return instances;
};

// Process all events with calculated dates
const processedEvents = generateEventInstances();

// Get the filtered events (showing only nearest future occurrences of recurring events)
const getFilteredEvents = () => {
  // Get current date
  const now = new Date();
  
  // Identify recurring event types from their IDs
  const recurringTypes = ['sunday-service', 'kids-church', 'encounter-night', 'community-service', 'worship-night', 'water-baptism'];
  
  // Group events by recurring type
  const eventsByType = {};
  recurringTypes.forEach(type => {
    eventsByType[type] = [];
  });
  
  // Separate recurring events from one-time events
  const oneTimeEvents = [];
  const weeklyRecurringEvents = [];
  const monthlyRecurringEvents = [];
  
  processedEvents.forEach(event => {
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
      const futureEvents = eventsByType[type].filter(e => e.date && new Date(e.date) >= now);
      
      // Sort by date (ascending)
      futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      
      // Add the nearest one (if exists)
      if (futureEvents.length > 0) {
        nearestWeeklyEvents.push(futureEvents[0]);
      } else {
        // If no future events, add the last past occurrence
        const pastEvents = eventsByType[type].sort((a, b) => 
          a.date && b.date ? new Date(b.date) - new Date(a.date) : 0
        );
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
    const futureEvents = eventsByType['encounter-night'].filter(e => 
      e.date && new Date(e.date) >= now
    );
    
    // Sort by date (ascending)
    futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Add only the nearest occurrence
    if (futureEvents.length > 0) {
      nearestMonthlyEvents.push(futureEvents[0]);
    } else {
      // If no future events, add the last past occurrence
      const pastEvents = eventsByType['encounter-night'].sort((a, b) => 
        a.date && b.date ? new Date(b.date) - new Date(a.date) : 0
      );
      if (pastEvents.length > 0) {
        nearestMonthlyEvents.push(pastEvents[0]);
      }
    }
  }
  
  // Combine one-time events with nearest recurring events
  return [...oneTimeEvents, ...nearestWeeklyEvents, ...nearestMonthlyEvents];
};

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

// Get the next occurrence of a recurring event
const getNextOccurrence = (eventId) => {
  // Find all occurrences of this event type
  const eventType = eventId.split('-').slice(0, -1).join('-');
  const allEventsOfType = processedEvents.filter(e => e.id.startsWith(eventType));
  
  // Find future events
  const now = DateTime.now().setLocale('en');
  const futureEvents = allEventsOfType.filter(e => 
    e.date && DateTime.fromISO(e.date).setLocale('en') >= now
  );
  
  // Sort by date (ascending) and get the nearest one
  futureEvents.sort((a, b) => 
    DateTime.fromISO(a.date).setLocale('en') < DateTime.fromISO(b.date).setLocale('en') ? -1 : 1
  );
  
  return futureEvents.length > 0 ? futureEvents[0] : allEventsOfType[0];
};

// Get a specific event by ID
const getEventById = (id) => {
  // Extract event type from id (for recurring events)
  const eventType = id.split('-')[0];
  
  // Find event based on full ID or event type for recurring events
  let event;
  let isRecurring = false;
  let recurrencePattern = "";
  
  // Check if this is a recurring event type
  if (['sunday', 'kids', 'encounter', 'community'].includes(eventType)) {
    isRecurring = true;
    
    // Find all events of this type
    const allEventsOfType = processedEvents.filter(e => e.id.includes(eventType));
    
    // Find future events of this type (only for events with dates)
    const now = DateTime.now().setLocale('en');
    const futureEvents = allEventsOfType.filter(e => 
      e.date && DateTime.fromISO(e.date).setLocale('en') >= now
    );
    
    // Sort by date (ascending) and get the nearest one
    if (futureEvents.length > 0) {
      futureEvents.sort((a, b) => 
        DateTime.fromISO(a.date).setLocale('en') < DateTime.fromISO(b.date).setLocale('en') ? -1 : 1
      );
      event = futureEvents[0];
    } else {
      event = allEventsOfType[0];
    }
    
    // Set recurrence pattern based on event type
    if (eventType === 'sunday') {
      recurrencePattern = "Every Sunday at 10:00 AM";
    } else if (eventType === 'kids') {
      recurrencePattern = "Every Sunday at 10:00 AM";
    } else if (eventType === 'encounter') {
      recurrencePattern = "Last Tuesday of each month at 7:00 PM";
    } else if (eventType === 'community') {
      recurrencePattern = "Monthly on Saturdays";
    }
    
    // Add recurrence pattern to event
    if (event) {
      event.isRecurring = isRecurring;
      event.recurrencePattern = recurrencePattern;
    }
  } else {
    // Non-recurring event - find exact match
    event = processedEvents.find(e => String(e.id) === id);
  }
  
  return event;
};


export {
  processedEvents,
  getFilteredEvents,
  formatDate,
  getNextOccurrence,
  getEventById,
  currentYear,
  nextYear,
  lifeGroupsData,
  storiesData,
}; 