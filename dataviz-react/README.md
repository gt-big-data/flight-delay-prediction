# Flight Delay Prediction Application

This is a web application that provides flight delay prediction and updates, powered by machine learning technology. The app allows users to track flight delays, receive notifications on delay updates, and view detailed flight information.

## Key Features

- View flight delay predictions to help you plan your travel.
- Receive notifications for flight delays.
- Access flight-specific information like baggage details and flight policies.
- Check past flight delay history for better insights.

## Technologies Used

- **Frontend**: React.js (React Router, Tailwind CSS)
- **Backend**: Firebase Authentication (for authentication and token verification)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed (version 12 or above).
- **npm or yarn**: You should have `npm` or `yarn` installed to manage dependencies.
- **Firebase Account**: Set up Firebase for authentication.

## Installation

Follow the steps below to set up and run the project locally:

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/flight-delay-prediction.git
   cd flight-delay-prediction
   ```

2. Install the project dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration details:

   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

## Running the Application

Once the installation is complete, you can start the development server:

```sh
npm start
# or
yarn start
```

This will start the application and it will be accessible at `http://localhost:3000`.

## Usage

1. **Sign In**: Upon loading the application, you will see the login page. You can sign in using Google OAuth.
2. **View Flights**: Once logged in, you will be redirected to the main flight view where you can see flight delay predictions and details.
3. **Notifications**: Click the notification icon to enable/disable notifications for specific flights.
4. **User Settings**: Navigate to the Profile page to view your information and log out.

## Project Structure

The main folders and files are:

- **`src/`**: Contains all the source code.
  - **`components/`**: Reusable components like `Button`, `FlightCard`, and `Header`.
  - **`routes/`**: Pages for different routes such as `Flights`, `Profile`, `Settings`, and `Notification`.
  - **`auth/`**: Handles authentication-related components like `SignIn`.
  - **`constants/`**: Holds static files such as logos and icons.
  - **`App.js`**: Main application component.
  - **`index.js`**: Entry point of the React application.

## Deployment

To deploy this application, follow the standard procedure for your chosen deployment platform (e.g., Netlify, Vercel, or Firebase Hosting):

1. Build the production version of the application:

   ```sh
   npm run build
   # or
   yarn build
   ```

2. Deploy the `build` folder to your preferred hosting provider.

## Chrome Extension

After deployment, copy the `manifest.json` file located in the `src` folder and paste it inside the `dist` folder. This is required to properly configure the Chrome extension.
