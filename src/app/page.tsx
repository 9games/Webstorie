import Link from 'next/link';
import Image from 'next/image';
import { getPublishedStories } from '@/lib/data';
import { StoryCard } from '@/components/StoryCard';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const stories = await getPublishedStories();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background opacity-50"></div>
           <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,transparent_10%,hsl(var(--background)))]"></div>
          </div>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Storie Weaver
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Weave captivating web stories with the power of AI. From a single idea to a published story in minutes.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/admin">
                    Get Started <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="stories" className="py-16 md:py-24 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
              Latest Stories
            </h2>
            {stories.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {stories.map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground border-2 border-dashed border-border rounded-lg p-12">
                <p className="text-lg font-medium">No stories have been published yet.</p>
                <p className="mt-2">Head to the admin panel to create your first one!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
