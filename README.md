# AI Content Analytics Platform

A full-stack web app that analyzes written content for readability, sentiment, and keyword density, and shows the results on live-updating dashboards.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white)




---

## Features

- **AI-generated insights:** sends content to the OpenAI API for sentiment analysis, topic clustering, and content recommendations, storing each result with a confidence score
- **Engagement tracking:** records likes, shares, comments, views, and engagement rate per post across platforms like LinkedIn, Instagram, and YouTube
- **Live dashboards:** Recharts and D3 visualizations that update in real time over Socket.io
- **Teams and roles:** organizations with owner, admin, member, and viewer roles
- **Authentication:** sign-in with NextAuth.js, sessions stored in PostgreSQL
- **Reports:** daily, weekly, monthly, and custom performance reports



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

- **Throttling real-time updates:** Pushing every change over WebSockets made the dashboard re-render constantly. Batching updates on the server and sending them at a fixed interval kept the charts smooth without losing data.
- **Indexing matters early:** Queries slowed down as more content was stored. Adding MongoDB indexes on the fields I filtered and sorted by most (like creation date and content ID) made lookups noticeably faster.
- **Keeping heavy work off the request path:** Running the analysis directly inside API requests made responses slow. Separating submission from processing and notifying the client when results were ready made the app feel much more responsive.
- **Text analysis has limits:** Sentiment scoring struggled with sarcasm and mixed tones, which taught me to treat the scores as signals, not ground truth.

## What's Next

- Add user accounts so people can track their content over time
- Write tests for the analysis pipeline and API endpoints
- Deploy with a CI/CD pipeline so updates go live automatically
