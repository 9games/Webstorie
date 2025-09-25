'use client';
import { useState } from 'react';
import type { StorySummary } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ClipboardCopy, ExternalLink, History } from 'lucide-react';
import Link from 'next/link';

function CopyEmbedButton({ slug }: { slug: string }) {
  const { toast } = useToast();
  const embedCode = `<iframe src="https://storie.jeedailynews.online/stories/${slug}/" width="360" height="600" style="border:none;" allowfullscreen></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    toast({ title: 'Copied!', description: 'Embed code copied to clipboard.' });
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      <ClipboardCopy className="mr-2 h-4 w-4" />
      Copy Embed
    </Button>
  );
}


export default function PublishedStories({ initialStories }: { initialStories: StorySummary[] }) {
    const [stories] = useState(initialStories);

  return (
     <Card className="mt-6">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><History/> Published History</CardTitle>
          <CardDescription>Here are all the stories you've published.</CardDescription>
        </CardHeader>
        <CardContent>
            {stories.length === 0 ? (
                 <div className="text-center text-muted-foreground border-2 border-dashed border-border rounded-lg p-12">
                    <p className="text-lg font-medium">No stories published yet.</p>
                </div>
            ) : (
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Published Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {stories.map((story) => (
                        <TableRow key={story.slug}>
                        <TableCell className="font-medium">{story.title}</TableCell>
                        <TableCell>{format(new Date(story.publishedAt), 'PPP')}</TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/stories/${story.slug}/`} target="_blank">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View
                                </Link>
                            </Button>
                            <CopyEmbedButton slug={story.slug} />
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            )}
        </CardContent>
    </Card>
  );
}
