import { renderToStaticMarkup } from 'react-dom/server';
import { AmpStoryPage } from '@/components/amp/AmpStoryPage';
import type { StoryContent } from '@/lib/types';

export async function renderAmpStory(story: StoryContent): Promise<string> {
    const ampHtml = `<!DOCTYPE html>${renderToStaticMarkup(<AmpStoryPage story={story} />)}`;
    return ampHtml;
}
