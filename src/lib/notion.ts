import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { remark } from "remark";
import html from "remark-html";
import type { Post } from "./types";
import { slugify } from "./utils";
import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { isFullPage, type PageObjectResponse } from "@notionhq/client";
import NotionPageToHtml from "notion-page-to-html";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPosts({
  pageSize = 25,
  page = 1,
  tag = null,
}: {
  pageSize?: number;
  page?: number;
  tag?: string | null;
}) {
  try {
    // Build filter conditions
    // const filter: any = {
    //   and: [
    //     {
    //       property: "Status",
    //       checkbox: {
    //         equals: true,
    //       },
    //     },
    //   ],
    // }

    const filter: QueryDatabaseParameters["filter"] = {
      and: [],
    };

    // Add tag filter if provided
    if (tag) {
      filter.and.push({
        property: "Tags",
        multi_select: {
          contains: tag,
        },
      });
    }

    // Get total count first
    const databaseId = process.env.NOTION_POSTS_DB_ID!;
    const response = await notion.databases.query({
      database_id: databaseId,
      // filter,
      page_size: pageSize, // Max to get a good count
    });

    // console.log("response==>", response);

    const total = response.results.length;

    // Now get the paginated results

    const allPagesResponse = [];
    let start_cursor: string | undefined = undefined;

    while (total) {
      const paginatedResponse = await notion.databases.query({
        database_id: databaseId,
        // filter,
        sorts: [
          {
            property: "Created time",
            direction: "ascending",
          },
        ],
        page_size: pageSize,
        start_cursor: start_cursor,
      });

      allPagesResponse.push(paginatedResponse?.results);
      if (!paginatedResponse?.next_cursor) {
        break;
      } else {
        start_cursor = paginatedResponse.next_cursor;
      }
    }
    const allAuthors = await getAuthors({ pageSize: 100 });
    const posts = await Promise.all(
      allPagesResponse
        .flat()
        .filter(isFullPage) // Flatten and filter full Page objects
        .map(async (page: PageObjectResponse) => {
          console.log("page==>", page);
          return await pageToPostTransformer(page, false, allAuthors.authors);
        })
    );

    // console.log("posts==>", posts);

    return {
      posts,
      total,
    };
  } catch (error) {
    console.error("Error fetching posts from Notion:", error);
    return {
      posts: [],
      total: 0,
    };
  }
}

export async function getPostDetails(id: string) {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    if (page?.object === "page" && "properties" in page) {
      const { html: contentHtml } = await NotionPageToHtml.convert(
        `https://www.notion.so/${id.replace(/-/g, "")}`,
        {
          excludeCSS: false,
          excludeMetadata: true,
          excludeScripts: false,
          excludeHeaderFromBody: true,
          excludeTitleFromHead: true,
        }
      );

      // Get all authors to find the post's author
      const { authors } = await getAuthors({ pageSize: 100 });

      const post = await pageToPostTransformer(page, false, authors);
      post.content = contentHtml;

      return post;
    }
  } catch (error) {
    console.error("Error fetching post details:", error);
  }
}

export async function getAuthors({
  pageSize = 25,
  page = 1,
}: {
  pageSize?: number;
  page?: number;
}) {
  try {
    const databaseId = process.env.NOTION_AUTHORS_DB_ID!;
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100,
    });
    const total = response.results.length;
    const allPagesResponse = [];
    let start_cursor: string | undefined = undefined;
    while (total) {
      const paginatedResponse = await notion.databases.query({
        database_id: databaseId,
        // filter,
        sorts: [
          {
            property: "Created time",
            direction: "ascending",
          },
        ],
        page_size: pageSize,
        start_cursor: start_cursor,
      });

      allPagesResponse.push(paginatedResponse?.results);
      if (!paginatedResponse?.next_cursor) {
        break;
      } else {
        start_cursor = paginatedResponse.next_cursor;
      }
    }

    const authors = await Promise.all(
      allPagesResponse
        .flat()
        .filter(isFullPage)
        .map(async (page: PageObjectResponse) => {
          return await pageToAuthorTransformer(page);
        })
    );

    return {
      authors,
      total,
    };
  } catch (e) {
    console.error("Error fetching authors from Notion:", e);
    return {
      authors: [],
      total: 0,
    };
  }
}

async function pageToPostTransformer(
  page: PageObjectResponse,
  includeContent = false,
  allAuthors?: { id: string; name: string; image: string | null }[]
): Promise<Post> {
  const { properties } = page;

  const title =
    properties.Title?.type === "title"
      ? properties.Title.title[0]?.plain_text || "Untitled"
      : "Untitled";

  const date =
    properties.Date?.type === "date"
      ? properties.Date.date?.start || new Date().toISOString()
      : new Date().toISOString();

  const excerpt =
    properties.Excerpt?.type === "rich_text"
      ? properties.Excerpt.rich_text[0]?.plain_text || ""
      : "";

  const tags =
    properties.Tags?.type === "multi_select"
      ? properties.Tags.multi_select.map((tag) => tag.name)
      : [];

  const slug =
    properties.Slug?.type === "rich_text"
      ? properties.Slug.rich_text[0]?.plain_text || slugify(title)
      : slugify(title);

  // Get author information from relation
  let author;
  if (
    properties.Author?.type === "relation" &&
    properties.Author.relation.length > 0 &&
    allAuthors
  ) {
    const authorId = properties.Author.relation[0].id;
    const authorInfo = allAuthors.find((a) => a.id === authorId);
    console.log("authorInfo==>", authorInfo);
    if (authorInfo) {
      author = {
        id: authorInfo.id,
        name: authorInfo.name,
        image: authorInfo.image,
      };
    }
  }

  // Get cover image from properties
  let coverImage: string | null = null;
  if (properties.Cover?.type === "files" && properties.Cover.files.length > 0) {
    const file = properties.Cover.files[0];
    if (file.type === "file") {
      coverImage = file.file.url;
    }
  }

  const post: Post = {
    id: page.id,
    title,
    date,
    excerpt,
    tags,
    slug,
    coverImage,
    content: "",
    author,
  };

  if (includeContent) {
    try {
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const mdString = n2m.toMarkdownString(mdBlocks);

      const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(mdString.parent);

      post.content = processedContent.toString();
    } catch (error) {
      console.error("Error converting Notion content to HTML:", error);
      post.content = "<p>Error loading content</p>";
    }
  }

  return post;
}

type Author = {
  id: string;
  name: string;
  bio: string;
  email: string;
  posts: string[]; // array of post page IDs
  image: string | null;
  createdAt: string;
};

async function pageToAuthorTransformer(
  page: PageObjectResponse
): Promise<Author> {
  const { properties, created_time } = page;

  const name =
    properties.Name?.type === "title"
      ? properties.Name.title[0]?.plain_text || "Unnamed"
      : "Unnamed";

  const bio =
    properties.Bio?.type === "rich_text"
      ? properties.Bio.rich_text[0]?.plain_text || ""
      : "";

  const email =
    properties.Email?.type === "email" ? properties.Email.email || "" : "";

  const posts =
    properties.Posts?.type === "relation"
      ? properties.Posts.relation.map((rel) => rel.id)
      : [];

  let image: string | null = null;
  if (properties.Image?.type === "files" && properties.Image.files.length > 0) {
    const file = properties.Image.files[0];

    if (file.type === "external") {
      image = file.external.url;
    } else if (file.type === "file") {
      image = file.file.url;
    }
  }

  const author = {
    id: page.id,
    name,
    bio,
    email,
    posts,
    image,
    createdAt: created_time,
  };

  return author;
}
