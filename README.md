Welcome to the Reel Talk Frontend Web App repository! This documentation will guide you through the setup process and provide essential information to get started with developing for our organization.

For this project, we use Next.js(pages router), TailwindCSS, TypeScript, Firebase auth, Axios, SHADCN UI library, nookies, and other libraries. Familiarize yourself with the codebase, and take your time as it is a lot to take in.

## Pre-requisites
Before you begin, make sure you have the following prerequisites installed on your machine:
- Node.js: Next.js requires Node.js version 10.13 or later. You can download it [here](https://nodejs.org/).
- npm: npm is the package manager for JavaScript. It is included with Node.js, so you don't need to install it separately.

## Setup
Follow these steps to set up the Reel Talk Web app repository on your local machine:

1. Clone the Repository:
   
   ```bash
   git clone https://github.com/reel-talk/reeltalk-web.git
   ```
2. Navigate to the Project Directory
   ```bash
   cd reeltalk-web
   ```
3. Install Dependencies:
    ```bash
    npm install
    ```
4. Before you start the project, make sure to import the Apple private key file into the project otherwise apple OAuth sign-in won't work.
![image](https://github.com/reel-talk/reeltalk-web/assets/106896704/71bcab26-ca94-4bf2-850b-3cb7e85cc713)

5. Now you can start the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the   result.


# Project Structure

## src
- Parent folder to all page files, components, firebase-config, hooks, and helper code

## pages folder
- index.tsx - entry point for the user, the landing page
- login.tsx - entry point for users to log in or create a new account
- onboarding folder - contains all onboarding pages, components for these files can be found in the components folder under the corresponding folder name.
- legal folder - contains static pages with terms and conditions pages
- community folder - contains pages for the community pages

## lib folder
- context.tsx - React context setup to capture user auth data from Firebase, check out this file to learn more about how our auth system works.

## hooks folder
- useJoinLeaveCommunity.tsx - community hook for joining/leaving a community
- useMediaSearch.tsx - movie search hook that returns movies/TV shows
- useMediaSelection.tsx - contains two hooks, one for fetching popular movies or TV shows in onboarding and the other for selecting options

## Firebase folder
Contains firebase-config file

## Components folder
Contains components and hooks used throughout the project. The "UI" folder is for SHADCN/UI components. I would suggest against adding other components into that folder other than SHADCN/UI Components

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
