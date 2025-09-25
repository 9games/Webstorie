'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import type { StorySummary } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

export function StoryCard({ story }: { story: StorySummary }) {
  return (
    <Link href={`/stories/${story.slug}/`} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:shadow-primary/20">
        <CardHeader className="p-0">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={story.coverImageUrl}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {story.title}
          </CardTitle>
          <p className="mt-2 text-muted-foreground text-sm line-clamp-3">
            {story.excerpt}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
           <Badge variant="secondary">
             {formatDistanceToNow(new Date(story.publishedAt), { addSuffix: true })}
           </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
