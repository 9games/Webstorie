import { AmpStoryPage } from '@/components/amp/AmpStoryPage';
import type { StoryContent } from '@/lib/types';

export function renderAmpStory(story: StoryContent): string {
    const ampHtml = AmpStoryPage({ story });
    return ampHtml;
}
