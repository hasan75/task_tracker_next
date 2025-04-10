# Task Tracker Frontend

![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwind-css)

A  task management application with  seamless API integration.

## ✨ Features

- 🎨 **Beautiful UI** with Tailwind CSS styling
- 🔄 **Real-time sync** with backend API
- ✅ **Task management**:
  - Add new tasks
  - Mark as complete/incomplete
  - Delete tasks
- 🚀 **Optimized performance** with Next.js
- 📦 **Data persistence** using localStorage


## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hasan75/task_tracker_next.git
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure environment**:
   Create `.env.local` file:
   ```env
    NEXT_PUBLIC_API_URL=https://tast-tracker-express.onrender.com
   ```

## 🛠 Development

**Start development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
task-tracker/
├── app/
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── AddTask.tsx       # Task creation form
│   ├── TaskList.tsx      # Task display component
│   ├── ConfirmationDialog.tsx # Delete confirmation
│   └── ToastProvider.tsx # Notification system
├── public/               # Static assets
├── types/                # TypeScript types
└── utils/                # API utilities
```

## 🔧 Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **Notifications**: react-hot-toast
- **Icons**: react-icons
- **API Client**: Axios

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL |