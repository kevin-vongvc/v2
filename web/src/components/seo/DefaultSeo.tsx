import React from 'react';
import { DefaultSeo as NextDefaultSeo, ArticleJsonLd } from 'next-seo';
import siteConfig from '@src/siteSettings';

type Props = {
  title?: string;
};

const DefaultSeo = (props: Props) => (
  <React.Fragment>
    <NextDefaultSeo
      title={props.title || siteConfig.title}
      description={siteConfig.description}
      canonical={siteConfig.url}
      openGraph={{
        type: 'website',
        locale: 'en_IE',
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        images: [
          {
            url: siteConfig.image,
            alt: siteConfig.title,
            width: 1280,
            height: 720,
          },
        ],
      }}
      twitter={{
        handle: siteConfig.twitter,
        site: siteConfig.twitter,
        cardType: 'summary_large_image',
      }}
    />
    <ArticleJsonLd
      type="Blog"
      url={siteConfig.url}
      title={siteConfig.title}
      datePublished={new Date().toISOString()}
      dateModified={new Date().toISOString()}
      authorName={siteConfig.author}
      description={siteConfig.description}
      images={[siteConfig.image]}
    />
  </React.Fragment>
);

export { DefaultSeo };
