# node-event-sourcing

In order to get a better grasp on Event Sourcing/CQRS, I'm writing a NodeJS implementation of the pattern.

Event Sourcing & CQRS written in TypeScript

## Todo

- Add aggregate loader ✔
  - register() command to register aggregates ✔
  - retrieve an aggregate to call its command handler ✔
- Store events after every command is handled ✔
- Publish events
- Subscribe to events (sagas)
- Replay events

## Installation

1. Clone repo
2. Install dependencies
  `npm install` or `yarn install`
3. Setup Postgres locally
    `docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecret -p 5432:5432 -d postgres`
