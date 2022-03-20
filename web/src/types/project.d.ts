export type FrontProjectType = {
  _id: string;
  demo: string;
  excerpt: string;
  source: string;
  tags: string[];
  title: string;
};

export type ProjectType = {
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
  gif: {
    mp4: File;
    webm: File;
    ogg: File;
    caption: string;
  };
};
