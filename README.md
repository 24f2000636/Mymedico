# CareSync AI - Smart Healthcare Platform

A fully functional, production-ready frontend web application designed to improve how healthcare providers and patients interact, manage information, and streamline care workflows. 

## 🎨 UI & Design System
- **Theme**: Modern gradient from Green to Blue (`#2ecc71` → `#3498db` → `#1abc9c`) representing health and trust.
- **Aesthetic**: Soft glassmorphism / neumorphism cards, rounded UI (12px+ border-radius).
- **Typography**: Clean, readable Poppins and Inter fonts.
- **Animations**: Smooth Framer Motion transitions and CSS keyframe ambient blobs.

## 🧠 Core Features & Architecture
- **AI Healthcare Assistant**: Simulated Chat-based assistant utilizing context-aware prompts (Demo for Vertex AI / Gemini integration). Understands urgency (e.g. chest pain triggers immediate warnings).
- **User Roles (Persona-Based Logic)**:
  - **Patient**: View vitals, book appointments, chat with AI, upload records.
  - **Doctor**: View patient schedule, check pending reports.
  - **Admin**: Monitor system metrics, platform growth, and alerts.
- **Smart Dashboard**: Real-time mock data visualized with `Recharts`.
- **Appointments**: Organized layout, visual tags for video vs in-person (Google Calendar / Google Maps integration placeholders).
- **Medical Records**: Upload, search, and filter documents. Secure Cloud Storage design pattern.

## ☁️ Google Services Integration Strategy
*This prototype implements the UI and state architecture for these services. Actual deployment requires providing your own API keys.*
- **Firebase Auth**: JWT / Role-based state management is implemented in `zustand` (`src/store/authStore.ts`).
- **Google Cloud Storage**: File management system designed in `Records.tsx`.
- **Vertex AI / Gemini**: Chatbot framework built in `Assistant.tsx`.
- **Google Calendar**: Appointment structures setup in `Appointments.tsx`.

## ⚡ Tech Stack
- React 19 + Vite
- Tailwind CSS v4
- Zustand (Global State Management)
- Framer Motion (Animations)
- Recharts (Data Visualization)
- Lucide React (Icons)

## 🛠️ Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
   *The built files will be located in the `dist` directory.*

## 🧪 Testing & Quality
- Modular structure with reusable layout and components.
- Strong TypeScript typing.
- Edge case validation in Chat AI (urgent medical condition detection).
- ARIA labels and semantic HTML for Accessibility.
