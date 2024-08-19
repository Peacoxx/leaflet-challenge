# Leaflet Earthquake Visualization Part 1 only

## Project Overview

This project visualizes earthquake data using Leaflet.js, an open-source JavaScript library for interactive maps. The data is fetched from the US Geological Survey (USGS) and includes information about recent earthquakes, such as their location, magnitude, and depth.

## Features

- **Interactive Map**: Displays earthquake locations on a map.
- **Data Markers**: Earthquake markers vary in size based on the magnitude and in color based on the depth.
- **Popups**: Each marker has a popup with detailed information about the earthquake, including its location, magnitude, depth, and time.
- **Legend**: A legend is included to provide context for the marker colors based on depth.

## File Structure

```plaintext
leaflet-challenge/
│
├── Leaflet-Part-1/
│   ├── index.html       # Main HTML file for the project
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css  # Custom CSS for styling
│   │   └── js/
│   │       └── logic.js   # JavaScript file with Leaflet logic
│   └── README.md        # This README file
└── ...
