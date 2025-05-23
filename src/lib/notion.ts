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
    console.log("databaseId==>", databaseId);
    const response = await notion.databases.query({
      database_id: databaseId,
      // filter,
      page_size: 100, // Max to get a good count
    });

    console.log("response==>", response);

    const total = response.results.length;

    // Now get the paginated results
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
      start_cursor:
        page > 1 ? response.results[(page - 1) * pageSize - 1]?.id : undefined,
    });

    console.log("paginatedResponse====>", paginatedResponse);

    const posts = await Promise.all(
      paginatedResponse.results
        .filter(isFullPage) // Only pass full Page objects
        .map(async (page: PageObjectResponse) => {
          return await pageToPostTransformer(page);
        })
    );

    console.log("posts==>", posts);

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
          excludeCSS: false, // include CSS (default)
          excludeMetadata: true, // optionally exclude extra <meta> tags
          excludeScripts: false, // optionally exclude scripts
          excludeHeaderFromBody: true, // removes title/cover/icon from body
          excludeTitleFromHead: true, // prevents <title> in head
        }
      );

      const post = await pageToPostTransformer(page, false); // false because we’re handling content manually
      post.content = contentHtml;

      return post;
    }
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
}

async function pageToPostTransformer(
  page: PageObjectResponse,
  includeContent = false
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

  let coverImage: string | null = null;
  if (page.cover) {
    if (page.cover.type === "external") {
      coverImage = page.cover.external.url;
    } else if (page.cover.type === "file") {
      coverImage = page.cover.file.url;
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
