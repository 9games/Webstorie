import type { StorySummary } from '@/lib/types';
import { supabase } from '@/lib/supabase';

export async function getPublishedStories(): Promise<StorySummary[]> {
  try {
    const { data: stories, error } = await supabase
      .from('stories')
      .select('slug, title, excerpt, coverImageUrl, publishedAt')
      .order('publishedAt', { ascending: false });

    if (error) {
      throw error;
    }
    
    // Ensure all required fields are present
    const validStories = stories.filter(story => 
        story.slug && story.title && story.coverImageUrl && story.publishedAt
    );

    return validStories as StorySummary[];

  } catch (error) {
    console.error("Error fetching stories from Supabase:", error);
    return [];
  }
}
