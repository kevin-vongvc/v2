export default {
  name: 'gif',
  type: 'object',
  title: 'GIF',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'mp4',
      title: 'Source mp4',
      type: 'file',
    },
    {
      name: 'webm',
      title: 'Source webm',
      type: 'file',
    },
    {
      name: 'ogg',
      title: 'Source ogg',
      type: 'file',
    },
    {
      name: 'caption',
      title: 'Caption text',
      type: 'string',
    },
  ],
};
