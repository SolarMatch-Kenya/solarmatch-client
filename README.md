# SolarMatch-KE Client

This is the frontend for the SolarMatch application. SolarMatch-KE is an AI-Powered Solar Suitability and Adoption Platform.
We help homeowners, businesses, and communities transition to clean energy through data-driven insights.

We are empowering Kenya to go solar — one rooftop at a time.


## Features

- **User Authentication:** Secure login and registration for homeowners and installers.
- **Interactive Dashboard:** Personalized dashboard for users to track their solar journey.
- **AI-Powered Chatbot:** "Sunny" the chatbot provides instant answers to user questions.
- **AR Roof Preview:** Visualize solar panels on your own roof using augmented reality.
- **Data-Driven Analysis:** Get a detailed analysis of your home's solar potential, including a solar suitability score.
- **Installer Marketplace:** Connect with qualified solar installers in your area.
- **Leaderboard:** See how your solar production compares to others in your area.

## Tech Stack

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool and development server for modern web projects.
- **React Router:** For declarative routing in a React application.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Styled Components:** For component-level styling.
- **Formik & Yup:** For building and validating forms.
- **Chart.js & Recharts:** For creating interactive charts and graphs.
- **Mapbox & Google Maps:** For interactive maps and location-based services.
- **Three.js & React Three Fiber:** For 3D graphics and augmented reality.
- **Axios:** For making HTTP requests to the backend API.
- **React Context:** For application-wide state management.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SolarMatch-Kenya/solarmatch-client.git
   ```
2. Navigate to the client directory:
   ```bash
   cd solarmatch/solarmatch-client
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.

## Folder Structure

```
solarmatch-client/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── vite.config.js
```

- **`src/assets`**: Static assets like images and icons.
- **`src/components`**: Reusable React components.
- **`src/context`**: React context providers for state management.
- **`src/pages`**: Top-level page components.
- **`src/router`**: Application routing configuration.
- **`src/services`**: Modules for interacting with the backend API.
- **`src/utils`**: Utility functions and helpers.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## Authors

- [James Kariuki](https://github.com/chiznox6)
- [Patricia Njuguna](https://github.com/Ms-Njuguna)
- [Ayub Karanja](https://github.com/AyubFoks)

## License

This project is licensed under the [MIT License](https://mit-license.org/).