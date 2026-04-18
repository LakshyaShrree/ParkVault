# ParkVault

ParkVault is a full-stack Progressive Web App for smart parking rentals built with React, Vite, Tailwind CSS, Firebase Authentication, Firestore, Storage, and PWA support.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Paste your Firebase configuration in `src/firebase/config.js`.

3. Run the app:
   ```bash
   npm run dev
   ```

4. To seed sample spaces into Firestore:
   ```bash
   npm run seed
   ```

## Firebase rules

Use the provided `firestore.rules` file with your Firebase project.

## Features

- Email/password signup, login, logout
- Role selection for vehicle owners and space owners
- Real-time spaces feed, bookings, and owner dashboard
- Upload parking space photos to Firebase Storage
- Currency conversion display
- Offline installable PWA with home screen support
