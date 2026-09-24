# 🌤️ SkyCast — Premium Weather Dashboard

A modern, responsive, and interactive weather dashboard built using **HTML, CSS, and JavaScript**. SkyCast provides real-time weather information, a 5-day forecast, recent searches, and a beautiful premium interface with Dark/Light mode.

---

## ✨ Features

* 🌍 **City Search** — Search weather information for any supported city
* 🌡️ **Current Weather** — View current temperature and weather conditions
* 🌤️ **Weather Conditions** — Displays clear, cloudy, rainy, snowy, and other conditions
* 💧 **Humidity** — Shows current humidity percentage
* 💨 **Wind Speed** — Displays current wind speed
* 👁️ **Visibility** — Shows visibility information
* 🧭 **Pressure** — Displays atmospheric pressure
* 🌅 **Sunrise & Sunset** — View sunrise and sunset timings
* 📅 **5-Day Forecast** — Check upcoming weather conditions
* 🔎 **Recent Searches** — Quickly access previously searched cities
* 🌓 **Dark/Light Mode** — Switch between themes
* 💾 **LocalStorage** — Saves recent searches and user preferences
* ⏳ **Loading State** — Smooth loading animation while fetching data
* ⚠️ **Error Handling** — Displays helpful messages for invalid searches
* 📱 **Responsive Design** — Works on desktop, tablet, and mobile devices
* ✨ **Premium UI** — Glassmorphism, gradients, animations, and modern cards

---

## 🛠️ Technologies Used

| Technology     | Purpose                                   |
| -------------- | ----------------------------------------- |
| HTML5          | Website structure                         |
| CSS3           | Styling, animations and responsive design |
| JavaScript     | Application logic and API integration     |
| Open-Meteo API | Weather data                              |
| LocalStorage   | Saving recent searches and preferences    |

---

## 🌐 API

This project uses **Open-Meteo** for weather information.

No API key is required.

The application uses:

* Geocoding API — Converts city names into coordinates
* Forecast API — Retrieves current and forecast weather information

---

## 📂 Project Structure

```text
Premium-Weather-App/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/Umeshyuvaraj-web/premium-weather-app.git
```

### 2. Open the project

```bash
cd premium-weather-app
```

### 3. Run the application

You can simply open:

```text
index.html
```

in your browser.

For the best development experience, use **VS Code with the Live Server extension**.

### Using Live Server

1. Open the project in VS Code
2. Install the **Live Server** extension
3. Right-click `index.html`
4. Select **Open with Live Server**

---

## 🎯 How It Works

The application follows this process:

```text
User enters city
       ↓
Geocoding API
       ↓
City → Latitude & Longitude
       ↓
Weather Forecast API
       ↓
Weather Data
       ↓
JavaScript processes data
       ↓
Weather Dashboard updates
```

---

## 📊 Dashboard Information

The dashboard displays:

* Current temperature
* Feels-like temperature
* Weather condition
* Humidity
* Wind speed
* Visibility
* Atmospheric pressure
* Sunrise time
* Sunset time
* Five-day forecast

---

## 💾 LocalStorage

The application uses browser LocalStorage to maintain:

* Recent city searches
* Theme preference
* User settings

This allows the application to retain important preferences even after refreshing the browser.

---

## 🎨 UI Design

SkyCast uses a modern interface inspired by premium dashboard applications.

### Design Features

* Glassmorphism cards
* Gradient backgrounds
* Smooth transitions
* Animated elements
* Modern typography
* Rounded components
* Responsive layouts
* Dark and Light themes
* Interactive hover effects

---

## 📱 Responsive Design

The application is designed to work across different screen sizes:

```text
Desktop 💻
    ↓
Tablet 📱
    ↓
Mobile 📲
```

The layout automatically adjusts according to the device width.

---

## 🧠 Key Concepts Learned

Through this project, the following concepts are demonstrated:

* DOM Manipulation
* JavaScript Event Handling
* Fetch API
* REST API Integration
* Asynchronous JavaScript
* `async/await`
* JSON Data Processing
* Error Handling
* LocalStorage
* Dynamic HTML Rendering
* CSS Flexbox
* CSS Grid
* Responsive Web Design
* CSS Animations
* Theme Switching

---

## 🔮 Future Improvements

Possible future enhancements include:

* 📍 Current location weather
* 🗺️ Interactive weather map
* 🌧️ Hourly forecast
* 🌡️ Temperature charts
* 🌪️ Severe weather alerts
* ⭐ Favorite cities
* 📊 Weather statistics
* 🌐 Multi-language support
* 📲 Progressive Web App (PWA)
* 🔔 Weather notifications

---

## 🎓 Project Purpose

This project was developed as a practical **frontend web development project** to demonstrate the use of JavaScript, APIs, responsive design, and modern UI development.

It can also be used as a **portfolio project for internships and placements**.

---

## 👨‍💻 Author

**G. Umesh Yuvaraj**

B.Tech — Computer Science & Engineering
AI & ML Specialization

---

## 📌 Project Status

🟢 **Completed**

The project is fully functional and can be extended with additional weather features in the future.

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

### 📄 License

This project is created for educational and portfolio purposes.
