'use client';
import type { StoryContent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { hashCode } from '@/lib/utils';
import Image from 'next/image';
import { Smartphone, Sparkles } from 'lucide-react';

export default function StoryPreview({ story }: { story: StoryContent | null }) {
  if (!story || !story.title) {
    return (
      <Card className="flex flex-col items-center justify-center h-full min-h-[600px] bg-muted/50 border-2 border-dashed">
        <div className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          <p className="text-lg font-medium text-muted-foreground">Your story will appear here</p>
          <p className="text-sm text-muted-foreground">Generate a story to see a live preview.</p>
        </div>
      </Card>
    );
  }

  const getImageUrl = (prompt: string) => {
    if (!prompt) return `https://picsum.photos/seed/placeholder/1080/1920`;
    const seed = hashCode(prompt);
    return `https://picsum.photos/seed/${seed}/1080/1920`;
  };

  const coverImageUrl = getImageUrl(story.cover_image_prompt);
  const slides = story.slides?.map(slide => ({
    ...slide,
    imageUrl: getImageUrl(slide.image_prompt)
  })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><Smartphone/> Preview</CardTitle>
        <CardDescription>This is how your story will look on a mobile device.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="w-[320px] h-[580px] rounded-3xl border-8 border-foreground bg-black overflow-hidden relative shadow-2xl">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {/* Cover Slide */}
              <CarouselItem>
                <div className="w-full h-full relative text-white flex flex-col justify-end">
                  <Image src={coverImageUrl} alt={story.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="relative p-6">
                    <h1 className="font-headline text-3xl font-bold leading-tight">{story.title}</h1>
                  </div>
                </div>
              </CarouselItem>
              {/* Content Slides */}
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="w-full h-full relative text-white flex flex-col justify-end">
                    <Image src={slide.imageUrl || ''} alt={slide.image_alt} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="relative p-4 space-y-2 bg-black/50 backdrop-blur-sm m-2 rounded-lg">
                      <h2 className="font-headline text-xl font-bold">{slide.heading}</h2>
                      <p className="text-sm leading-relaxed">{slide.text}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </CardContent>
    </Card>
  );
}
