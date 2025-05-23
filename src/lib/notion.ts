import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { remark } from "remark";
import html from "remark-html";
import type { Post } from "./types";
import { slugify } from "./utils";

export const notion = new Client({
  // auth: process.env.NOTION_API_KEY,
  auth: "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",
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPosts({
  pageSize = 10,
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
    const filter: any = {
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
    // const databaseId = process.env.NOTION_DATABASE_ID!;
    const databaseId = "1fcb7daf5ec38045afddd3f0a6421f3f";
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
          direction: "descending",
        },
      ],
      page_size: pageSize,
      start_cursor:
        page > 1 ? response.results[(page - 1) * pageSize - 1]?.id : undefined,
    });

    console.log("paginatedResponse====>", paginatedResponse);

    const posts = await Promise.all(
      paginatedResponse.results.map(async (page) => {
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
    // First get the page details
    const page = await notion.pages.retrieve({ page_id: id });

    // Then get all blocks for this page
    const blocks = await notion.blocks.children.list({ block_id: id });

    // Convert blocks to markdown
    const mdBlocks = await n2m.blocksToMarkdown(blocks.results);
    const mdString = n2m.toMarkdownString(mdBlocks);
    console.log("mdString==>", mdString);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(mdString.parent);

    console.log("HEY_THERE==>", processedContent);

    // Transform the page data
    const post = await pageToPostTransformer(page, true);
    post.content = processedContent.toString();

    return post;
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
}

async function pageToPostTransformer(
  page: any,
  includeContent = false
): Promise<Post> {
  // Get page properties
  const { properties } = page;

  // Extract basic post data
  const title = properties.Title?.title[0]?.plain_text || "Untitled";
  const date = properties.Date?.date?.start || new Date().toISOString();
  const excerpt = properties.Excerpt?.rich_text[0]?.plain_text || "";
  const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];
  const slug = properties.Slug?.rich_text[0]?.plain_text || slugify(title);

  // Get cover image if available
  let coverImage = null;
  if (page.cover) {
    if (page.cover.type === "external") {
      coverImage = page.cover.external.url;
    } else if (page.cover.type === "file") {
      coverImage = page.cover.file.url;
    }
  }

  // Create post object
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

  // If full content is requested, fetch and convert it
  if (includeContent) {
    try {
      // Get page blocks and convert to markdown
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const mdString = n2m.toMarkdownString(mdBlocks);

      // Convert markdown to HTML
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
