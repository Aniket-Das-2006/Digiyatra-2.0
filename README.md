# 🛫 DigiYatra 2.0 - Verified Identity, Seamless Travel

![DigiYatra Hero](https://github.com/Aniket-Das-2006/DigiYatra-2.0/assets/hero-placeholder.png) <!-- Update this link with a real screenshot once uploaded -->

Welcome to **DigiYatra 2.0**! This project is a cutting-edge redesign of the DigiYatra mobile experience, built with React and Vite. It aims to revolutionize the digital travel experience across India by integrating seamless biometric identity verification, multi-credential wallets, and universal interoperability for flights, hotels, and beyond.

## ✨ Features

- **Biometric Identity Wallet**: Manage your Aadhaar, Passport, DigiLocker, and IATA One ID all in one secure place.
- **Flight & Baggage Tracking**: Real-time flight status, interactive airport maps, and automated baggage tracking.
- **Hotel Ecosystem Integration**: Digital check-in, automated Form C auto-fill, and biometric room access.
- **Dynamic Localization (i18n)**: Instantly switch the entire application interface between English, Hindi, and Bengali.
- **Glassmorphic & Premium UI**: Built from the ground up with modern aesthetics, smooth scroll reveals, and highly responsive components.

## 🛠 Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Glassmorphism)
- **Icons**: Lucide React
- **Internationalization**: `i18next` & `react-i18next`
- **Routing**: React Router DOM (v6)

## 🚀 Getting Started

To run this project locally, simply follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aniket-Das-2006/DigiYatra-2.0.git
   cd DigiYatra-2.0
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready files will be generated in the `dist` directory.

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components (Header, Footer, Modals, Cards, Sidebar)
├── context/          # React Context providers (DigiYatra state management)
├── data/             # Static database mocks (flights, hotels, transport)
├── hooks/            # Custom React hooks (useAnimations)
├── locales/          # i18n translation dictionaries (en, hi, bn)
├── pages/            # Main application views (Home, Settings, Info, Docs)
├── App.jsx           # Main App component & Routing
├── i18n.js           # Localization configuration
└── main.jsx          # Application entry point
```

## 🔒 Security & Privacy

DigiYatra 2.0 prioritizes privacy by design. Features like the **Consent Manager** and **Trust Center** simulate the secure, decentralized verification processes aligned with the DPDP Act 2023 and IATA One ID standards.

## 👨‍💻 Author

- **Aniket Das** - [GitHub Profile](https://github.com/Aniket-Das-2006)

---
*Built for India's Digital Travel Future.*
