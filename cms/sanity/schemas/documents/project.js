import { format } from 'date-fns';

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      description:
        'This field can be used to schedule projects when to show them.',
      type: 'datetime',
    },
    {
      name: 'updatedDate',
      title: 'Last updated date',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
    },
    {
      name: 'gif',
      title: 'GIF',
      type: 'gif',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'figure',
    },
    {
      name: 'source',
      title: 'Source link',
      type: 'string',
    },
    {
      name: 'demo',
      title: 'Demo link',
      type: 'string',
    },
    {
      name: 'body',
      type: 'richText',
      title: 'Body text',
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Project tags',
      of: [
        {
          type: 'string',
          name: 'tag',
          title: 'Project tag',
          validation: (Rule) =>
            Rule.required().min(1).error('Minimum 1 character is required'),
        },
      ],
    },
    {
      name: 'showOnFrontPage',
      title: 'Show on front page?',
      type: 'boolean',
    },
  ],
  initialValue: {
    showOnFrontPage: false,
    publishedDate: new Date().toISOString(),
  },
  orderings: [
    {
      name: 'publishedDateAsc',
      title: 'Published Date old–>new',
      by: [
        {
          field: 'publishedDate',
          direction: 'asc',
        },
        {
          field: 'title',
          direction: 'asc',
        },
      ],
    },
    {
      name: 'publishedDateDesc',
      title: 'Published Date new->old',
      by: [
        {
          field: 'publishedDate',
          direction: 'desc',
        },
        {
          field: 'title',
          direction: 'desc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedDate: 'publishedDate',
      slug: 'slug',
      media: 'coverImage',
    },
    prepare({
      title = 'No title',
      publishedDate = Date.now(),
      slug = {},
      media,
    }) {
      const dateSegment = format(new Date(publishedDate), 'yyyy/MM');
      const path = `/${dateSegment}/${slug.current}/`;
      return {
        title,
        media,
        subtitle: publishedDate ? path : 'Missing publishing date',
      };
    },
  },
};
