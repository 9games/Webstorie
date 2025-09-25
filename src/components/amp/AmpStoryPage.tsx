import React from 'react';
import type { StoryContent } from '@/lib/types';

export function AmpStoryPage({ story }: { story: StoryContent }) {
  const { title, excerpt, coverImageUrl, slides, slug } = story;

  const ampBoilerplate = `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`;
  const ampNoScript = `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`;
  const ampCustomStyles = `
    amp-story-page { background-color: #1a1a1a; }
    .cover-text { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 2.5em; color: white; line-height: 1.2; padding: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.7); }
    .slide-content { background-color: rgba(0,0,0,0.5); padding: 16px; border-radius: 8px; margin: 16px; }
    .slide-heading { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.8em; color: white; line-height: 1.3; }
    .slide-text { font-family: 'Inter', sans-serif; font-weight: 400; font-size: 1.1em; color: white; line-height: 1.5; margin-top: 8px; }
    amp-story-grid-layer.bottom { align-content: end; }
  `;

  return (
    <html amp="" lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href={`https://storie.jeedailynews.online/stories/${slug}/`} />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <meta name="description" content={excerpt} />

        <style amp-boilerplate="" dangerouslySetInnerHTML={{ __html: ampBoilerplate }} />
        <noscript>
          <style amp-boilerplate="" dangerouslySetInnerHTML={{ __html: ampNoScript }} />
        </noscript>

        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
        <script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
        
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;700&display=swap" rel="stylesheet" />

        <style amp-custom="" dangerouslySetInnerHTML={{ __html: ampCustomStyles }} />
      </head>
      <body>
        <amp-story
          standalone=""
          title={title!}
          publisher="Storie Weaver"
          publisher-logo-src="https://storie.jeedailynews.online/logo.svg"
          poster-portrait-src={coverImageUrl!}
        >
          {/* Cover Page */}
          <amp-story-page id="cover">
            <amp-story-grid-layer template="fill">
              <amp-img src={coverImageUrl!} width="1080" height="1920" layout="responsive" alt={title}></amp-img>
            </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical" className="bottom">
              <div className="slide-content">
                <h1 className="cover-text" style={{padding:0, textShadow:'none'}}>{title}</h1>
              </div>
            </amp-story-grid-layer>
          </amp-story-page>

          {/* Slides */}
          {slides?.map((slide, index) => (
            <amp-story-page id={`page-${index + 1}`} key={index}>
              <amp-story-grid-layer template="fill">
                <amp-img src={slide.imageUrl!} width="1080" height="1920" layout="responsive" alt={slide.image_alt}></amp-img>
              </amp-story-grid-layer>
              <amp-story-grid-layer template="vertical" className="bottom">
                <div className="slide-content">
                  <h2 className="slide-heading">{slide.heading}</h2>
                  <p className="slide-text">{slide.text}</p>
                </div>
              </amp-story-grid-layer>
            </amp-story-page>
          ))}
        </amp-story>
      </body>
    </html>
  );
}
