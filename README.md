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

Screenshots :

<img width="486" height="851" alt="Screenshot 2026-04-06 233158" src="https://github.com/user-attachments/assets/4a2226d3-a3fc-483a-b3e5-97c5cd20b67e" />

