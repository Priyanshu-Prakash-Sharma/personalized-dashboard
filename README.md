# ✨ Personalized Content Dashboard

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**[➡️ View Live Demo](https://personalized-dashboard-olive.vercel.app/)**

---

## 📖 Project Overview

This is a dynamic and interactive dashboard built as a solution for the **SDE Internship Frontend Development assignment**. The application provides users with a feature-rich, personalized feed of content from multiple real-world APIs, allowing for a high degree of customization and a modern user experience.

---

## 🚀 Key Features

- 🎨 **Personalized & Unified Feed**: Aggregates content from multiple live APIs (**NewsAPI**, **OMDb API**) into a single, seamless feed.
- 🔧 **User Preference Management**: Filter the content feed by selecting favorite categories from a settings panel.
- 🔍 **Real-time Search**: A search bar that instantly filters all content as you type.
- ✋ **Drag-and-Drop Reordering**: Click and drag content cards to organize the feed in any preferred order.
- ⭐ **Favorites System**: Mark items as "favorite" and view them on a dedicated `/favorites` page.
- 🔄 **Infinite Scrolling**: New content from different categories is automatically fetched as the user scrolls down.
- 🌗 **Light/Dark Mode**: A theme toggle in the header to switch between light and dark modes.
- 📱 **Responsive Design**: The UI is fully responsive and works seamlessly on all device sizes.

---

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **Drag & Drop**: [`dnd-kit`](https://dndkit.com/)
- **Infinite Scroll**: [`react-intersection-observer`](https://www.npmjs.com/package/react-intersection-observer)

---

## ⚙️ Getting Started

To run this project locally, follow these steps:

### 🔹 1. Clone the Repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

### 🔹 2. Install Dependencies

npm install


### 🔹 3. Set Up Environment Variables

Create a new file named `.env.local` in the root of the project and add your API keys:

NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key_here


### 🔹 4. Run the Development Server

npm run dev


Open the browser and visit:  
➡️ `http://localhost:3000`

---

## ⚠️ Known Issues

### 🌗 Theme Toggle Issue

The light/dark mode toggle is fully implemented using React, Redux, and Tailwind CSS. The Redux state updates correctly, and JavaScript applies the `dark` or `light` class to the `<html>` tag.

However, due to a persistent issue in the local development environment, Tailwind's `dark:` variant styles are not being visually applied.

✅ **All other features of the application are fully functional.**
