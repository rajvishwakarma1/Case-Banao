# Case Banao

## Table of Contents

- [Features](#features)
- [About](#about)
- [Getting Started](#getting-started)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

## Features

- Clean and responsive UI with dark mode.
- Interactive animations.
- Authorization using Kinde - a third-party authentication service.
- Drag and Drop feature for uploading images.
- Cropping images.
- Variety of phone models and colors for phone cases.
- Integrated payments using Stripe.
- Admin dashboard for managing orders and products.

## About

**Case Banao** is an e-commerce platform that allows users to customize their phone cases with their favorite pictures. Users can personalize cases by selecting different phone models, colors, and designs. The platform integrates secure payments and provides a smooth user experience.

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js (>=16.x)
- npm (>=8.x) or yarn (>=1.x)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/rajvishwakarma1/Case-Banao.git
cd Case-Banao
```

Install dependencies using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

## Running Locally

Start the development server:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

Navigate to `http://localhost:3000`. The page will automatically reload if you make changes to the code.

## Project Structure

Project directory structure:

```bash
/project-root
│
├── /src             # Source directory
│   ├── /app         # Root directory
│   ├── /lib         # Commonly used functions
│   ├── /models      # Mongoose models for backend
│   ├── /types       # Type definitions for TypeScript
│   └── /components  # Shared React components
├── /public          # Static files
├── .gitignore       # Git ignore rules
├── next.config.js   # Next.js configuration
└── package.json     # Project metadata and scripts
```

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** Kinde
- **Payments:** Stripe
- **Hosting:** Vercel

## License

This project is licensed under the MIT License.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

## Contact

For any inquiries, reach out to [Raj Vishwakarma](https://github.com/rajvishwakarma1).

