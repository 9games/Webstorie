# **App Name**: Storie Weaver

## Core Features:

- Homepage Display: Display published web stories in a responsive grid layout, fetching data from `stories.json` or Supabase.
- Story Page Rendering: Render valid AMP Web Story pages with dynamic content, including meta tags and slide display.
- Admin Authentication: Password-protect the admin panel, verifying against an environment variable.
- AI Story Generation: Generate story JSON structure (title, excerpt, slides) and image prompts using Google Gemini API. The LLM acts as a tool to reason about information such as the format.
- Live Preview: Show a live preview of the generated story in a mobile frame within the admin panel.
- Story Editing: Allow basic edits to story content and regenerate specific slides as needed.
- Publishing and Storage: Publish stories by creating unique slugs, saving story JSON and images, generating AMP HTML, and updating the homepage listing.

## Style Guidelines:

- Primary color: Deep purple (#6750A4) to evoke creativity and modernity.
- Background color: Light gray (#F2F0F4), a desaturated version of the primary color, to provide a neutral backdrop.
- Accent color: Lavender (#D0BCFF), an analogous color to the primary, providing a vibrant contrast for interactive elements.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines and 'Inter' (sans-serif) for body text to offer a modern yet readable aesthetic.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use clean, minimalist icons from 'shadcn/ui' to represent story categories and actions.
- Responsive grid layout for the homepage to adapt to different screen sizes.
- Subtle animations on story cards and transitions to enhance user experience.