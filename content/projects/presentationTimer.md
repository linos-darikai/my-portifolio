## Overview

Presentation Timer keeps everyone in a capstone presentation on the same clock. An organiser creates a timer and shares its page, and every screen showing that timer starts and stops together.

## Features

- Create a timer with one click; each timer gets its own unique ID and page
- Separate pages for creating a timer and for viewing it
- Start and stop commands are broadcast over WebSockets (STOMP), so all viewers update instantly
- REST endpoints to fetch a single timer or list all active timers

## Built with

Java and Spring Boot, Spring's WebSocket messaging, a thread-safe in-memory store, and plain HTML/JavaScript pages.
