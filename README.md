# PDF Summary UI

A modern web application for summarizing PDF documents using AI technology.

## Project Description

This application provides a user-friendly interface for uploading PDF documents and generating AI-powered summaries. Built with Next.js and TypeScript, it offers a seamless experience for document processing and summarization.

### Live Demo

Try the application live at: [https://pdf-summary-ai.vercel.app/](https://pdf-summary-ai.vercel.app/)

### Key Features

- PDF document upload and processing
- AI-powered document summarization
- Modern, responsive user interface

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Docker and Docker Compose (for containerized deployment)

### Local Development Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd pdf-summary-ui
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

## Docker Usage

### Building and Running with Docker

1. Build and start the containers:

```bash
docker-compose up --build
```

2. To run in detached mode (background):

```bash
docker-compose up -d --build
```

3. To stop the containers:

```bash
docker-compose down
```

4. To view logs:

```bash
docker-compose logs -f
```

### Docker Configuration

- The application runs on port 3000
- Environment variables are loaded from `.env.local`
- Health checks are implemented to monitor application status
- Resource limits are set for optimal performance

## API Documentation

### Endpoints

#### POST /api/summarize

Summarizes a PDF document.

**Request:**

- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `file`: PDF file to summarize

**Response:**

```json
{
  "summary": "string",
  "status": "success"
}
```

**Error Response:**

```json
{
  "error": "string",
  "status": "error"
}
```

### Environment Variables

| Variable            | Description                                      | Required |
| ------------------- | ------------------------------------------------ | -------- |
| OPENAI_API_KEY      | OpenAI API key for document summarization        | Yes      |
| NODE_ENV            | Application environment (development/production) | No       |
| NEXT_PUBLIC_API_URL | Public API URL                                   | No       |

## Development

### Available Scripts

- `yarn dev`: Start development server
- `yarn build`: Build production application
- `yarn start`: Start production server
- `yarn lint`: Run ESLint
- `yarn test`: Run tests

### Project Structure

```
pdf-summary-ui/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript type definitions
├── public/           # Static assets
├── Dockerfile        # Docker configuration
├── docker-compose.yml # Docker Compose configuration
└── package.json      # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
