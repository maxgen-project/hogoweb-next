"use client";

import SingleBlog from "../../../src/views/SingleBlog";

export default function SingleBlogPage({ params }) {
  return <SingleBlog id={params.id} />;
}
