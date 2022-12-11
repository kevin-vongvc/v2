import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './schemas';

const previewSecret = import.meta.env.SANITY_STUDIO_PREVIEW_SECRET;
const projectUrl = import.meta.env.SANITY_STUDIO_NODE_ENV === 'production'
  ? 'https://chivongv.vercel.app'
  : 'http://localhost:3000';

export default defineConfig({
  name: 'default',
  title: 'portfolio-sanity',
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  schema: {
    types: schemaTypes,
  },
  document: {
    // prev is the result from previous plugins and can be composed
    productionUrl: async (prev, context) => {
      // context includes the client an other details
      const { client, dataset, document } = context;
      const documentTypes = ["post", "project", "note"];

      if (documentTypes.includes(document._type)) {
        return `${projectUrl}/api/preview?secret=${previewSecret}&type=${document._type}&slug=${document.slug.current}`;
      }

      return prev;
    },
  },
  plugins: [deskTool(), visionTool(), codeInput()],
});
