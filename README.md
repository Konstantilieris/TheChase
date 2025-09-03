# The Chase

**The Chase** is a modern React web application for tracking cryptocurrency prices, viewing detailed coin information, and managing a personalized watchlist. It leverages the CoinGecko API for real-time data and integrates Firebase for user authentication and watchlist storage.

## Features

- **Live Cryptocurrency Prices:** View up-to-date prices, market caps, and 24h changes for 100+ coins.
- **Search & Filter:** Instantly search for your favorite cryptocurrencies.
- **Detailed Coin Pages:** Access historical price charts, rankings, and descriptions for each coin.
- **User Authentication:** Sign up and log in with email/password or Google.
- **Personal Watchlist:** Add or remove coins from your watchlist, stored securely in Firebase.
- **Responsive UI:** Clean, modern interface built with Material-UI and custom styles.
- **Trending Coins Carousel:** See top trending coins in a visually engaging carousel.

## Screenshots

_(Add screenshots here if available)_

## Tech Stack

- **Frontend:** React, React Router, Material-UI, Chart.js, Alice Carousel
- **State Management:** React Context API
- **Authentication & Database:** Firebase (Auth, Firestore)
- **API:** CoinGecko (public crypto data)
- **Other:** Axios, html-react-parser, react-icons

## Project Structure

```
src/
  components/         # Reusable UI components (Header, AuthModal, UserSidebar, etc.)
    banner/           # Banner and Carousel for trending coins
  config/             # API endpoints, chart config, Firebase config
  context/            # CryptoContext for global state
  pages/              # Main pages (Homepage, CoinPage)
  App.js              # Main app component with routing
  firebase.js         # Firebase initialization
  index.js            # Entry point
public/
  index.html          # HTML template
  bannerpic.jpg       # Banner image
  favicon.ico         # Favicon
```

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/LomachenkoDev/TheChase.git
   cd TheChase
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Firebase Setup:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Email/Password and Google authentication.
   - Create a Firestore database.
   - Copy your Firebase config to `src/config/firebaseConfig.js` (see `.gitignore` for security).

4. **Start the development server:**
   ```sh
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Browse Coins:** The homepage displays a searchable, paginated table of cryptocurrencies.
- **View Details:** Click a coin to see its price chart, description, and stats.
- **Sign Up / Log In:** Use the login button in the header to create an account or sign in.
- **Manage Watchlist:** Add or remove coins from your watchlist (visible in the sidebar when logged in).

## Scripts

- `npm start` – Run the app in development mode.
- `npm run build` – Build for production.
- `npm test` – Run tests.

## Environment Variables

- Your Firebase config should be placed in `src/config/firebaseConfig.js` (excluded from version control).

## License

MIT
