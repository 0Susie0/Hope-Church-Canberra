# Hope Church Canberra Website

A modern, responsive website for Hope Church Canberra built with React.

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

For questions or inquiries about the website, please contact [info@hopechurchcanberra.com.au](mailto:info@hopechurchcanberra.com.au).

## License

This project is privately owned by Hope Church Canberra. 