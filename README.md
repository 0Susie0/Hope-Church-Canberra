# Hope Church Canberra Website

A modern React website for Hope Church Canberra, designed to provide information about the church, its events, life groups, and community stories. The site is data-driven, easy to maintain, and optimized for all devices.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Data Structure](#data-structure)
- [Key Components & Pages](#key-components--pages)
- [Setup & Development](#setup--development)
- [Maintenance](#maintenance)
- [Contact](#contact)
- [License](#license)

---

## Project Overview

This website serves as the online presence for Hope Church Canberra. It provides up-to-date information about church services, events, life groups, and community stories, and is designed for easy content updates by editing JSON files.

---

## Features

- **Home Page:** Introduction, service info, upcoming events, and community stories.
- **Events Page:** List and details of all recurring and annual events, with automatic date calculation.
- **Life Groups Page:** Information about small groups, their leaders, meeting times, and locations.
- **Visit Us Page:** Service location, contact info, FAQs, and map.
- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Data-Driven Content:** All content is managed via JSON files for easy updates.
- **Modern Tech Stack:** Built with React, React Router, Tailwind CSS, and Luxon.

---

## Project Structure

```
Hope Church Canberra/
├── public/
│   ├── images/             # Image files (events, lifegroups, stories, etc.)
│   ├── videos/             # Video files (e.g., intro video)
├── src/
│   ├── components/         # Shared React components (Footer, Navbar, Layout)
│   ├── pages/              # Main page components (Home, Events, VisitUs, etc.)
│   ├── styles/             # CSS files (Tailwind, custom styles)
│   ├── data/               # JSON data and data service
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
└── ...
```

---

## Data Structure

All content is managed via JSON files in `src/data/`:

### 1. Events Data (`events.json`)

- **recurringEvents:**  
  - `sundayService`, `kidsChurch`, `encounterNight`, `communityService`, `waterBaptism`
  - Each event includes: `title`, `time`, `location`, `description`, `image`, `category`, and optional recurrence info.

- **annualEvents:**  
  - Array of special events (e.g., Church Camp, Women's Morning Tea, Easter Service).
  - Each event includes: `id`, `title`, `time`, `location`, `description`, `image`, `category`, and optional details.

### 2. Life Groups Data (`lifegroups.json`)

- Array of life group objects, each with: `id`, `name`, `leader`, `time`, `location`, `description`, `image`, and optional `socialLinks`.

### 3. Community Stories (`stories.json`)

- **communityStories:**  
  - Array of testimonials with `name`, `image`, `quote`, and `role`.
- **imageCarousel:**  
  - Array of images and descriptions for the homepage carousel.

### 4. Data Service (`dataService.js`)

- Provides utility functions:
  - `processedEvents`: All event instances with calculated dates.
  - `getFilteredEvents()`: Nearest future occurrences of recurring events.
  - `formatDate()`: Formats event dates for display.
  - `getNextOccurrence()`: Gets the next occurrence of a specific event.
  - `getEventById()`: Finds a specific event by its ID.
  - `calculateEasterSunday()`: Calculates Easter Sunday date for a given year.

---

## Key Components & Pages

### Pages (`src/pages/`)

- **Home.jsx:**  
  Landing page with hero section, service info, upcoming events, and testimonials.
- **About.jsx:**  
  Church vision, values, and leadership.
- **Events.jsx:**  
  Calendar and list views of all events, with filtering and details.
- **EventDetails.jsx:**  
  Detailed information about a specific event.
- **LifeGroups.jsx:**  
  Information about small community groups.
- **VisitUs.jsx:**  
  Location, service times, contact info, FAQs, and map.

### Shared Components (`src/components/`)

- **Navbar.jsx:**  
  Top navigation bar.
- **Footer.jsx:**  
  Footer with contact info and quick links.
- **Layout.jsx:**  
  Layout wrapper for consistent page structure.

---

## Setup & Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd Hope\ Church\ Canberra/
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To create a production build:
```bash
npm run build
```
The build files will be generated in the `dist/` directory.

---

## Maintenance

To update website content, simply edit the relevant JSON files in `src/data/`:

- **Events:** `events.json`
- **Life Groups:** `lifegroups.json`
- **Community Stories:** `stories.json`

No code changes are required for content updates.

---

## Contact

For questions or inquiries about the website, please contact [SusieHu98@outlook.com](mailto:SusieHu98@outlook.com).

---

## License

This project is privately owned by Hope Church Canberra. 