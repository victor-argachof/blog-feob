import { db } from "@/lib/db";
import { BaseService } from "./baseService";

/**
 * Interface que define a estrutura de uma Categoria.
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
}

/**
 * Serviço específico para operações com categorias.
 * 
 * Conceitos aplicados:
 * - Herança: Estende a classe BaseService.
 * - Polimorfismo: Sobrescreve o método 'delete' para incluir a verificação de posts vinculados.
 */
export class CategoryService extends BaseService<Category> {
  constructor() {
    super("categories");
  }

  async delete(id: number | string): Promise<any> {
    // Verifica se há posts vinculados à categoria antes de deletar
    const [rows]: any = await db.query("SELECT COUNT(*) as count FROM posts WHERE category_id = ?", [id]);
    if (rows[0].count > 0) {
      throw new Error("Não é possível excluir essa categoria, pois ela possui posts vinculados.");
    }
    return super.delete(id);
  }
}
