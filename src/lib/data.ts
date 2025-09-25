import fs from 'fs/promises';
import path from 'path';
import type { StorySummary } from '@/lib/types';

const storiesFilePath = path.join(process.cwd(), 'data', 'stories.json');

export async function getPublishedStories(): Promise<StorySummary[]> {
  try {
    const data = await fs.readFile(storiesFilePath, 'utf-8');
    const stories = JSON.parse(data);
    // Sort by most recent
    return stories.sort((a: StorySummary, b: StorySummary) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.writeFile(storiesFilePath, '[]', 'utf-8');
      return [];
    }
    console.error("Error reading stories.json:", error);
    return [];
  }
}
