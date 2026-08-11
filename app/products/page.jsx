import { getAllCategories } from "../../src/service/productCategoryService";
import ProductsHubView from "../../src/views/ProductsHubView";

export const metadata = {
  title: "Products — HOGONN India | Paint Protection Film & Window Film",
  description:
    "Explore HOGONN India's range of protective films: Paint Protection Film (PPF), Safety Glaze window film, Windshield PPF and Sunroof PPF. Made in India.",
  alternates: {
    canonical: "https://www.hogonnindia.com/products/",
  },
};

export default async function ProductsHubPage() {
  const categories = await getAllCategories();
  return <ProductsHubView categories={categories} />;
}
