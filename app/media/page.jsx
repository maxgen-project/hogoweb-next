import BlogListView from "../../src/components/blog/BlogListView";

export const metadata = {
  title: "Car Care & Paint Protection Blog | HOGONN India",
  description:
    "Guides on protecting your car's paint from stone chips, scratches, bird droppings and UV damage - from HOGONN, a paint protection film manufacturer in India.",
  alternates: { canonical: "https://www.hogonnindia.com/blog/" },
};

export default function BlogPage() {
  return <BlogListView />;
}