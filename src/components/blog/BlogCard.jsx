import Link from "next/link";

export default function BlogCard({ post, index, visible }) {
  return (
    <Link
      href={`/media/${post.slug}/`}
      className={`group block overflow-hidden bg-[#151515] transition-all duration-700
      ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full border border-red-500 bg-black/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-red-500">
          {post.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-red-500 md:text-xl">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/60 line-clamp-2">
          {post.excerpt}
        </p>
        <time
          dateTime={post.date}
          className="mt-4 block text-xs uppercase tracking-wider text-white/40"
        >
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>
    </Link>
  );
}