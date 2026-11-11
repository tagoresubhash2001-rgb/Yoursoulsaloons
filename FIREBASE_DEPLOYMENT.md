# Firebase Hosting Deployment Guide — YOUR SOUL (Salon & Academy)

This document provides the deployment procedure and verification checklist for deploying the **YOUR SOUL — Salon & Academy** website to Firebase Hosting.

---

## 1. Architecture & Build Configuration

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom editorial font tokens (`Cormorant Garamond` + `Plus Jakarta Sans`)
- **Distribution Directory**: `dist/` (configured in `firebase.json` under `hosting.public`)
- **Routing**: Client-side SPA routing (`/salon`, `/salon/about`, `/salon/services`, `/salon/contact`, `/academy`, `/academy/about`, `/academy/services`, `/academy/contact`).
- **SPA Rewrite Rule**: Configured in `firebase.json` so all requests rewrite to `/index.html`:
  ```json
  "rewrites": [
    {
      "source": "**",
      "destination": "/index.html"
    }
  ]
  ```

---

## 2. Pre-Deployment Step: Local Production Build

Before deploying, run the production build to verify that all TypeScript types, assets, and styling compile cleanly:

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Build the production bundle
npm run build
```

This generates optimized static HTML, CSS, JavaScript, and asset bundles inside the `dist/` directory.

---

## 3. Firebase CLI Setup & Deployment Commands

Ensure you have the Firebase CLI installed globally or via `npx`:

```bash
# Verify Firebase CLI installation
firebase --version
# (or install via npm: npm install -g firebase-tools)

# Log in to your approved Google / Firebase account
firebase login

# Select or verify your Firebase project
firebase use your-soul-salon-academy
# (or switch to your exact Firebase project ID via: firebase use --add)

# Deploy exclusively to Firebase Hosting (does NOT overwrite Firestore or Auth)
firebase deploy --only hosting
```

---

## 4. Post-Deployment Verification Checklist

Once deployed, verify the following items against the live hosting URL:

| Test Item | Expected Result | Pass/Fail |
|---|---|---|
| **Root URL (`/`)** | Loads `/salon` default with Salon branding and hero. | [ ] |
| **Direct Navigation** | Directly opening `/salon/about` or `/academy/courses` loads without 404 errors. | [ ] |
| **Refresh Behavior** | Refreshing any nested page maintains the selected mode and route. | [ ] |
| **Browser History** | Browser Back & Forward buttons navigate correctly between pages and modes. | [ ] |
| **Mode Switcher** | Toggling between `[SALON]` and `[ACADEMY]` switches navigation, branding, banners, and content. | [ ] |
| **8 Independent Banners** | All 8 banner slots are distinct and display their designated title, slot ID, and specs. | [ ] |
| **About Page Alternation** | Alternating image-and-text layout (image-left then text-left) on both Salon and Academy. | [ ] |
| **Salon About** | Displays "About Our Founders", "Our Vision", "Our Mission", and "Our Approach". | [ ] |
| **Academy About** | Displays "About Our Trainers", "Academy Vision", "Academy Mission", and "Our Teaching Approach". | [ ] |
| **Inquiry Modals** | Reservation and Admissions modals validate inputs, display loading state, and confirm receipt. | [ ] |
| **Mobile Responsiveness** | Top navigation collapses into accessible drawer with mobile mode toggle. No horizontal overflow. | [ ] |

---

## 5. Custom Domain & SSL Configuration

To link your custom domain (e.g., `yoursoul.salon`):

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Build > Hosting**.
3. Click **Add custom domain**.
4. Enter your apex domain (`yoursoul.salon`) or subdomain (`www.yoursoul.salon`).
5. Add the provided `TXT` and `A` records to your DNS provider (Cloudflare, Namecheap, Google Domains).
6. Firebase automatically provisions and renews free SSL certificates (usually takes 15–60 minutes).

---

## 6. Photo Asset Slot Guidelines

All 8 mandatory banners are independently configurable in `src/config/siteContent.ts`:

1. **Slot 1 (Salon Home Hero)**: `public/banners/salon_home_hero.jpg` (16:9, 2560 × 1440px)
2. **Slot 2 (Salon About Banner)**: `public/banners/salon_about_banner.jpg` (16:9, 2560 × 1440px)
3. **Slot 3 (Salon Services Banner)**: `public/banners/salon_services_banner.jpg` (16:9, 2560 × 1440px)
4. **Slot 4 (Salon Contact Banner)**: `public/banners/salon_contact_banner.jpg` (16:9, 2560 × 1440px)
5. **Slot 5 (Academy Home Hero)**: `public/banners/academy_home_hero.jpg` (16:9, 2560 × 1440px)
6. **Slot 6 (Academy About Banner)**: `public/banners/academy_about_banner.jpg` (16:9, 2560 × 1440px)
7. **Slot 7 (Academy Services Banner)**: `public/banners/academy_services_banner.jpg` (16:9, 2560 × 1440px)
8. **Slot 8 (Academy Contact Banner)**: `public/banners/academy_contact_banner.jpg` (16:9, 2560 × 1440px)

Site owners can also use the live **Photo Asset Slot Inspector** button in the footer or in each banner frame to paste image URLs or local paths with immediate live preview.
