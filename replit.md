# Overview

This is a Bitcoin dashboard application built with modern web technologies. The application provides real-time market data, portfolio tracking, node status monitoring, and transaction history for Bitcoin-related activities. It features a dark-themed interface optimized for cryptocurrency enthusiasts and professionals who need comprehensive Bitcoin analytics and monitoring capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with React 18 and TypeScript, following a modern component-based architecture:

- **Framework**: React with TypeScript for type safety and developer experience
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with CSS variables for theming and shadcn/ui components for consistent UI elements
- **Build Tool**: Vite for fast development and optimized production builds

The application uses a dashboard layout with multiple components for different data visualizations including price charts, portfolio breakdown, exchange rates, node status, and transaction history.

## Backend Architecture

The backend follows a REST API pattern built with Express.js and TypeScript:

- **Framework**: Express.js with TypeScript
- **Architecture Pattern**: Layered architecture with routes, storage abstraction, and service layers
- **Data Flow**: RESTful endpoints serving JSON responses
- **Error Handling**: Centralized error handling middleware

The server provides endpoints for market data, price history, exchange rates, node status, portfolio information, and transaction data.

## Data Storage Solutions

The application uses a flexible storage abstraction pattern:

- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: PostgreSQL with Neon serverless database integration
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing

The database schema includes tables for users, Bitcoin prices, exchange rates, node status, portfolio assets, and transactions with proper relationships and data types.

## Authentication and Authorization

The application includes a basic user authentication system:

- **Session Management**: Express session handling with PostgreSQL session store (connect-pg-simple)
- **User Storage**: User table with username/password authentication
- **Authorization**: Role-based access patterns ready for implementation

## External Service Integrations

The application integrates with several external services and APIs:

- **CoinGecko API**: Primary source for Bitcoin market data including price, volume, market cap, and 24-hour changes
- **Chart.js**: Dynamic loading for price chart visualizations
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit Integration**: Development environment optimizations with Replit-specific plugins and banners

The market data is fetched from CoinGecko's public API and cached using React Query, with automatic refresh intervals for real-time updates. The application validates API responses using Zod schemas before storing or displaying the data.