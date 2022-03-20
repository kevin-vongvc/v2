const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;
const projectUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://chivongv.vercel.app'
    : 'http://localhost:3000';

export default function resolveProductionUrl(document) {
  return `${projectUrl}/api/preview?secret=${previewSecret}&type=${document._type}&slug=${document.slug.current}`;
}
