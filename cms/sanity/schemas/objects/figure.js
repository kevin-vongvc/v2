export default {
  name: 'figure',
  type: 'image',
  title: 'Figure',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Important for SEO and accessiblity.',
    },
    {
      name: 'caption',
      title: 'Caption text',
      type: 'string',
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption',
      alt: 'alt',
    },
  },
};
