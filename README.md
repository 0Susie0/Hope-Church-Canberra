# Hope Church Canberra Website

A React website for Hope Church Canberra, designed to provide information about the church, events, life groups, and more.

## Data Structure

The website's data is organized in JSON files in the `src/data/` directory for easier maintenance and separation of concerns:

### Events Data (`src/data/events.json`)

This file contains information about church events, divided into two categories:

1. **Recurring Events**: 
   - `sundayService`: Weekly Sunday worship services
   - `kidsChurch`: Weekly children's program
   - `encounterNight`: Monthly worship and prayer night
   - `communityService`: Community outreach activities

2. **Annual Events**:
   - Church Camp
   - Women's Morning Tea
   - Water Baptism
   - Heaven Invade Worship Concert
   - Easter Sunday Service

### Life Groups Data (`src/data/lifegroups.json`)

Contains information about the church's small groups:
- Zion
- Eden
- Bethel
- Hope on Campus
- Ablaze

### Stories Data (`src/data/stories.json`)

Contains:
1. **Community Stories**: Testimonials from church members
2. **Image Carousel**: Images and descriptions for the homepage carousel

### Data Service (`src/data/dataService.js`)

This module provides utility functions to work with the JSON data:

- `processedEvents`: Generated event instances with calculated dates
- `getFilteredEvents()`: Returns filtered events (e.g., only nearest occurrences of recurring events)
- `formatDate()`: Formats event dates for display
- `getNextOccurrence()`: Gets the next occurrence of a specific event
- `getEventById()`: Finds a specific event by its ID
- `calculateEasterSunday()`: Calculates Easter Sunday date for a given year

## Pages

- **Home**: Church introduction, upcoming events, community stories
- **Events**: List of all events with search and filter functionality
- **Event Details**: Detailed information about specific events
- **Life Groups**: Information about church small groups
- **Visit Us**: Location information, service times, and FAQs

## Maintenance

To update the website content:

1. **Edit Events**: Modify `src/data/events.json` to add, update, or remove events
2. **Edit Life Groups**: Modify `src/data/lifegroups.json` to update life group information
3. **Edit Community Stories**: Modify `src/data/stories.json` to update testimonials

## Easter Sunday Calculation

The website automatically calculates the date of Easter Sunday for the current year using the Meeus/Jones/Butcher algorithm in the `calculateEasterSunday()` function in `dataService.js`.

## Date Calculation

Recurring event dates (like Sundays for weekly services or last Tuesday of the month for Encounter Night) are automatically calculated in the data service.

## Overview

This website serves as the online presence for Hope Church Canberra, providing information about the church, its services, events, and community groups. It features a clean, modern design optimized for all devices.

## Features

- **Home Page**: Church introduction, upcoming events, service times, and testimonials
- **About Page**: Vision, core values, statement of faith, and leadership information
- **Events Page**: Calendar and list views of church events with filtering capabilities
- **Life Groups Page**: Information about small community groups with contact options
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing

## Technologies Used

- React
- React Router for navigation
- Tailwind CSS for styling
- Luxon for date manipulation
- Modern JavaScript (ES6+)

## Project Structure

```
Hope Church Canberra/
├── public/                 # Public assets
│   ├── images/             # Image files
│   ├── videos/             # Video files
│   └── data/               # Static data files
├── src/                    # Source code
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components
│   ├── styles/             # CSS and style-related files
│   ├── utils/              # Utility functions and helpers
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
└── ...                     # Configuration files
```

## Key Components

### Pages

- **Home.jsx**: Landing page with hero section, service info, upcoming events, and testimonials
- **About.jsx**: Information about church vision, values, and leadership
- **Events.jsx**: Calendar and list views of church events with filtering
- **LifeGroups.jsx**: Information about small community groups
- **EventDetails.jsx**: Detailed information about specific events

### Shared Components

- **PageHeader**: Common header used across various pages
- **Navigation**: Site-wide navigation menu

## Setup and Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone [repository-url]
   cd Hope\ Church\ Canberra/
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser to `http://localhost:5173` (or the port shown in your terminal)

## Building for Production

To create a production build:

```
npm run build
```

The build files will be generated in the `dist/` directory.

## Contact

For questions or inquiries about the website, please contact [SusieHu98@outlook.com](mailto:SusieHu98@outlook.com).

## License

This project is privately owned by Hope Church Canberra. 