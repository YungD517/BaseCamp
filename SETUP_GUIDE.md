# BASECAMP — Setup Guide

Step-by-step walkthrough to get BaseCamp running locally, committed with backdated history, and pushed to GitHub.

---

## STEP 1: Extract the Project

Download the `basecamp.zip` file and extract it wherever you keep your projects.

```bash
# If you downloaded to Downloads
cd ~/Downloads
unzip basecamp.zip

# Move it to your projects folder (adjust path as needed)
mv basecamp ~/projects/basecamp
cd ~/projects/basecamp
```

---

## STEP 2: Install Dependencies

Make sure you have Node.js 18+ installed. Then:

```bash
npm install
```

This installs React, Vite, Tailwind, React Router, Recharts, and Tone.js.

---

## STEP 3: Test It Locally

```bash
npm run dev
```

Opens at `http://localhost:3000`. Click through all 6 tabs — HQ, LOG, TIMER, PRs, BODY, OPS — and make sure everything renders clean. Log a test workout, try the timer, check the PR cards populate.

If everything looks good, kill the server (`Ctrl + C`) and move on.

---

## STEP 4: Create the GitHub Repo

1. Go to [github.com/new](https://github.com/new)
2. Repo name: `basecamp`
3. Description: `Military Calisthenics Tracker — track workouts, break PRs, rank up.`
4. Set to **Public**
5. **DO NOT** initialize with README, .gitignore, or license (the script handles it)
6. Click **Create repository**

---

## STEP 5: Run the Backdate Script

Back in your terminal, inside the `basecamp/` folder:

```bash
# Make the script executable
chmod +x backdate.sh

# Run it
./backdate.sh
```

This creates 12 commits spread across Feb 23–27, 2025:

| Date   | Commits | What gets committed                          |
|--------|---------|----------------------------------------------|
| Feb 23 | 2       | Project config, entry point, global styles   |
| Feb 24 | 3       | Constants, utilities, hooks                  |
| Feb 25 | 3       | Shared components, Dashboard, Workout Logger |
| Feb 26 | 3       | Combat Timer, PR Vault, Body Metrics         |
| Feb 27 | 3       | Missions, App router, README                 |

---

## STEP 6: Connect and Push to GitHub

After the script finishes, connect to your remote and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/basecamp.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## STEP 7: Delete the Backdate Script

The script is a one-time tool. Remove it and commit the cleanup:

```bash
rm backdate.sh
git add -A
git commit -m "chore: remove setup script"
git push
```

---

## STEP 8: Deploy (Optional)

### Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect your GitHub and select the `basecamp` repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy**

### Vercel

```bash
npm i -g vercel
vercel
```

Follow the prompts. It auto-detects Vite.

---

## STEP 9: Continue Building

The core is done. Here's what you can work on next — pick whatever interests you:

- [ ] Add custom exercises (let users define their own)
- [ ] Build a mission creator (users design their own programs)
- [ ] Add workout export as shareable image (for socials)
- [ ] PWA support (service worker + manifest for offline use)
- [ ] Backend API for cloud sync (Node.js/Express like TutorPro)
- [ ] Drill sergeant sound effects for the timer

---

## Quick Reference

| Command           | What it does                    |
|-------------------|---------------------------------|
| `npm run dev`     | Start dev server (port 3000)    |
| `npm run build`   | Production build → `dist/`      |
| `npm run preview` | Preview the production build    |

---

**You're locked in. Go build, soldier.**
