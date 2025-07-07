# Deadlock Stat Tracker

A web app for tracking player statistics in Valve’s game **Deadlock**. Users can search for Steam profiles and view match history, performance data, and more. Built for speed and simplicity, with caching to minimize external API calls.

## Tech Stack

- React + TypeScript + Vite (frontend)
- Vercel serverless functions (`/api` backend)
- Redis cache (via Upstash or similar)
- [deadlock-api.com](https://deadlock-api.com) for game data

## How It Works

- User searches a Steam ID
- Serverless function checks Redis for cached stats
- If no cache, data is pulled from the Deadlock API and stored temporarily
- Data is returned and displayed instantly in the UI

## Features

- Player stat lookup by Steam ID
- Match performance and history
- Fast loads using Redis cache
- Minimal, responsive interface

## Status

Active development. Future updates may include:
- Player comparison
- Stat visualizations
- Mobile enhancements
