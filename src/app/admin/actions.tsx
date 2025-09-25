'use server';

import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

import { generateStoryContent, type GenerateStoryContentInput } from '@/ai/flows/generate-story-content';
import type { StoryContent, StorySummary } from '@/lib/types';
import { slugify, hashCode } from '@/lib/utils';
import { getPublishedStories } from '@/lib/data';
import { renderAmpStory } from '@/lib/amp-renderer';

// --- Story Generation Actions ---
export async function generateStoryAction(input: GenerateStoryContentInput): Promise<StoryContent | null> {
  try {
    const storyData = await generateStoryContent(input);
    return storyData;
  } catch (error) {
    console.error('Error generating story content:', error);
    return null;
  }
}

// --- Publishing Action ---
export async function publishStoryAction(storyData: StoryContent): Promise<{ success: boolean; slug?: string, error?: string }> {
  try {
    const slug = slugify(storyData.title);
    const publishedAt = new Date().toISOString();

    const getImageUrl = (prompt: string) => `https://picsum.photos/seed/${hashCode(prompt)}/1080/1920`;

    const finalStory: StoryContent = {
      ...storyData,
      slug,
      publishedAt,
      coverImageUrl: getImageUrl(storyData.cover_image_prompt),
      slides: storyData.slides.map(slide => ({
        ...slide,
        imageUrl: getImageUrl(slide.image_prompt),
      })),
    };

    // 1. Create AMP HTML file and save it
    const storyDir = path.join(process.cwd(), 'public', 'stories', slug);
    await fs.mkdir(storyDir, { recursive: true });
    
    // Save full story JSON for potential future use (e.g., editing)
    await fs.writeFile(path.join(storyDir, 'story.json'), JSON.stringify(finalStory, null, 2));

    const ampHtml = renderAmpStory(finalStory);
    await fs.writeFile(path.join(storyDir, 'index.html'), ampHtml);

    // 2. Update the main stories.json list
    const stories = await getPublishedStories();
    const newStorySummary: StorySummary = {
      slug,
      title: finalStory.title,
      excerpt: finalStory.excerpt,
      coverImageUrl: finalStory.coverImageUrl!,
      publishedAt,
    };

    // Add new story to the beginning of the list
    const updatedStories = [newStorySummary, ...stories.filter(s => s.slug !== slug)];
    
    const storiesFilePath = path.join(process.cwd(), 'data', 'stories.json');
    await fs.writeFile(storiesFilePath, JSON.stringify(updatedStories, null, 2));

    // 3. Revalidate homepage cache
    revalidatePath('/');
    revalidatePath('/admin');

    return { success: true, slug };
  } catch (error) {
    console.error("Publishing error:", error);
    return { success: false, error: (error as Error).message };
  }
}
