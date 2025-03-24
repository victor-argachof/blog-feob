import { RowDataPacket } from 'mysql2';
import { remark } from 'remark';
import html from 'remark-html';
import removeMd from 'remove-markdown';
import { db } from './db';

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
};

interface PostRow extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  content: string;
  is_published: number;
  date: string;
  coverImage: string;
  author: string;
  category: string;
}

interface CategoryRow extends RowDataPacket {
  name: string;
  slug: string;
}

/**
 * Retorna todos os posts publicados do banco de dados.
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const [rows] = await db.query<PostRow[]>(`
      SELECT 
        p.id,
        p.title,
        p.slug,
        p.content,
        p.is_published,
        p.created_at AS date,
        p.cover_image AS coverImage,
        u.name AS author,
        c.name AS category
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.is_published = 0
      ORDER BY p.created_at DESC
    `);

    return rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      // Remove a formatação markdown e limita a 150 caracteres
      description: removeMd(row.content.substring(0, 150)) + '...',
      date: row.date,
      author: row.author || 'Desconhecido',
      category: row.category || 'Sem categoria',
      tags: [],
      coverImage: row.coverImage,
    }));
  } catch (error) {
    console.error("Erro ao buscar posts do banco de dados:", error);
    return [];
  }
}

/**
 * Retorna os dados de um post pelo slug, convertendo o conteúdo Markdown para HTML.
 */
export async function getPostBySlug(slug: string) {
  try {
    const [rows] = await db.query<PostRow[]>(`
      SELECT 
        p.id,
        p.title,
        p.slug,
        p.content,
        p.is_published,
        p.created_at AS date,
        p.cover_image AS coverImage,
        u.name AS author,
        c.name AS category
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.slug = ? AND p.is_published = 0
    `, [slug]);

    if (!rows || rows.length === 0) {
      throw new Error(`Post não encontrado para o slug: ${slug}`);
    }

    const post = rows[0];

    const processedContent = await remark().use(html).process(post.content);
    const contentHtml = processedContent.toString();

    return {
      slug: post.slug,
      meta: {
        title: post.title,
        // Remove markdown para a descrição
        description: removeMd(post.content.substring(0, 150)) + '...',
        date: post.date,
        author: post.author || 'Desconhecido',
        category: post.category || 'Sem categoria',
        tags: [],
        coverImage: post.coverImage,
      },
      contentHtml,
    };
  } catch (error) {
    console.error(`Erro ao buscar post ${slug}:`, error);
    throw error;
  }
}

/**
 * Retorna os posts de uma determinada categoria, filtrando pelo slug da categoria.
 */
export async function getPostsByCategory(categorySlug: string): Promise<PostMeta[]> {
  try {
    const [rows] = await db.query<PostRow[]>(`
      SELECT 
        p.id,
        p.title,
        p.slug,
        p.content,
        p.is_published,
        p.created_at AS date,
        p.cover_image AS coverImage,
        u.name AS author,
        c.name AS category
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE c.slug = ? AND p.is_published = 0
      ORDER BY p.created_at DESC
    `, [categorySlug]);

    return rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      // Remove markdown para a descrição
      description: removeMd(row.content.substring(0, 150)) + '...',
      date: row.date,
      author: row.author || 'Desconhecido',
      category: row.category || 'Sem categoria',
      tags: [],
      coverImage: row.coverImage,
    }));
  } catch (error) {
    console.error(`Erro ao buscar posts da categoria ${categorySlug}:`, error);
    return [];
  }
}

/**
 * Retorna as categorias únicas presentes na tabela "categories" com nome e slug.
 */
export async function getUniqueCategories(): Promise<{ name: string; slug: string }[]> {
  try {
    const [rows] = await db.query<CategoryRow[]>(`
      SELECT DISTINCT name, slug FROM categories ORDER BY name ASC
    `);
    return rows.map((row) => ({
      name: row.name,
      slug: row.slug,
    }));
  } catch (error) {
    console.error("Erro ao buscar categorias únicas:", error);
    return [];
  }
}

export const getAllCategories = getUniqueCategories;
