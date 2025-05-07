# SatelliteUI Frontend

This project is a web-based user interface for monitoring telemetry data and managing commands for submodules of the Hunity-1 satellite that are developed by students from the University of Győr. It is built with modern web technologies and supports both light and dark modes. The application is available on English and Hungarian languages.

## Features

- **Home page:**
  Right now the home page displays the orbital parameters of the satellite and the upcoming passes over Győr, Hungary.

- **Dashboard page:**
  The most important 27 metrics from our modules are displayed here with color coded health indicators. A detailed chart of the values are also available when clicking on the individual cards.

- **Telemetry page:**  
  Displays telemetry data in both raw and processed formats. Easily view live data (including timestamps and parameter values) using modern table designs with hover effects.

- **Command management page:**  
  Allows operators to select and send commands to the satellite from the ground. Features include dynamic parameter inputs (number, time, hexadecimal, file, selection) with two-way binding. A preview of the full command string is generated before sending.

- **Dark Mode Support:**  
  Components such as inputs, tables, and date pickers are styled with Tailwind CSS to automatically adjust between light and dark themes.

## Technologies

- **Next.js** – Framework for building the SSR and SPA experience.
- **React** – JavaScript library for building interactive UIs.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **Spring Boot** – Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".
- **MariaDB** - Powerful and modern database platform.

## Installation

0. **Prerequisites**
   Install the following softwares:

   - **Docker** - On Windows you can use Docker Desktop and on a Linux distro both docker and podman
   - **Java** - JRE 21 or newer is needed to run the back-end application
   - **Gradle** - 8.0 or higher for resolving dependencies on the back-end
   - **Node.js** - v22 is the recommended Node version for the front-end installed with NPM

1. **Clone the repository:**

   ```sh
   git clone https://github.com/danield0ma/SatelliteUI.git
   cd satelliteui-frontend/frontend
   ```

2. **Start the database:**

   ```sh
   docker run --name mariadb -e MYSQL_ROOT_PASSWORD={YOUR_PASSWORD} -p 3306:3306 -d mariadb:latest
   ```

3. **Start back-end**

   ```sh
   cd backend
   gradle bootRun
   ```

4. **Install front-end dependencies and start it:**

   ```sh
   cd frontend
   npm install
   npm run build
   npm run start
   ```

   Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bug fixes or improvements.
