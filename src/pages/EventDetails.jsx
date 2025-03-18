import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventsData } from './Events';

const EventDetails = () => {
  const { id } = useParams();
  
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
    const allEventsOfType = eventsData.filter(e => e.id.includes(eventType));
    
    // Find future events of this type
    const now = new Date();
    const futureEvents = allEventsOfType.filter(e => new Date(e.date) >= now);
    
    // Sort by date (ascending) and get the nearest one
    futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    event = futureEvents.length > 0 ? futureEvents[0] : allEventsOfType[0];
    
    // Set recurrence pattern based on event type
    if (eventType === 'sunday') {
      recurrencePattern = "Every Sunday at 10:00 AM";
    } else if (eventType === 'kids') {
      recurrencePattern = "Every Sunday at 10:00 AM";
    } else if (eventType === 'encounter') {
      recurrencePattern = "Monthly on the last Tuesday at 7:00 PM";
    } else if (eventType === 'community') {
      recurrencePattern = "Every Saturday at 10:00 AM";
    }
  } else {
    // Non-recurring event - find exact match
    event = eventsData.find(e => String(e.id) === id);
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
            <Link to="/events" className="text-gray-700 hover:text-gray-900 font-medium">
              ← Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section with Event Image */}
      <div className="relative h-96">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            {isRecurring && (
              <div className="inline-block bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Recurring Event
              </div>
            )}
            <p className="text-xl text-gray-200">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">About This Event</h2>
              <p className="text-gray-600 mb-6">{event.description}</p>
              
              {isRecurring && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <span className="font-semibold">Recurring Schedule:</span> {recurrencePattern}
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        Next occurrence: {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {event.isPlaceholder && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Note: The exact date and time for this event will be announced later.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Additional Content for specific event types */}
              {event.category === "Service" && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">What to Expect</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Welcoming environment for everyone</li>
                    <li>Contemporary worship</li>
                    <li>Engaging message</li>
                    <li>Fellowship opportunities</li>
                  </ul>
                </div>
              )}

              {event.category === "Children" && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">For Parents</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Safe and secure environment</li>
                    <li>Age-appropriate activities</li>
                    <li>Trained and caring staff</li>
                    <li>Check-in/out system</li>
                  </ul>
                </div>
              )}

              {event.category === "Worship" && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">What to Expect</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Spirit-filled worship experience</li>
                    <li>Contemporary music and songs</li>
                    <li>Opportunity for prayer and ministry</li>
                    <li>All are welcome, regardless of musical ability</li>
                  </ul>
                </div>
              )}

              {event.category === "Workshop" && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">What to Bring</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>A notebook and pen</li>
                    <li>An open heart and mind</li>
                    <li>Questions you may have</li>
                    <li>A friend who might benefit</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="bg-gray-50 p-6 rounded-lg h-fit">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Event Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                  {isRecurring ? (
                    <p className="text-gray-800">{recurrencePattern}</p>
                  ) : (
                    <p className="text-gray-800">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} at {event.time}
                    </p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="text-gray-800">{event.location}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Category</h4>
                  <p className="text-gray-800">{event.category}</p>
                </div>
              </div>

              <div className="mt-8">
                <Link 
                  to="/events" 
                  className="block w-full bg-gray-800 text-white text-center py-3 rounded-lg hover:bg-gray-900 transition duration-150"
                >
                  Back to Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 