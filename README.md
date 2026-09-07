# 🛫 DigiYatra 2.0 – Verified Identity, Universal Travel & Cloud Microservices Architecture

<div align="center">

[![Live Production App](https://img.shields.io/badge/Live%20Production-Vercel%2024%2F7-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://digiyatra-2-0.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-DigiYatra--2.0-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Aniket-Das-2006/Digiyatra-2.0)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate%20☕-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](#-buy-me-a-coffee--developer-support)

**An Enterprise-Grade, Self-Sovereign Biometric Identity, Real-Time Telemetry & Distributed Travel Orchestration Platform**

[🌐 **Explore Live Production App**](https://digiyatra-2-0.vercel.app) • [📐 **Master System Architecture**](#-master-system-architecture) • [🚀 **Developer Quickstart**](#-getting-started) • [☕ **Buy Me A Coffee**](#-buy-me-a-coffee--developer-support)

</div>

---

## 📌 Executive Summary

**DigiYatra 2.0** represents a comprehensive architectural vision for India's digital transit infrastructure. Designed as a high-throughput, zero-trust platform, DigiYatra 2.0 unifies biometric identity verification, real-time aviation telemetry, IoT baggage tracking, automated FRRO hospitality compliance, emergency SOS telematics, and multi-credential self-sovereign identity vaults into one cohesive system.

Built with **React 18/19**, **Vite**, **Glassmorphic HSL Design Tokens**, **Vercel Global Edge CDN**, and engineered for a multi-region **Node.js/Go Microservices Backend**, DigiYatra 2.0 eliminates friction at airport boarding gates, hotel check-ins, and security checkpoints while enforcing strict adherence to India's **DPDP Act 2023** and **IATA One ID** standards.

---

## 📐 Master System Architecture

The diagram below details the complete full-stack enterprise architecture of DigiYatra 2.0, spanning client presentation, security enclaves, API gateways, event streaming buses, microservices, and external government/aviation integrations.

```mermaid
graph TB
    subgraph Client_Layer["📱 Client Presentation & Viewport Layer"]
        ReactApp["React 19 + Vite SPA Engine"]
        GlassUI["Glassmorphic UI Design System"]
        ViewportController["Force-Desktop Mobile Viewport Engine (width=1280)"]
        i18nEngine["Multilingual Engine (English, Hindi, Bengali)"]
    end

    subgraph API_Gateway_Security["🛡️ Edge API Gateway & Security Firewall"]
        APIGateway["Kong / Cloudflare API Gateway"]
        WAF["Web Application Firewall (WAF) & Rate Limiter"]
        OAuth2["OAuth2 / OIDC + Mutual TLS (mTLS) Auth"]
    end

    subgraph Messaging_Event_Bus["⚡ Real-Time Messaging & Event Bus"]
        Kafka["Apache Kafka Event Streaming"]
        MQTT["MQTT Broker (IoT Baggage & Telemetry)"]
        WebSocket["WebSocket Server (Live Flight & Gate Pushes)"]
    end

    subgraph Microservices_Core["⚙️ Enterprise Microservices Core"]
        IdentityService["Identity & Biometric Service<br/>(W3C DID Issuer & ZKP Proof Validator)"]
        FlightService["Flight Telemetry Service<br/>(Live Amadeus / FlightRadar24 Integration)"]
        BaggageService["IoT Baggage & GPS Tracking Service<br/>(RFID Mesh & BLE Beacon Resolver)"]
        HotelService["Hospitality & FRRO Service<br/>(Automated Form C Immigration Engine)"]
        BookingService["Booking & Payment Gateway Service<br/>(IRCTC & Tokenized UPI Connector)"]
        SOSService["Emergency SOS Telematics Service<br/>(CISF & Police 112 Rapid Dispatch)"]
    end

    subgraph Cloud_Security_Store["🔒 Cloud Security & Encrypted Data Store"]
        HSMVault["Hardware Security Module (HSM) Key Vault"]
        ZeroTrustDB["PostgreSQL + CockroachDB<br/>(AES-256-GCM Encrypted at Rest)"]
        RedisCache["Redis Cluster (Session & Real-Time Cache)"]
        StorageEnclave["Zero-Knowledge Data Vault<br/>(Biometric Template Enclave)"]
    end

    subgraph External_Integrations["🌐 External Government & Industry Connectors"]
        Aadhaar["UIDAI Aadhaar API"]
        Passport["DigiLocker / Passport Seva API"]
        IATA["IATA One ID Trust Registry"]
        FRRO["Bureau of Immigration (FRRO Portal)"]
        Emergency112["National Emergency Response (112 API)"]
        Airlines["Airline Reservation Systems (Sabre/Amadeus)"]
    end

    ReactApp --> APIGateway
    ViewportController --> ReactApp
    i18nEngine --> ReactApp
    GlassUI --> ReactApp

    APIGateway --> WAF
    WAF --> OAuth2
    OAuth2 --> Microservices_Core

    Microservices_Core <--> Kafka
    Microservices_Core <--> MQTT
    WebSocket <--> ReactApp
    Kafka <--> WebSocket

    IdentityService --> StorageEnclave
    IdentityService --> HSMVault
    FlightService --> RedisCache
    BaggageService --> MQTT
    HotelService --> ZeroTrustDB
    BookingService --> ZeroTrustDB
    SOSService --> Emergency112

    IdentityService <--> Aadhaar
    IdentityService <--> Passport
    IdentityService <--> IATA
    HotelService <--> FRRO
    FlightService <--> Airlines
    SOSService <--> Emergency112
```

---

## 🔄 Cryptographic Zero-Trust Data Flow

DigiYatra 2.0 enforces **Self-Sovereign Privacy**. Biometric hashes and identity documents are encrypted locally and validated via **Zero-Knowledge Proofs (ZKP)**. Plaintext biometrics are never stored in centralized cloud databases.

```mermaid
sequenceDiagram
    autonumber
    actor Passenger as 🧳 Passenger
    participant App as 📱 Mobile Enclave App
    participant Vault as 🔐 Local Storage (AES-256)
    participant Gateway as 🛡️ API Gateway (mTLS)
    participant ZKP as 🧠 ZKP Verification Engine
    participant Gate as 🚪 Gate Biometric Camera
    participant Audit as 📜 DPDP Audit Logger

    Passenger->>App: 1. Initiate Verification (Aadhaar/Passport)
    App->>Vault: 2. Generate Ephemeral Verifiable Credential (VC)
    Vault-->>App: 3. Sign VC with Ephemeral Private Key
    App->>Gateway: 4. Transmit Zero-Knowledge Proof (ZKP) Hash
    Gateway->>ZKP: 5. Validate ZKP Signature without Reading Raw Data
    ZKP-->>Gateway: 6. Proof Validated (True/False)
    Gate->>Gateway: 7. Capture Facial Vector at Checkpoint
    Gateway->>Gate: 8. Local Vector Match Succeeded -> Open Gate
    Gateway->>Audit: 9. Record Immutable Access Timestamp (DPDP Compliance)
    Gateway-->>App: 10. Trigger Instant Token Auto-Purge Cron
```

---

## 🚨 Emergency SOS & Real-Time IoT Telematics Flow

In critical events (medical emergency, security threat, lost baggage), the platform initiates immediate multi-channel telemetry dispatch.

```mermaid
sequenceDiagram
    autonumber
    actor User as 🆘 Passenger in Distress
    participant App as 📱 Client App
    participant GPS as 📡 Satellite GPS / Geofence
    participant Broker as ⚡ MQTT / Kafka Bus
    participant SOS as 🚓 SOS Telematics Dispatch
    participant CISF as 👮 CISF / Airport Security
    participant Police as 🚑 Local Emergency (112 API)

    User->>App: 1. Press Emergency SOS Panic Button
    App->>GPS: 2. Fetch High-Precision Coordinates & Terminal Zone
    GPS-->>App: 3. Return Exact Latitude, Longitude & Gate Sector
    App->>Broker: 4. Broadcast High-Priority Alert Payload
    Broker->>SOS: 5. Process Emergency Queue
    SOS->>CISF: 6. Dispatch Nearest Security Unit (Terminal Mesh)
    SOS->>Police: 7. Trigger Direct API 112 Call Out
    SOS-->>App: 8. Display Live Responder Distance & Status Tracker
```

---

## ✨ Enterprise Feature Matrix

### 1. 🛂 Biometric Multi-Credential Identity Vault
* **W3C Verifiable Credentials**: Native support for Aadhaar, Indian Passport, DigiLocker, and IATA One ID.
* **Canvas Biometric Scanner**: Interactive face-scanning visualizer (`FaceIdAnimation.jsx`) with dynamic biometric vector overlays.
* **Cryptographic Auto-Purge**: Automatic session destruction upon transit completion.

### 2. ✈️ Aviation Telemetry & Terminal Navigation
* **Live Flight Radar**: Track flight status, gate changes, and departure countdowns.
* **Smart Airport Wayfinding**: Turn-by-turn interactive map (`SmartAirportMap.jsx`) for airport gates, lounges, and baggage carousels.
* **Price Intelligence Engine**: Predictive fare analytics (`PriceIntelligence.jsx`) and flight trend analysis.

### 3. 🧳 IoT Baggage Tracking & GPS Telematics
* **RFID & BLE Mesh**: Real-time baggage location updates from check-in counter to cargo hold and arrival belt.
* **Baggage Discrepancy Alerts**: Instant push notifications if luggage is misrouted or delayed.

### 4. 🏨 Hospitality Ecosystem & Bureau of Immigration Integration
* **Automated Form C Wizard**: One-tap generation of Bureau of Immigration Form C (`FormCWizard.jsx`) for domestic and foreign travelers.
* **Biometric Keyless Room Entry**: Encrypted NFC/QR room access keys.
* **Zero-Touch Folio Checkout**: Seamless bill payment (`HotelBillPayments.jsx`) and automated invoice generation.

### 5. 🔒 Security, Data Privacy & DPDP Act 2023 Compliance
* **Granular Consent Manager**: Total passenger control (`ConsentManager.jsx`) over which entities (airlines, hotels, security) can access data.
* **Zero Central Biometric Storage**: Zero-knowledge proof architecture ensures plaintext facial data is never stored centrally.
* **Right to be Forgotten**: One-tap data wipe enforcing DPDP Act 2023 regulations.

### 6. 🌐 Dynamic Viewport & Multilingual Localization
* **Force-Desktop Mobile Controller**: Custom JavaScript viewport engine in `index.html` ensuring mobile devices render high-density Desktop UI layouts (`width=1280`) by default.
* **Multilingual i18n**: Real-time language switching across **English**, **Hindi**, and **Bengali**.

---

## 🌐 External API Integrations Table

| Integration | Category | API Protocol | Functionality |
| :--- | :--- | :--- | :--- |
| **UIDAI Aadhaar API** | Identity | REST / XML Sign | E-KYC & Demographic Identity Verification |
| **DigiLocker / Passport Seva** | Credentials | OAuth2 / JSON | Verifiable Passport Document Extraction |
| **IATA One ID Registry** | Aviation | gRPC / JSON-LD | International Biometric Interoperability |
| **Bureau of Immigration (FRRO)** | Compliance | SOAP / REST | Automated Hotel Form C Registration |
| **Amadeus / Sabre GDS** | Flights | REST / WebHooks | Real-time Flight Schedules & Gate Telemetry |
| **Emergency 112 API** | Safety | Telematics WebHook | Automated CISF & Police GPS Emergency Dispatch |
| **Razorpay / UPI Intent** | Payments | WebHook / HTTPS | Tokenized Hotel & Flight Payment Settlement |

---

## 🛠 Tech Stack & Infrastructure

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19.2 + Vite 8.2 | Component engine & ultra-fast HMR ESM bundler |
| **Routing** | React Router DOM v7 | Single Page Application client-side routing |
| **Design System** | Custom Vanilla CSS3 | Glassmorphic, HSL variable tokens, CSS Grid |
| **Icons** | Lucide React | Modern SVG vector icons |
| **Localization** | `i18next`, `react-i18next` | Multilingual dictionary translation engine |
| **Hosting & Edge CDN** | Vercel Global CDN | 24/7 Production hosting with SPA rewrite engine |
| **CI/CD Automation** | GitHub Actions | Automated build, test, and deploy workflow |

---

## 📁 Repository Architecture

```text
Digiyatra-2.0/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions CI/CD Pipeline
├── public/
│   ├── FC.mp4                    # Hero Background Video (Compressed)
│   ├── HC.mp4                    # Hotel Ecosystem Video (Compressed)
│   ├── HV.mp4                    # Flight Telemetry Video (Compressed)
│   └── favicon.svg               # Application Brand Icon
├── src/
│   ├── components/               # Modular UI Components
│   │   ├── BaggageTracker.jsx    # Real-time luggage telemetry
│   │   ├── BookingModal.jsx      # Universal booking flow modal
│   │   ├── ConsentManager.jsx    # DPDP Act 2023 privacy controls
│   │   ├── FaceIdAnimation.jsx   # Biometric scanning visualizer
│   │   ├── FlightTracker.jsx     # Live flight status component
│   │   ├── FormCWizard.jsx       # Hotel FRRO Form C auto-filler
│   │   ├── Header.jsx            # Glassmorphic header & navigation
│   │   ├── IdentityWallet.jsx    # Verifiable credentials manager
│   │   ├── SmartAirportMap.jsx   # Airport terminal interactive map
│   │   └── TrustCenter.jsx       # Security compliance dashboard
│   ├── context/
│   │   └── DigiYatraContext.jsx  # Global application state manager
│   ├── data/                     # Mock data engines & flight DB
│   ├── hooks/
│   │   └── useAnimations.js      # Scroll reveal & viewport hooks
│   ├── locales/                  # Translation dictionaries (en, hi, bn)
│   ├── pages/                    # Main views (DigiYatra, Hotels, Info)
│   │   ├── DigiYatraPage.jsx
│   │   ├── HotelsStayPage.jsx
│   │   └── InfoPage.jsx
│   ├── App.jsx                   # React Router entry point
│   ├── i18n.js                   # i18n configuration module
│   └── main.jsx                  # React DOM mount point
├── .gitignore                    # Git file exclusion rules
├── .vercelignore                 # Vercel deployment exclusion rules
├── index.html                    # Entry HTML & Desktop Viewport Engine
├── LICENSE                       # MIT License File
├── package.json                  # Dependencies & build scripts
├── README.md                     # Comprehensive Architecture Documentation
├── vercel.json                   # Vercel SPA Rewrite Rules
└── vite.config.js                # Vite build & dev server config
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Local Development Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Aniket-Das-2006/Digiyatra-2.0.git
   cd Digiyatra-2.0
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   *Access local server at `http://localhost:3000`*

4. **Build Production Bundle:**
   ```bash
   npm run build
   ```

---

## 🌐 Live Production Deployment

The production application is deployed globally on Vercel's Edge Network with automated SPA rewrite rules and 24/7 availability.

* 🔗 **Live Production App**: [https://digiyatra-2-0.vercel.app](https://digiyatra-2-0.vercel.app)
* 🔗 **GitHub Repository**: [https://github.com/Aniket-Das-2006/Digiyatra-2.0](https://github.com/Aniket-Das-2006/Digiyatra-2.0)

---

## ☕ Buy Me A Coffee & Developer Support

If you find this project inspiring or visionary for India's digital transit infrastructure, consider supporting its developer!

<div align="center">

<details>
<summary style="cursor: pointer;">
  <img src="https://img.shields.io/badge/☕%20Buy%20Me%20A%20Coffee-Support%20Aniket%20Das-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" height="42" />
  <br/>
  <sub><b>👉 Click here to reveal Developer Payment & Direct Contact Details (GPay / PhonePe / Paytm / Call) 👈</b></sub>
</summary>

<br/>

### 📲 Developer Contact & Direct Support
**Aniket Das**

| Channel | Details / Link |
| :--- | :--- |
| **Phone & Call** | [`+91 7478715872`](tel:+917478715872) |
| **WhatsApp Direct** | [`Chat on WhatsApp (+91 7478715872)`](https://wa.me/917478715872) |
| **Google Pay / PhonePe / Paytm / BHIM UPI** | `7478715872` (`7478715872@upi`) |

<br/>

[![WhatsApp Direct](https://img.shields.io/badge/WhatsApp-Direct%20Chat-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/917478715872)
[![Direct Phone Call](https://img.shields.io/badge/Call%20Direct-7478715872-0088cc?style=for-the-badge&logo=phone&logoColor=white)](tel:+917478715872)
[![Star this Repo](https://img.shields.io/badge/⭐%20Star%20Repo-DigiYatra--2.0-yellow?style=for-the-badge)](https://github.com/Aniket-Das-2006/Digiyatra-2.0/stargazers)

</details>

</div>

---

## ⚖️ License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for complete details.

```text
MIT License
Copyright (c) 2026 Aniket Das
```

---

<div align="center">

**Built with [❤️](https://wa.me/917478715872) by [Aniket Das](https://github.com/Aniket-Das-2006)**  
*Revolutionizing India's Digital Travel Infrastructure.*

</div>
