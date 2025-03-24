import { Button } from '@/components/Button';
import Link from 'next/link';

interface BlogCategoriesProps {
  categories: { name: string; slug: string }[];
  title?: string;
}

export default function BlogCategories({
  categories,
  title = 'Categorias',
}: BlogCategoriesProps) {
  return (
    <section className="pb-12">
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
      {categories && categories.length > 0 ? (
        <ul className="flex flex-wrap gap-4 mx-4">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${encodeURIComponent(category.slug)}`}
                className="inline-block"
              >
                <Button variant="secondary" className="px-8 py-4">
                  {category.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex items-center justify-center mx-4 py-4 text-gray-500 dark:text-gray-400">
          Nenhuma categoria encontrada.
        </p>
      )}
    </section>
  );
}
