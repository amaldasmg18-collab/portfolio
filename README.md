# Amaldas MG: Cybersecurity Portfolio

A static portfolio built with HTML, CSS and vanilla JavaScript. No build step, no framework, no backend.

## Files
```text
cybersecurity-portfolio/
├── index.html      page content
├── style.css       design (colours and spacing are variables at the top)
├── script.js       theme toggle, mobile menu, terminal
├── README.md
└── assets/favicon.svg
```

## Run locally
Double-click `index.html`, or in VS Code right-click it and choose "Open with Live Server" if you have that extension.

## Deploy with GitHub Pages
1. Create a new repository on GitHub (for example `cybersecurity-portfolio`) or pick an existing one.
2. Upload every file and the `assets` folder so that `index.html` sits at the repository root.
3. Open the repository's **Settings**.
4. Click **Pages** in the left sidebar.
5. Under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**.
6. Click **Save**.
7. Wait a minute or two, then refresh the Pages screen. The live URL appears at the top.
8. To update later, edit the files and commit or upload the changes to `main`. The site rebuilds automatically.

**URL difference:** a normal project repository publishes at `https://USERNAME.github.io/REPOSITORY-NAME/`. A repository named exactly `USERNAME.github.io` publishes at `https://USERNAME.github.io/`. All paths in this site are relative, so both work.

## Updating content
- Add a project: copy an `<article class="card">` block in the Projects section of `index.html`.
- Change colours: edit the variables at the top of `style.css`.
- Add a terminal answer: edit the `COMMANDS` object in `script.js`.

Once you know your live URL, you can add `<link rel="canonical" href="YOUR-URL">` to the `<head>`.
