# Storie Weaver

This is a Next.js project that allows users to generate, preview, and publish AMP Web Stories using AI.

## Features

- **AI-Powered Story Generation**: Enter a topic and let Google's Gemini API generate a complete story structure with titles, text, and image prompts.
- **Live Preview**: Instantly see how your story will look on a mobile device with a live in-app preview.
- **AMP Story Publishing**: Publish stories as valid AMP pages, making them fast, engaging, and discoverable.
- **Homepage Gallery**: All published stories are beautifully displayed on the homepage.
- **Password-Protected Admin**: A secure admin panel to manage story creation.
- **Embeddable Stories**: Easily copy iframe embed codes to share your stories anywhere.

## Getting Started

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```
# A secure password to access the /admin panel
ADMIN_PASSWORD="your_secure_password_here"

# Your Google Gemini API Key
# You can get one from Google AI Studio: https://aistudio.google.com/app/apikey
GEMINI_API_KEY="your_gemini_api_key_here"
```

### Running the Development Server

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

The admin panel is available at [http://localhost:9002/admin](http://localhost:9002/admin).

### Important Note on File System Access

This application writes to the local file system (`/data` and `/public` directories) to store and serve story content. This works perfectly in a local development environment or a traditional Node.js server setup.

When deploying to a serverless platform like Vercel, the file system is ephemeral or read-only. For full functionality on such platforms, the data persistence logic in `src/app/admin/actions.ts` would need to be updated to use a database service (e.g., Vercel KV, Supabase, etc.) instead of `fs` modules.
