# TempMail - Setup & Configuration Guide

## Quick Start (5 minutes)

### 1. Prerequisites
- Node.js 18+ installed
- pnpm package manager (or npm/yarn)
- Firebase account (free at https://firebase.google.com)

### 2. Installation

```bash
# Clone or extract the project
cd v0-project

# Install dependencies
pnpm install

# Create .env.local file with your Firebase config
cp .env.example .env.local  # If template exists, or create manually
```

### 3. Firebase Configuration

**Step A: Create Firebase Project**
1. Go to https://firebase.google.com/console
2. Click "Create Project" or "Add project"
3. Enter project name: "TempMail"
4. Continue with default settings

**Step B: Set Up Firestore Database**
1. In Firebase Console, go to "Build" → "Firestore Database"
2. Click "Create Database"
3. Select "Production mode" (configure security rules below)
4. Choose region closest to you
5. Click "Create"

**Step C: Enable Anonymous Authentication**
1. Go to "Build" → "Authentication"
2. Click "Get Started"
3. Click "Sign-up method"
4. Find "Anonymous" and click it
5. Enable the toggle
6. Save

**Step D: Get Your API Credentials**
1. Click the "Settings" gear icon (top left)
2. Go to "Project settings"
3. Scroll to "SDK setup and configuration"
4. Copy the config object

### 4. Configure Environment Variables

Create `.env.local` file in project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Example:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tempmail-123abc.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tempmail-123abc
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tempmail-123abc.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456789
```

### 5. Configure Firestore Security Rules

In Firestore Console:
1. Go to "Firestore Database" → "Rules" tab
2. Replace default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anonymous users to create and manage their own data
    match /accounts/{userId} {
      allow create, read, update, delete: if request.auth != null && request.auth.uid == userId;
    }
    
    match /emails/{userId}/{document=**} {
      allow create, read, update, delete: if request.auth != null && request.auth.uid == userId;
    }
    
    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click "Publish"

### 6. Run Development Server

```bash
# Start Next.js dev server
pnpm dev

# Server will run on http://localhost:3000
# Turbopack should compile in ~500ms
```

### 7. Verify Setup

1. Open http://localhost:3000 in your browser
2. Click "Generate Temporary Email"
3. You should see a new email address
4. Click the copy button to copy it
5. Verify it shows "Copied to clipboard"
6. Check all navigation links work
7. Visit /about, /contact, /privacy, etc.

## Troubleshooting

### Firebase Configuration Error
**Error:** "Firebase initialization error" or "FIREBASE_API_KEY is not set"

**Solution:**
1. Check `.env.local` exists in project root
2. Verify all variables are set correctly
3. Ensure no extra spaces or quotes
4. Restart dev server after changing .env

### Port Already in Use
**Error:** "Port 3000 is already in use"

**Solution:**
```bash
# Kill process using port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
pnpm dev -- -p 3001
```

### Mail.tm API Connection Error
**Error:** "Failed to connect to Mail.tm"

**Solution:**
1. Check internet connection
2. Verify Mail.tm service is operational
3. Check API rate limiting (free tier: 200/day)
4. Wait a few minutes and try again

### Emails Not Loading
**Error:** Inbox stays empty or shows errors

**Solution:**
1. Enable auto-refresh (5s interval)
2. Generate a new email and try again
3. Check browser console for errors (F12)
4. Clear browser cache: Ctrl+Shift+Delete
5. Check Firestore database has data

### Build Errors
**Error:** Compilation errors in terminal

**Solution:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

## Deployment

### Deploy to Vercel (Recommended)

```bash
# 1. Push code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main

# 2. Go to https://vercel.com
# 3. Connect GitHub account
# 4. Select repository
# 5. Add environment variables (same as .env.local)
# 6. Deploy!
```

### Deploy to Other Services

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod
```

**Docker:**
```bash
# Build image
docker build -t tempmail .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_FIREBASE_API_KEY=your_key \
  tempmail
```

## Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
pnpm build --analyze

# Check Lighthouse score
# Built into modern browsers
```

### Database Optimization
1. Create Firestore indexes for frequent queries
2. Archive old emails after 30 days
3. Batch delete old accounts

### API Optimization
1. Enable API caching headers
2. Implement request deduplication
3. Rate limit to prevent abuse

## Testing

### Manual Testing Checklist
- [ ] Email generation works
- [ ] Copy to clipboard works
- [ ] Inbox loads emails
- [ ] Can read email content
- [ ] Can delete emails
- [ ] Auto-refresh works at all intervals
- [ ] Mobile responsive (use DevTools)
- [ ] All links in header work
- [ ] All footer links work
- [ ] 404 page displays correctly

### Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Development Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck
```

## Project Structure Reference

```
v0-project/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Main app page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── api/email/               # API routes
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   ├── privacy/                 # Privacy policy
│   ├── terms/                   # Terms of service
│   ├── cookies/                 # Cookie policy
│   ├── disclaimer/              # Disclaimer
│   └── not-found.tsx            # 404 page
├── components/                   # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── EmailGenerator.tsx
│   ├── InboxList.tsx
│   ├── EmailViewer.tsx
│   ├── AutoRefresh.tsx
│   ├── ErrorDisplay.tsx
│   └── ui/                      # shadcn/ui components
├── lib/                          # Utilities & helpers
│   ├── firebase.ts              # Firebase config
│   ├── mailtm.ts                # Mail.tm API client
│   └── store.ts                 # Zustand state
├── public/                       # Static assets
├── .env.local                   # Environment variables (CREATE THIS)
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## Environment Variables Reference

| Variable | Type | Example | Required |
|----------|------|---------|----------|
| NEXT_PUBLIC_FIREBASE_API_KEY | string | AIzaSy... | ✅ |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | string | app.firebaseapp.com | ✅ |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | string | my-project | ✅ |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | string | app.appspot.com | ✅ |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | string | 123456789012 | ✅ |
| NEXT_PUBLIC_FIREBASE_APP_ID | string | 1:12345:web:abc | ✅ |

## Important Notes

### Security
- These environment variables are public (NEXT_PUBLIC_)
- They're visible in browser console
- Not suitable for sensitive secrets
- Firebase security rules protect data
- Anonymous users can only access their own data

### Rate Limits
- Mail.tm: 200 emails/day (free tier)
- Firebase: Generous free tier
- Consider upgrade for production

### Data Retention
- Emails auto-delete after 1 hour inactivity
- Sessions stored in Firestore
- Automatic cleanup runs periodically

## Need Help?

### Resources
- Next.js docs: https://nextjs.org
- Firebase docs: https://firebase.google.com/docs
- Tailwind CSS: https://tailwindcss.com
- Shadcn/ui: https://ui.shadcn.com

### Contact
- Create an issue in GitHub
- Check existing issues for solutions
- Review the documentation files

---

**Last Updated**: April 21, 2026
**Setup Version**: 1.0
