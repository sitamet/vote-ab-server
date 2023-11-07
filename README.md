# Vote AB server

A/B poll server for real-time A/B voting.

## Introduction
Welcome to the `vote-ab-server` repository! This project is a server-side application designed to manage and facilitate a realtime A/B voting system. 
The aim is to provide an easy-to-use platform for conducting A/B votes on slide presentations.

## How does it work:
The vote-ab-server is a Node.js server application utilizing the Hapi framework to deliver a real-time A/B polling service. It employs WebSocket connections through `socket.io` for live communication between the server and clients.


## Technologies
List the technologies, frameworks, and libraries used in the project. For example:
- Node.js
- Hapi js
- Socket.io

## Requirements

This A/B poll server backend works in conjunction with client vote-ab frontend: https://github.com/sitamet/vote-ab


## Installation

To set up the vote-ab-server, ensure you have Node.js and npm installed. Then follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/sitamet/vote-ab-server.git
   ```
2. Navigate to the project directory:
   ```bash
   cd vote-ab-server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

To start the server, run the following command in the project directory:

```bash
npm start
```


## CI/CD with Github and Heroku

We are using the AkhileshNS/heroku-deploy. This is a very simple GitHub action that allows you to deploy to Heroku. The action works by running the following commands in shell via NodeJS:-

There is Procfile in our project folder and a folder called .github and inside it, another folder called workflows containing our deploy process.

