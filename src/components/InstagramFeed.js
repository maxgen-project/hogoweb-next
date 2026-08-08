import InstagramView from "./InstagramView";

async function getInstagramPosts() {
  const res = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&limit=8`,
    { next: { revalidate: 3600 } } // har 1 ghante me naye posts check karega
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export default async function InstagramFeed() {
  const posts = await getInstagramPosts();
  return <InstagramView posts={posts} />;
}