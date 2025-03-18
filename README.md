# Hope Church Canberra Website

This is the prototype project for the Hope Church Canberra website, built with React and Node.js.

## Project Overview

The website prototype includes the following core features and pages:

### Core Pages
1. **Home Page**
   - Full-width hero image showcasing church mission and core information
   - Service times, location, and upcoming events preview
   - Prominent call-to-action buttons (e.g., "Join Us", "Learn More")

2. **About Us**
   - Church history, mission, and core values
   - Team introduction

3. **Life Groups/Core Values**
   - Life group details
   - Church core values display

4. **Events & Calendar**
   - Event list display
   - Interactive calendar module
   - Search and filter functionality

5. **Visit Us**
   - Clear location information
   - Multimedia elements (image carousel, video, community stories)

### Features

- **Fixed Navigation Bar**: Global fixed header ensuring users can access all modules at any time
- **Responsive Layout**: Automatically adapts to various device sizes (desktop and mobile)
- **Social Media Integration**: Embedded social media dynamic content
- **Event Calendar**: Interactive calendar component supporting month, week, and day views
- **Multimedia Support**: Support for images, videos, and document embedding

## Tech Stack

- **Frontend**: React, React Router
- **Styling**: CSS/SCSS, Bootstrap or Tailwind CSS
- **Backend**: Node.js, Express
- **Data Storage**: Local JSON files for data simulation in this prototype phase

## Installation

1. Clone the repository
   ```
   git clone [repository URL]
   cd hope-church-canberra
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start development server
   ```
   npm run dev
   ```

4. Build for production
   ```
   npm run build
   ```

## Project Structure

```
hope-church-canberra/
├── public/               # Static assets
│   ├── images/           # Image resources
│   └── data/             # Mock data JSON files
├── src/                  # Source code
│   ├── components/       # React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom hooks
│   ├── contexts/         # React contexts
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   └── App.js            # Main application component
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Future Development Plans

1. Integrate real database to replace mock data
2. Add user authentication functionality
3. Implement event registration and management system
4. Add admin dashboard interface
5. Optimize performance and user experience

## License

[To be determined] 