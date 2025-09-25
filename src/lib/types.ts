export interface StorySlide {
  heading: string;
  text: string;
  image_prompt: string;
  image_alt: string;
  imageUrl?: string;
}

export interface StoryContent {
  title: string;
  excerpt: string;
  cover_image_prompt: string;
  slides: StorySlide[];
  slug?: string;
  coverImageUrl?: string;
  publishedAt?: string;
}

export interface StorySummary {
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  publishedAt: string;
}
