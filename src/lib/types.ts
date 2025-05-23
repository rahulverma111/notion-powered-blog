export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  author?: {
    id: string;
    name: string;
    image: string | null;
  };
}

export type Author = {
  id: string;
  name: string;
  bio: string;
  email: string;
  posts: string[]; // array of post page IDs
  image: any;
  createdAt: string;
};
