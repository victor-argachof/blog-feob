import { BaseService } from "./baseService";

/**
 * Interface que define a estrutura de um Post.
 */
export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  is_published: boolean;
  cover_image?: string;
  category_id: number;
  author_id: number;
  created_at: string;
  updated_at: string;
}

/**
 * Serviço específico para operações com posts.
 * 
 * Conceitos aplicados:
 * - Herança: Estende a classe BaseService para reutilizar operações comuns.
 */
export class PostService extends BaseService<Post> {
  constructor() {
    super("posts");
  }
}
