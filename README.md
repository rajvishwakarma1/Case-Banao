# Case Cobra 

## Table of Contents

- [Features](#features)
- [About](#about)
- [Getting Started](#getting-started)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)

## Features
- Clean and responsive UI with dark mode.
- Interactive animations.
- Authorization using Kinde - a third-party authentication service.
- Drag and Drop feature for uploading images.
- Cropping images.
- Variety of Phone models and colors for phone cases.
- Integrated payments using Stripe.
- Admin dashboard.

## About

Case Cobra is a phone case e-commerce where users can customize their phone cases by using their favourite pictures on phone cases.

## Getting Started

Instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (>=16.x)
- npm (>=8.x) or yarn (>=1.x)

### Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/arjunbector/phone-case-ecommerce.git
cd phone-case-ecommerce
```
```
npm install
```
or with yarn
```bash
yarn install
```
## Running Locally
Start the development server
```bash
npm run dev
```
or with yarn
```bash
yarn dev
```
Navigate to http://localhost:3000. The page will automatically reload if you make changes to the code.

## Project Structure
Outline of the project directories and files:
```bash
/project-root
│
├── /src             # Source directory
        ├── /app            # Root directory
        ├── /lib            # Commonly used functions
        ├── /models         # Mongoose models for backend
        ├── /types          # Types for Typescript
        └── /components     # Shared React components
├── /public         # Static files
├── .gitignore      # Git ignore rules
├── next.config.js  # Next.js configuration
└── package.json    # Project metadata and scripts
```