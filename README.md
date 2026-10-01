# AI Content Analytics Platform

A full-stack web app that analyzes written content for readability, sentiment, and keyword density, and shows the results on live-updating dashboards.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white)


![Landing page](docs/landing.png)

---

## Features

- **Readability scoring:** grades text using [method, e.g. Flesch-Kincaid] so writers can see how easy their content is to read
- **Sentiment classification:** labels content as positive, neutral, or negative using [library or model you used]
- **Keyword density analysis:** finds the most-used terms and flags overuse
- **Live dashboards:** Chart.js visualizations that update in real time over WebSockets
- **REST API:** Node.js/Express endpoints for submitting content and fetching results, backed by indexed MongoDB collections

## Screenshots

| Dashboard | Analysis results |
|---|---|
| ![Dashboard](docs/dashboard.png) | ![Results](docs/results.png) |

## Architecture

```
React client  ──HTTP──▶  Express REST API  ──▶  Analysis pipeline
     ▲                         │                (readability, sentiment,
     │                         ▼                 keyword density)
     └──WebSocket updates──  MongoDB  ◀──────────────┘
```

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Muhafud/REPO-NAME.git
cd REPO-NAME

# Backend
cd server
npm install
cp .env.example .env   # add your MONGODB_URI
npm run dev

# Frontend (new terminal)
cd client
npm install
npm start
```

## What I Learned

- [One or two sentences on a real challenge, e.g. keeping dashboard updates in sync over WebSockets without flooding the client]
- [Something you'd do differently or add next]
