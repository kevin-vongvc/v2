type shared = {
  title: string;
  tags: string[];
  demo: string;
  source: string;
};

export type FrontProjectType = shared & {
  _id: string;
  excerpt: string;
};

export type ProjectType = shared & {
  slug: string;
  author: {
    name: string;
  };
  publishedDate: Datetime;
  updatedDate: Datetime;
  coverImage: string;
  body: TypedObject | TypedObject[];
  gif: {
    mp4: File;
    webm: File;
    ogg: File;
    caption: string;
  };
};
