import { Button } from '@/components/Button';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { IconBrandFacebook, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    return {
      title: `Clinario | Blog | ${post.meta.title}`,
      description: post.meta.description,
      openGraph: {
        title: post.meta.title,
        description: post.meta.description,
        images: post.meta.coverImage ? [post.meta.coverImage] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Clinario | Blog | Post não encontrado',
      description: 'O post solicitado não foi encontrado.',
    };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    if (!posts || posts.length === 0) {
      return [{ slug: 'sem-conteudo' }];
    }
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error('Erro ao gerar parâmetros estáticos:', error);
    return [{ slug: 'sem-conteudo' }];
  }
}

export const dynamicParams = false;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params; // Aguarda params antes de acessar o slug
    const post = await getPostBySlug(slug);

    // URL completa do post para compartilhamento
    const postUrl = `https://blog.clinario.com/blog/${post.slug}`;

    // Função para verificar se a data é válida
    const isValidDate = (dateString: string) => {
      const date = new Date(dateString);
      return !isNaN(date.getTime());
    };

    return (
      <article className="mx-auto my-10 max-w-2xl text-left">
        {/* Detalhes do post */}
        <div className="space-y-4">
          <div className="text-sm uppercase text-gray-600 dark:text-gray-300">
            <span>{post.meta.author}</span>
            {post.meta.date && isValidDate(post.meta.date) && (
              <>
                <span className="mx-2">|</span>
                <span>
                  {new Date(post.meta.date).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </>
            )}
          </div>
          <h1 className="text-4xl font-bold">{post.meta.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {post.meta.description}
          </p>
        </div>

        {/* Imagem de capa */}
        {post.meta.coverImage && (
          <div className="my-6 h-72 rounded-2xl overflow-hidden">
            <img
              src={post.meta.coverImage}
              alt={post.meta.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Conteúdo do post renderizado como HTML */}
        <div
          className="prose dark:prose-invert text-left mb-6 mt-12"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Linha divisória */}
        <div className="py-12">
          <hr className="border-gray-200 dark:border-gray-700" />
        </div>

        {/* Seção de Compartilhar */}
        <section className="pb-8">
          <h2 className="text-2xl font-bold mb-8">Compartilhar post</h2>
          <div className="flex gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="light" className="flex items-center gap-2 px-4 py-2 h-10">
                <IconBrandFacebook size={20} />
                <span>Facebook</span>
              </Button>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                postUrl
              )}&text=${encodeURIComponent(post.meta.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="light" className="flex items-center gap-2 px-4 py-2 h-10">
                <IconBrandTwitter size={20} />
                <span>Twitter</span>
              </Button>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="light" className="flex items-center gap-2 px-4 py-2 h-10">
                <IconBrandLinkedin size={20} />
                <span>LinkedIn</span>
              </Button>
            </a>
          </div>
        </section>
      </article>
    );
  } catch (error) {
    console.error('Erro ao carregar o post:', error);
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
        <p className="mb-6">O post solicitado não está disponível.</p>
        <Link href="/blog">
          <Button variant="light">Voltar para o blog</Button>
        </Link>
      </div>
    );
  }
}
