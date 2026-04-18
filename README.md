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

<img width="506" height="1015" alt="Screenshot 2026-04-15 072435" src="https://github.com/user-attachments/assets/e8fa1298-7676-447f-9b7f-6171b85305dc" />

<img width="512" height="958" alt="Screenshot 2026-04-15 083507" src="https://github.com/user-attachments/assets/78eae9db-bf47-410b-8ebf-5759d7bd8893" />

<img width="514" height="1029" alt="Screenshot 2026-04-15 083728" src="https://github.com/user-attachments/assets/04309763-ee8b-4a8e-8a29-14cbc00331d2" />


