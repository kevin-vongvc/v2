const sharedFields = `
  _id,
  excerpt,
  publishedDate,
  updatedDate,
  title,
  'slug': slug.current,
  'coverImage': coverImage.asset->url,
  'author': author->{name, 'picture': picture.asset->url},
`;

const sharedProjectFields = `
  _id,
  demo,
  excerpt,
  source,
  tags,
  title,
`;

export const notesIndexQuery = `
  *[_type == "note"] | order(publishedDate desc, updatedDate desc) {
    ${sharedFields}
    tags,
  }
`;

export const noteQuery = `
{
  "note": *[_type == "note" && slug.current == $slug] | order(updatedDate desc)[0] {
    ${sharedFields}
    body,
  },
}`;

export const noteSlugsQuery = `
  *[_type == "note" && defined(slug.current)][].slug.current
`;

export const noteBySlugQuery = `
  *[_type == "note" && slug.current == $slug][0] {
    ${sharedFields}
  }
`;

export const postsIndexQuery = `
  *[_type == "post"] | order(publishedDate desc, updatedDate desc) {
    ${sharedFields}
    tags,
  }
`;

export const postsSitemapQuery = `
  *[_type == "post"] | order(publishedDate desc, updatedDate desc) {
    'slug': slug.current,
    publishedDate,
    updatedDate,
  }
`;

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(updatedDate desc)[0] {
    ${sharedFields}
    body,
  },
}`;

export const postSlugsQuery = `
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    ${sharedFields}
  }
`;

export const allWorksForHomeQuery = `
  *[_type == "project" && showOnFrontPage] | order(publishedDate desc){
    ${sharedProjectFields}
  }
`;

export const worksIndexQuery = `
  *[_type == "project"]| order(publishedDate desc){ 
    ${sharedProjectFields}
    showOnFrontPage,
    body,
    gif,
    coverImage
  }
`;
