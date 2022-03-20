import { formatDate } from '@utils/datetime-utils';

const generateRssItem = (post): string => `<item>
    <guid>https://chivongv.vercel.app/blog/${post.slug}</guid>
    <title>${post.title}</title>
    <link>https://chivongv.vercel.app/blog/${post.slug}</link>
    <description>${post.excerpt}</description>
    <pubDate>${formatDate(post.publishedDate)}</pubDate>
  </item>`;

const generateRss = (posts): string => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Blog - Chi Vong</title>
      <link>https://chivongv.vercel.app/blog</link>
      <description>Chi Vong's home page and blog. Open source projects, development blog posts and my journey as a Software Engineer.</description>
      <language>en</language>
      <lastBuildDate>${
        posts.length > 0 ? formatDate(posts[0].publishedDate) : ''
      }</lastBuildDate>
      <atom:link href="https://chivongv.vercel.app/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`;

export default generateRss;
