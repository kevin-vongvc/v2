export type NotePost = {
  slug: string;
  title: string;
  author: {
    name: string;
  };
  excerpt: string;
  publishedDate: Datetime;
  updatedDate: Datetime;
  coverImage: string;
  body: TypedObject | TypedObject[];
  tags: string[];
};
