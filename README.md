# TempMail - Temporary Email Generator

A professional, feature-rich temporary email service built with Next.js 16, React, and Firebase. Create disposable email addresses instantly for privacy protection, testing, and signup purposes.

## Features

✨ **Core Features**
- **Instant Email Generation**: Create temporary email addresses in seconds with zero setup
- **Real-time Inbox**: View incoming emails with auto-refresh capability
- **Email Reading**: Read full HTML and text-based email content with sanitization
- **Email Management**: Delete emails with one click
- **Copy to Clipboard**: Quickly copy your temporary email address
- **Auto-Refresh**: Optional polling-based automatic inbox refresh (5s, 10s, 30s, 60s intervals)
- **Session Persistence**: Firebase stores your session and emails
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
- Next.js API Routes
- Firebase Firestore (Database)
- Firebase Authentication (Anonymous)

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

3. **Configure Firebase:**
   - Create a Firebase project at https://firebase.google.com
   - Enable Firestore Database and Anonymous Authentication
   - Get your Firebase config from Project Settings
   - Add environment variables to `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Open your browser:**
   Navigate to http://localhost:3000

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main application page
│   ├── globals.css             # Global styles with animations
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── contact/
│   │   └── page.tsx            # Contact form page
│   ├── privacy/
│   │   └── page.tsx            # Privacy Policy
│   ├── terms/
│   │   └── page.tsx            # Terms of Service
│   ├── cookies/
│   │   └── page.tsx            # Cookie Policy
│   ├── disclaimer/
│   │   └── page.tsx            # Disclaimer
│   ├── not-found.tsx           # 404 page
│   └── api/
│       └── email/
│           ├── generate/route.ts    # Generate email endpoint
│           ├── inbox/route.ts       # Fetch inbox endpoint
│           ├── message/route.ts     # Read email endpoint
│           └── delete/route.ts      # Delete email endpoint
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
│   ├── firebase.ts             # Firebase configuration
│   ├── mailtm.ts               # Mail.tm API client
│   └── store.ts                # Zustand state management
├── public/                     # Static assets
└── package.json
```

## API Routes

### POST /api/email/generate
Generate a new temporary email address.

**Response:**
```json
{
  "id": "email-id",
  "address": "temp@example.com",
  "password": "password",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### GET /api/email/inbox?accountId=xxx
Fetch the inbox for an email account.

**Response:**
```json
{
  "messages": [
    {
      "id": "msg-id",
      "from": { "address": "sender@example.com", "name": "Sender" },
      "subject": "Email Subject",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET /api/email/message?accountId=xxx&messageId=xxx
Read a specific email message.

**Response:**
```json
{
  "id": "msg-id",
  "from": { "address": "sender@example.com", "name": "Sender" },
  "subject": "Email Subject",
  "text": "Plain text content",
  "html": ["<p>HTML content</p>"]
}
```

### DELETE /api/email/delete?accountId=xxx&messageId=xxx
Delete a specific email message.

## Features in Detail

### Professional UI/UX
- Clean, modern design with gradient accents
- Smooth animations and transitions throughout
- Responsive layout that works on all devices
- Dark-aware color system
- Accessibility best practices (ARIA labels, semantic HTML)

### State Management
- Zustand for efficient global state management
- Persistent session storage with Firebase
- Real-time email list updates
- Selected email message tracking

### Security
- HTML sanitization with DOMPurify
- Secure API route handlers
- Firebase Firestore security rules
- Anonymous authentication (no personal data required)

### Legal Pages
- Privacy Policy
- Terms of Service
- Cookie Policy
- Disclaimer
- About page
- Contact page

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
2. Your session is saved in Firebase for 1 hour
3. All emails auto-delete after account inactivity

## Configuration Options

### Auto-Refresh Intervals
- 5 seconds (real-time)
- 10 seconds (balanced)
- 30 seconds (moderate)
- 60 seconds (battery-saving)

### Color Scheme
- Professional blue gradient primary colors
- Neutral slate grays for backgrounds
- Accent colors for interactive elements
- Smooth color transitions on hover

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 12+, Android 5+)

## Performance
- Optimized Next.js 16 with Turbopack
- Minimal CSS with Tailwind
- Efficient component rendering
- API response caching where appropriate

## Troubleshooting

**Firebase Configuration Error**
- Verify all environment variables are set correctly
- Check Firebase project settings for API key restrictions
- Ensure Firestore Database is enabled

**Mail.tm API Issues**
- The Mail.tm service is free but rate-limited
- Verify your internet connection
- Check if the Mail.tm service is operational

**Emails Not Loading**
- Enable auto-refresh for polling updates
- Clear browser cache and refresh
- Check network tab in browser DevTools

## Deployment

### Vercel (Recommended)
```bash
# Connect your GitHub repository
# Push to main branch
# Vercel automatically deploys
```

### Other Platforms
```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## License
MIT License - Feel free to use for personal or commercial projects

## Support
- Create an issue on GitHub for bugs
- Use the contact form on the website for inquiries
- Check the FAQ section

## Future Enhancements
- WebSocket support for real-time email updates
- Email forwarding to personal inbox
- Custom domain support
- Team collaboration features
- Advanced filtering and search
- Email backup and export

## Credits
Built with Next.js, React, Firebase, and Mail.tm API.
Designed for privacy-conscious users worldwide.
