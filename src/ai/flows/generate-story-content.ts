'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating story content based on a given topic.
 *
 * It includes:
 * - `generateStoryContent`:  The main function to trigger the story generation flow.
 * - `GenerateStoryContentInput`: The input type for the `generateStoryContent` function.
 * - `GeneratedStoryContentOutput`: The output type representing the generated story content.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryContentInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate the story content.'),
});
export type GenerateStoryContentInput = z.infer<typeof GenerateStoryContentInputSchema>;

const GeneratedStorySlideSchema = z.object({
  heading: z.string().describe('The heading for the slide.'),
  text: z.string().describe('The main text content of the slide.'),
  image_prompt: z.string().describe('The prompt to use for generating the slide image.'),
  image_alt: z.string().describe('The alt text for the slide image.'),
});

const GeneratedStoryContentOutputSchema = z.object({
  title: z.string().describe('The title of the story.'),
  excerpt: z.string().describe('A short excerpt or summary of the story.'),
  cover_image_prompt: z.string().describe('The prompt to use for generating the cover image.'),
  slides: z.array(GeneratedStorySlideSchema).describe('An array of story slides.'),
});
export type GeneratedStoryContentOutput = z.infer<typeof GeneratedStoryContentOutputSchema>;

export async function generateStoryContent(
  input: GenerateStoryContentInput
): Promise<GeneratedStoryContentOutput> {
  return generateStoryContentFlow(input);
}

const generateStoryContentPrompt = ai.definePrompt({
  name: 'generateStoryContentPrompt',
  input: {schema: GenerateStoryContentInputSchema},
  output: {schema: GeneratedStoryContentOutputSchema},
  prompt: `You are an AI that generates content for web stories.  Given a topic, you will output a JSON structure that represents a complete web story. The web story contains the following:

- title: The title of the story.
- excerpt: A short excerpt or summary of the story.
- cover_image_prompt: The prompt to use for generating the cover image.
- slides: An array of story slides. Each slide contains:
  - heading: The heading for the slide.
  - text: The main text content of the slide.
  - image_prompt: The prompt to use for generating the slide image.
  - image_alt: The alt text for the slide image.

Topic: {{{topic}}}

Output the story content in JSON format:
`,
});

const generateStoryContentFlow = ai.defineFlow(
  {
    name: 'generateStoryContentFlow',
    inputSchema: GenerateStoryContentInputSchema,
    outputSchema: GeneratedStoryContentOutputSchema,
  },
  async input => {
    const {output} = await generateStoryContentPrompt(input);
    return output!;
  }
);
