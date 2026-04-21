# TempMail - Quick Start Guide

## 30-Second Setup

1. **Create Firebase Account** (free): https://firebase.google.com
2. **Create Project** → Enable Firestore + Anonymous Auth
3. **Copy Firebase Config** to `.env.local` in project root
4. **Run**: `pnpm install && pnpm dev`
5. **Open**: http://localhost:3000

Done! ✅

---

## What You Get

### Core Features
✅ Generate temporary emails with one click  
✅ View inbox with real-time updates  
✅ Read full email content  
✅ Delete emails instantly  
✅ Auto-refresh with customizable intervals  
✅ Copy email to clipboard  
✅ Mobile-responsive design  

### Pages Included
✅ Beautiful home page with hero section  
✅ About page  
✅ Contact form  
✅ Privacy Policy  
✅ Terms of Service  
✅ Cookie Policy  
✅ Disclaimer  
✅ Custom 404 page  

### Design Features
✅ Professional gradient UI  
✅ Smooth animations throughout  
✅ Responsive on all devices  
✅ Accessible design (WCAG 2.1)  
✅ Fast with Turbopack  
✅ Beautiful component library  

---

## File Structure Overview

```
📁 Root
├── 📁 app/                    ← Pages & API
│   ├── page.tsx              ← Main app
│   ├── layout.tsx            ← HTML wrapper
│   ├── globals.css           ← Animations & styles
│   └── api/                  ← Server endpoints
├── 📁 components/            ← React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── EmailGenerator.tsx
│   ├── InboxList.tsx
│   ├── EmailViewer.tsx
│   ├── AutoRefresh.tsx
│   └── ErrorDisplay.tsx
├── 📁 lib/                   ← Utilities
│   ├── firebase.ts           ← Setup
│   ├── mailtm.ts             ← API client
│   └── store.ts              ← State management
├── .env.local                ← Your Firebase keys (CREATE)
└── package.json              ← Dependencies
```

---

## Core Concepts

### How It Works

1. **You click "Generate Email"**
   - Frontend calls `/api/email/generate`
   - API requests email from Mail.tm service
   - Email stored in Firebase Firestore
   - UI shows your new email address

2. **Incoming emails arrive**
   - Mail.tm receives them
   - You can fetch inbox with polling
   - Enable auto-refresh for automatic checks (5s, 10s, 30s, 60s)

3. **You read an email**
   - Click email in inbox
   - API fetches full content from Mail.tm
   - HTML sanitized for security
   - Display in viewer component

4. **You delete an email**
   - Click delete button
   - API removes from Mail.tm
   - UI updates instantly

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 16 + React 19 | UI & Routing |
| Styling | Tailwind CSS v4 | Beautiful design |
| State | Zustand | Global state |
| Database | Firebase Firestore | Session storage |
| API | Mail.tm | Email backend |
| Hosting | Vercel (recommended) | Deployment |

---

## Important Environment Variables

Create `.env.local` with these from Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

⚠️ **Important**: These variables are PUBLIC (visible in browser). Never put secrets here.

---

## Key Commands

```bash
# Start developing
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start

# Check for errors
pnpm lint

# Format code
pnpm format
```

---

## API Endpoints

All endpoints are in `/app/api/email/`

### Generate Email
```
POST /api/email/generate
Response: { id, address, password, createdAt }
```

### Fetch Inbox
```
GET /api/email/inbox?accountId=xxx
Response: { messages: [...] }
```

### Read Email
```
GET /api/email/message?accountId=xxx&messageId=xxx
Response: { id, from, subject, text, html, createdAt }
```

### Delete Email
```
DELETE /api/email/delete?accountId=xxx&messageId=xxx
Response: { success: true }
```

---

## Component Overview

### Header
- Sticky navigation bar
- Logo with gradient
- Responsive mobile menu

### Footer
- Multi-column layout
- Social links
- Categorized navigation
- Copyright info

### EmailGenerator
- Big "Generate" button
- Shows your email address
- Copy to clipboard button
- Generate new email option

### InboxList
- Displays all emails
- Shows sender, subject, date
- Click to read full email
- Delete individual emails

### EmailViewer
- Shows full email content
- Supports HTML & plain text
- Copy email button
- Close to return to inbox

### AutoRefresh
- Toggle auto-refresh on/off
- Select interval: 5s, 10s, 30s, 60s
- Visual feedback with colors

### ErrorDisplay
- Toast notifications
- Shows errors from API
- Auto-dismisses

---

## Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Success**: Green (#16a34a)
- **Error**: Red (#dc2626)
- **Background**: White/Slate

### Spacing
- Cards: 20-24px padding
- Elements: 8-16px gaps
- Mobile padding: 16px
- Desktop padding: 24-32px

### Animations
- Fade in: 300ms
- Slide up: 400ms
- Hover effects: 200ms
- Smooth transitions throughout

### Responsive Breakpoints
- Mobile: < 640px (default)
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Common Tasks

### Enable Auto-Refresh
1. Click the "Auto Refresh" card on the left
2. Toggle the switch to "Enabled"
3. Select refresh interval (5s is fastest)
4. Inbox will auto-update

### Read an Email
1. Wait for or generate an email
2. Click on any email in inbox
3. Full content appears on right
4. Click close (X) to return to inbox

### Delete an Email
1. Hover over email in inbox
2. Click trash icon
3. Email is removed from inbox

### Visit Legal Pages
1. Scroll to footer
2. Click any legal link (Privacy, Terms, etc.)
3. Read page content
4. Click back to home

### Copy Your Email
1. Generate an email
2. Click the copy icon next to email
3. Notification shows "Copied to clipboard"
4. Paste in signup forms

---

## Troubleshooting

### "Firebase not initialized"
**Fix**: Check `.env.local` has all Firebase variables, restart server

### "Port 3000 in use"
**Fix**: Kill process: `lsof -ti:3000 | xargs kill -9` (Mac/Linux)

### "Inbox is empty"
**Fix**: Enable auto-refresh, or wait a few seconds and refresh

### "Build errors"
**Fix**: `rm -rf .next node_modules && pnpm install && pnpm dev`

### "Emails disappear"
**Fix**: Normal - they auto-delete after 1 hour of inactivity

---

## Performance Tips

✅ Use 30s or 60s auto-refresh to save battery  
✅ Clear old emails to reduce storage  
✅ Use Chrome for best performance  
✅ Enable "Optimize" in browser DevTools  

---

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Go to vercel.com
3. Connect GitHub repo
4. Add environment variables
5. Deploy!

### Local Testing
```bash
pnpm build    # Build for production
pnpm start    # Run production server locally
```

Visit http://localhost:3000 to test

---

## Useful Links

📚 **Documentation**
- Full README: `README.md`
- Design Guide: `DESIGN_GUIDE.md`
- Setup Guide: `SETUP.md`
- Project Summary: `PROJECT_SUMMARY.md`

🔗 **External**
- Firebase: https://firebase.google.com
- Next.js: https://nextjs.org
- Tailwind: https://tailwindcss.com
- Mail.tm: https://mail.tm

---

## What's Included?

### Pre-built Components
✅ Header with mobile menu  
✅ Footer with multiple columns  
✅ Email generator with copy  
✅ Inbox list with search  
✅ Email viewer with HTML support  
✅ Auto-refresh toggle  
✅ Error notifications  
✅ 404 page  

### Pages
✅ Home (main app)  
✅ About  
✅ Contact  
✅ Privacy Policy  
✅ Terms of Service  
✅ Cookie Policy  
✅ Disclaimer  

### Features
✅ API routes (4 endpoints)  
✅ Firebase integration  
✅ State management  
✅ Email sanitization  
✅ Responsive design  
✅ Smooth animations  
✅ Accessibility WCAG 2.1  

---

## Next Steps

1. ✅ Set up Firebase (5 min)
2. ✅ Configure `.env.local` (2 min)
3. ✅ Run `pnpm dev` (1 min)
4. ✅ Generate an email (30 sec)
5. ✅ Test all features (5 min)
6. 🚀 Deploy to Vercel (5 min)

---

## Need Help?

- 📖 Check the documentation files
- 🔍 Search existing GitHub issues
- 💬 Create new issue with details
- 📧 Use contact form on website

---

**Happy Emailing! 🚀**

Created: April 21, 2026 | Framework: Next.js 16 | Design: Tailwind CSS v4
