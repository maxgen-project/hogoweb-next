import SingleBlog from "../../../src/views/SingleBlog";
import { BASE } from "../../../src/service/api";

/**
 * generateMetadata for SEO on /blog/[slug]
 * Maps:
 * - meta_title -> title
 * - meta_descrtiption -> description (exact backend field name with typo)
 * - meta_keyword -> keywords
 * - slug -> canonical URL
 * - featured_image -> openGraph image with fallback
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(`${BASE}/blog-data/`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const isSuccess = data.status === "success" || data.success === true;

    if (isSuccess && Array.isArray(data.data)) {
      const blog = data.data.find(
        (item) =>
          item.slug === slug ||
          String(item.slug).replace(/^\/|\/$/g, "") === String(slug).replace(/^\/|\/$/g, "") ||
          String(item.id) === String(slug)
      );

      if (blog) {
        const title = blog.meta_title || blog.title || "Blog Post | HOGONN India";
        // NOTE: meta_descrtiption is the exact backend key name (missing the 'i')
        const description =
          blog.meta_descrtiption || blog.short_description || blog.title || "";
        const keywords = blog.meta_keyword || undefined;

        const rawImg = blog.featured_image || blog.image;
        const imageUrl = rawImg
          ? rawImg.startsWith("http")
            ? rawImg
            : `${BASE}${rawImg.startsWith("/") ? "" : "/"}${rawImg}`
          : "https://www.hogonnindia.com/images/blogBanner.jpg";

        const cleanSlug = blog.slug
          ? String(blog.slug).replace(/^\/|\/$/g, "")
          : slug;
        const canonical = `https://www.hogonnindia.com/blog/${cleanSlug}/`;

        return {
          title,
          description,
          keywords,
          alternates: {
            canonical,
          },
          openGraph: {
            title,
            description,
            url: canonical,
            siteName: "HOGONN India",
            type: "article",
            images: [
              {
                url: imageUrl,
                alt: title,
              },
            ],
          },
        };
      }
    }
  } catch (error) {
    console.error("Error generating metadata for blog post:", error);
  }

  return {
    title: "Blog Article | HOGONN India",
    description: "Read the latest car care and paint protection articles from HOGONN India.",
  };
}

export default async function BlogSlugPage({ params }) {
  const { slug } = await params;
  return <SingleBlog id={slug} />;
}
