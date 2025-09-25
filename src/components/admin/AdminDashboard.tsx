'use client';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import type { StoryContent, StorySummary } from '@/lib/types';
import { generateStoryAction, publishStoryAction } from '@/app/admin/actions.tsx';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import StoryPreview from './StoryPreview';
import PublishedStories from './PublishedStories';
import { Header } from '@/components/Header';
import { Loader2, Wand2, BookUp, Trash2 } from 'lucide-react';

const slideSchema = z.object({
  heading: z.string().min(1, 'Heading is required'),
  text: z.string().min(1, 'Text is required'),
  image_prompt: z.string(),
  image_alt: z.string(),
});

const storyFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  cover_image_prompt: z.string(),
  slides: z.array(slideSchema),
});

export default function AdminDashboard({ initialStories }: { initialStories: StorySummary[] }) {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<StoryContent | null>(null);

  const form = useForm<z.infer<typeof storyFormSchema>>({
    resolver: zodResolver(storyFormSchema),
  });
  
  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "slides",
  });

  const handleGenerate = async () => {
    if (!topic) {
      toast({ variant: 'destructive', title: 'Topic is required' });
      return;
    }
    setIsGenerating(true);
    setGeneratedStory(null);
    form.reset({});
    try {
      const result = await generateStoryAction({ topic });
      if (result) {
        setGeneratedStory(result);
        form.reset(result);
        toast({ title: 'Story Generated!', description: 'You can now preview and edit your story.' });
      } else {
        throw new Error('AI generation failed to return data.');
      }
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Generation Failed', description: 'Could not generate story. Please check the console.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async (data: z.infer<typeof storyFormSchema>) => {
    setIsPublishing(true);
    try {
      const result = await publishStoryAction(data);
       if (result.success) {
        toast({ title: 'Story Published!', description: `Your new story is live at /stories/${result.slug}` });
        setGeneratedStory(null);
        form.reset({});
        setTopic('');
      } else {
        throw new Error(result.error || 'Unknown error during publishing.');
      }
    } catch (error) {
       console.error(error);
       toast({ variant: 'destructive', title: 'Publishing Failed', description: 'Could not publish story. Please check the console.' });
    } finally {
        setIsPublishing(false);
    }
  };
  
  const storyDataForPreview = form.watch();

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto">
            <TabsTrigger value="generator">Story Generator</TabsTrigger>
            <TabsTrigger value="published">Published Stories</TabsTrigger>
          </TabsList>
          <TabsContent value="generator">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
              {/* Left side: Controls and Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><Wand2 /> Generator</CardTitle>
                  <CardDescription>Create a new web story from a topic.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter a topic, e.g., 'The history of coffee'"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        disabled={isGenerating}
                      />
                      <Button onClick={handleGenerate} disabled={isGenerating || !topic}>
                        {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Generate
                      </Button>
                    </div>
                  </div>
                  
                  {isGenerating && (
                     <div className="text-center p-8 flex flex-col items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">Generating your story... this may take a moment.</p>
                     </div>
                  )}

                  {generatedStory && (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handlePublish)} className="space-y-6 mt-6">
                        <ScrollArea className="h-[calc(100vh-22rem)] pr-4">
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold font-headline">Edit Story</h3>
                          <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="excerpt" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Excerpt</FormLabel>
                              <FormControl><Textarea {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <Separator />

                          {fields.map((field, index) => (
                             <Card key={field.id} className="bg-muted/50">
                               <CardHeader className="flex flex-row items-center justify-between">
                                 <CardTitle className="text-md font-headline">Slide {index + 1}</CardTitle>
                                 <Button variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                               </CardHeader>
                               <CardContent className="space-y-4">
                                  <FormField control={form.control} name={`slides.${index}.heading`} render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Heading</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )} />
                                    <FormField control={form.control} name={`slides.${index}.text`} render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Text</FormLabel>
                                        <FormControl><Textarea {...field} rows={3} /></FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )} />
                               </CardContent>
                            </Card>
                          ))}
                          </div>
                        </ScrollArea>
                         <Button type="submit" size="lg" className="w-full" disabled={isPublishing}>
                          {isPublishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BookUp className="mr-2 h-4 w-4" />}
                          Publish Story
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>

              {/* Right side: Preview */}
              <StoryPreview story={storyDataForPreview as StoryContent} />
            </div>
          </TabsContent>
          <TabsContent value="published">
            <PublishedStories initialStories={initialStories} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
