import eventsData from './events.json';
import lifeGroupsData from './lifegroups.json';
import storiesData from './stories.json';
import { DateTime } from 'luxon';

// Constants
const FACEBOOK_LINK = "https://www.facebook.com/hopechurchcanberra";
const RECURRING_TYPES = ['sunday-service', 'kids-church', 'encounter-night', 'community-service', 'water-baptism'];
const WEEKS_PER_YEAR = 104; // Approximate weeks in 2 years
const MONTHS_PER_YEAR = 24; // 2 years worth of months
const LAST_WEEK_OF_MONTH_THRESHOLD = 20; // Threshold to identify "last week" pattern

// Get current year and next year
const currentYear = DateTime.now().year;
const nextYear = currentYear + 1;

// Helper function to calculate Easter Sunday for a given year (Meeus/Jones/Butcher algorithm)
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
  
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

// Generate dates that fall on a specific day of week
const generateDatesForDayOfWeek = (startYear, endYear, dayOfWeek, count) => {
  const dates = [];
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

// Generate monthly dates that fall on a specific day of week
const generateMonthlyDatesForDayOfWeek = (startYear, endYear, dayOfWeek, weekOfMonth, count) => {
  const dates = [];
  let current = DateTime.local(startYear, 1, 1);
  const isLastWeekOfMonth = weekOfMonth >= LAST_WEEK_OF_MONTH_THRESHOLD;
  
  while (dates.length < count && current.year <= endYear) {
    let targetDate = current.set({ day: 1 });
    
    // Find the first occurrence of the day in the month
    while (targetDate.weekday !== dayOfWeek) {
      targetDate = targetDate.plus({ days: 1 });
    }
    
    if (isLastWeekOfMonth) {
      // Find the last occurrence of the day in the month
      const lastDay = current.endOf('month');
      let lastOccurrence = lastDay;
      while (lastOccurrence.weekday !== dayOfWeek) {
        lastOccurrence = lastOccurrence.minus({ days: 1 });
      }
      targetDate = lastOccurrence;
    } else if (weekOfMonth > 1) {
      // Adjust to the specified week of the month
      targetDate = targetDate.plus({ weeks: weekOfMonth - 1 });
      // If this pushes us into the next month, use the last occurrence in the current month
      if (targetDate.month !== current.month) {
        targetDate = targetDate.minus({ weeks: 1 });
      }
    }
    
    if (targetDate.year <= endYear && targetDate.year >= startYear) {
      dates.push(targetDate.toISODate());
    }
    
    current = current.plus({ months: 1 });
  }
  
  return dates;
};

// Apply location overrides to an event based on date
const applyLocationOverride = (event, date) => {
  if (!event.locationOverrides || !date) return event;
  
  const override = event.locationOverrides.find(override => override.date === date);
  if (override) {
    return { ...event, location: override.location };
  }
  
  return event;
};

// Create event instance with location override handling
const createEventInstance = (eventTemplate, date, idPrefix, index) => {
  const event = applyLocationOverride(eventTemplate, date);
  const { locationOverrides, ...eventData } = event;
  
  return {
    id: `${idPrefix}-${index}`,
    ...eventData,
    date: date
  };
};

// Generate event instances for recurring events
const generateEventInstances = () => {
  const instances = [];
  const easterSunday = calculateEasterSunday(currentYear);
  
  // Sunday Services with location overrides
  const sundayDates = generateDatesForDayOfWeek(currentYear, nextYear, 7, WEEKS_PER_YEAR);
  instances.push(
    ...sundayDates.map((date, i) => 
      createEventInstance(eventsData.recurringEvents.sundayService, date, 'sunday-service', i)
    )
  );
  
  // Kids Church with location overrides
  instances.push(
    ...sundayDates.map((date, i) => 
      createEventInstance(eventsData.recurringEvents.kidsChurch, date, 'kids-church', i)
    )
  );
  
  // Encounter Night (monthly)
  const encounterDates = generateMonthlyDatesForDayOfWeek(currentYear, nextYear, 2, 99, MONTHS_PER_YEAR);
  instances.push(
    ...encounterDates.map((date, i) => ({
      id: `encounter-night-${i}`,
      ...eventsData.recurringEvents.encounterNight,
      date: date
    }))
  );
  
  // Community Service
  const communityDates = generateDatesForDayOfWeek(currentYear, nextYear, 6, WEEKS_PER_YEAR);
  instances.push(
    ...communityDates.map((date, i) => ({
      id: `community-service-${i}`,
      ...eventsData.recurringEvents.communityService,
      date: null
    }))
  );
  
  // Water Baptism (3 times a year)
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
    annualEvent.id = `${event.id}-${currentYear}`;
    
    // Set date based on event type
    if (event.id === 'easter-service') {
      annualEvent.date = easterSunday;
    } else if (event.id === 'heaven-invade') {
      annualEvent.date = event.date;
    } else {
      annualEvent.date = null;
    }
    
    if (event.isMultiDay) {
      annualEvent.endDate = null;
    }
    
    instances.push(annualEvent);
  });
  
  return instances;
};

// Process all events with calculated dates
const processedEvents = generateEventInstances();

// Helper: Check if event is future or has no date
const isFutureOrNoDate = (event, now) => {
  if (!event.date) return true;
  const eventDate = DateTime.fromISO(event.date).startOf('day');
  return eventDate >= now.startOf('day');
};

// Helper: Sort events by date (events without dates go to end)
const sortEventsByDate = (a, b) => {
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  
  const dateA = DateTime.fromISO(a.date).startOf('day');
  const dateB = DateTime.fromISO(b.date).startOf('day');
  return dateA - dateB;
};

// Helper: Group events by type
const groupEventsByType = () => {
  const eventsByType = {};
  const oneTimeEvents = [];
  
  RECURRING_TYPES.forEach(type => {
    eventsByType[type] = [];
  });
  
  processedEvents.forEach(event => {
    const isRecurring = RECURRING_TYPES.some(type => event.id.includes(type));
    
    if (isRecurring) {
      const type = RECURRING_TYPES.find(t => event.id.includes(t));
      eventsByType[type].push(event);
    } else {
      oneTimeEvents.push(event);
    }
  });
  
  return { eventsByType, oneTimeEvents };
};

// Helper: Get nearest future event from a list
const getNearestFutureEvent = (events, now) => {
  const futureEvents = events
    .filter(e => isFutureOrNoDate(e, now))
    .sort(sortEventsByDate);
  
  return futureEvents.length > 0 ? futureEvents[0] : null;
};

// Get filtered events (showing only nearest future occurrences of recurring events)
const getFilteredEvents = () => {
  const now = DateTime.now();
  const { eventsByType, oneTimeEvents } = groupEventsByType();
  
  // Get nearest future occurrence for each recurring event type
  const nearestRecurringEvents = [];
  
  RECURRING_TYPES.forEach(type => {
    if (eventsByType[type].length > 0) {
      const nearest = getNearestFutureEvent(eventsByType[type], now);
      if (nearest) {
        nearestRecurringEvents.push(nearest);
      }
    }
  });
  
  // Filter one-time events to only include future events
  const futureOneTimeEvents = oneTimeEvents.filter(event => isFutureOrNoDate(event, now));
  
  // Combine and sort all events
  return [...futureOneTimeEvents, ...nearestRecurringEvents].sort(sortEventsByDate);
};

// Get all future events (both recurring and annual) - one instance per event type
const getAllFutureEvents = () => {
  const now = DateTime.now();
  const { eventsByType, oneTimeEvents } = groupEventsByType();
  
  // Get nearest future occurrence for each recurring event type
  const nearestRecurringEvents = [];
  
  RECURRING_TYPES.forEach(type => {
    if (eventsByType[type].length > 0) {
      const nearest = getNearestFutureEvent(eventsByType[type], now);
      if (nearest) {
        nearestRecurringEvents.push(nearest);
      }
    }
  });
  
  // Filter one-time events to only include future events
  const futureOneTimeEvents = oneTimeEvents.filter(event => isFutureOrNoDate(event, now));
  
  // Combine and sort all events
  return [...futureOneTimeEvents, ...nearestRecurringEvents].sort(sortEventsByDate);
};

// Get past events (for display in a separate section) - only Easter Sunday service
const getPastEvents = () => {
  const now = DateTime.now().startOf('day');
  
  return processedEvents
    .filter(event => {
      if (!event.date || !event.id.includes('easter-service')) return false;
      const eventDate = DateTime.fromISO(event.date).startOf('day');
      return eventDate < now;
    })
    .sort((a, b) => {
      const dateA = DateTime.fromISO(a.date);
      const dateB = DateTime.fromISO(b.date);
      return dateB - dateA; // Most recent first
    });
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
  const eventType = eventId.split('-').slice(0, -1).join('-');
  const allEventsOfType = processedEvents.filter(e => e.id.startsWith(eventType));
  
  const now = DateTime.now();
  const futureEvents = allEventsOfType
    .filter(e => e.date && DateTime.fromISO(e.date) >= now)
    .sort((a, b) => {
      const dateA = DateTime.fromISO(a.date);
      const dateB = DateTime.fromISO(b.date);
      return dateA < dateB ? -1 : 1;
    });
  
  return futureEvents.length > 0 ? futureEvents[0] : allEventsOfType[0];
};

// Get a specific event by ID
const getEventById = (id) => {
  const eventType = id.split('-')[0];
  const isRecurring = ['sunday', 'kids', 'encounter', 'community'].includes(eventType);
  
  if (isRecurring) {
    const allEventsOfType = processedEvents.filter(e => e.id.includes(eventType));
    const now = DateTime.now();
    
    const futureEvents = allEventsOfType
      .filter(e => e.date && DateTime.fromISO(e.date) >= now)
      .sort((a, b) => {
        const dateA = DateTime.fromISO(a.date);
        const dateB = DateTime.fromISO(b.date);
        return dateA < dateB ? -1 : 1;
      });
    
    const event = futureEvents.length > 0 ? futureEvents[0] : allEventsOfType[0];
    
    if (event) {
      const recurrencePatterns = {
        'sunday': "Every Sunday at 10:00 AM",
        'kids': "Every Sunday at 10:00 AM",
        'encounter': "Last Tuesday of each month at 7:00 PM",
        'community': "Monthly on Saturdays"
      };
      
      return {
        ...event,
        isRecurring: true,
        recurrencePattern: recurrencePatterns[eventType] || ""
      };
    }
    
    return event;
  }
  
  // Non-recurring event - find exact match
  return processedEvents.find(e => String(e.id) === id);
};

// Export facebookLink as a named export
const facebookLink = FACEBOOK_LINK;

export {
  processedEvents,
  getFilteredEvents,
  getAllFutureEvents,
  getPastEvents,
  formatDate,
  getNextOccurrence,
  getEventById,
  currentYear,
  nextYear,
  lifeGroupsData,
  storiesData,
  facebookLink,
  eventsData,
};
