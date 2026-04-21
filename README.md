# TempMail - Temporary Email Generator

A professional, feature-rich temporary email service built with Next.js 16 and React. Create disposable email addresses instantly for privacy protection, testing, and signup purposes.

## Features

✨ **Core Features**
- **Instant Email Generation**: Create temporary email addresses in seconds with zero setup
- **Real-time Inbox**: View incoming emails with auto-refresh capability
- **Email Reading**: Read full HTML and text-based email content with sanitization
- **Email Management**: Delete emails with one click
- **Copy to Clipboard**: Quickly copy your temporary email address
- **Auto-Refresh**: Optional polling-based automatic inbox refresh (5s, 10s, 30s, 60s intervals)
- **Session Persistence**: Emails and sessions are managed in-memory with Zustand
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Privacy-Focused**: No registration required, completely anonymous

## Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Shadcn/ui Components
- Lucide Icons

**Backend:**
- Next.js API Routes (Serverless)
- Mail.tm API Integration

**External Services:**
- Mail.tm API (Email Backend)
- DOMPurify (HTML Sanitization)
- Zustand (State Management)

## Installation

### Prerequisites
- Node.js 18+ and pnpm

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd v0-project
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to http://localhost:3000

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main application page
│   ├── globals.css             # Global styles with animations
│   ├── api/
│   │   └── email/
│   │       ├── generate/route.ts    # Generate email endpoint
│   │       ├── inbox/route.ts       # Fetch inbox endpoint
│   │       ├── message/route.ts     # Read email endpoint
│   │       └── delete/route.ts      # Delete email endpoint
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Footer with links
│   ├── EmailGenerator.tsx       # Email generation UI
│   ├── InboxList.tsx           # Inbox display component
│   ├── EmailViewer.tsx         # Email content viewer
│   ├── AutoRefresh.tsx         # Auto-refresh settings
│   ├── ErrorDisplay.tsx        # Error toast notifications
│   └── ui/                     # Shadcn/ui components
├── lib/
│   ├── mailtm.ts               # Mail.tm API client
│   └── store.ts                # Zustand state management
├── public/                     # Static assets
└── package.json
```

## Usage

### Creating a Temporary Email
1. Click "Generate Temporary Email" button on the homepage
2. Your email address is automatically copied to clipboard
3. Share it for sign-ups, testing, or verification

### Reading Emails
1. Enable auto-refresh to check for new emails automatically
2. Click on any email in the inbox to read its full content
3. Copy the email content with the "Copy Email" button

### Managing Emails
1. Delete individual emails with the trash icon

## Credits
Built with Next.js, React, and Mail.tm API.
Designed for privacy-conscious users worldwide.
