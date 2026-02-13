## Michael Petted Site (static)

This site is plain HTML/CSS/JS. You *can* (and usually should) run it on `localhost` while you edit so you get consistent behavior and faster iteration.

### Option A (easiest): VS Code / Cursor “Live Server”
- Install the **Live Server** extension
- Right‑click `index.html` → **Open with Live Server**
- You’ll get a URL like `http://127.0.0.1:5500` and it auto-refreshes on save.

### Option B (simple, live-reload): Node + `npx`
From the site folder:

```bash
cd "/Users/michaeldeangelo/Desktop/Michael Petted Site"
npx --yes live-server --port=3000 --open=/index.html
```

Notes:
- If port **3000** is already in use, change it (e.g. `--port=3001` or `--port=8080`).
- This gives live-reload when you save changes.

### Option C (no installs): Python (no live-reload)
From the site folder:

```bash
cd "/Users/michaeldeangelo/Desktop/Michael Petted Site"
python3 -m http.server 3000
```

Then open `http://localhost:3000` (you’ll need to refresh the browser manually after edits).

