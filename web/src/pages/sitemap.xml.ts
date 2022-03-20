import * as React from 'react';
import { postsSitemapQuery } from '@lib/queries';
import { getClient } from '@lib/sanity.server';
import { formatDate } from '@utils/datetime-utils';

const generateSitemap = (posts) => {
  const urls = posts
    .map(
      (post) => `
        <url>
            <loc>${`https://chivongv.vercel.app/blog/${post.slug}`}</loc>
            <lastmod>${formatDate(post.updatedDate)}</lastmod>
            <priority>0.50</priority>
        </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://chivongv.vercel.app/</loc>
            <priority>1.00</priority>
        </url>
        <url>
            <loc>https://chivongv.vercel.app/blog/</loc>
            <priority>0.80</priority>
        </url>
        ${urls}
    </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const allPosts = await getClient(false).fetch(postsSitemapQuery);

    res.setHeader('Content-Type', 'text/xml');
    res.write(generateSitemap(allPosts));
    res.end();
  }
}

export default Sitemap;
