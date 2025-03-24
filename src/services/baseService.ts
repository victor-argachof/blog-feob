import { db } from "@/lib/db";

/**
 * Classe que define operações comuns (CRUD) no banco de dados.
 * 
 * Conceitos aplicados:
 * - Abstração: Esconde os detalhes de acesso ao banco de dados.
 * - Encapsulamento: O acesso à tabela é feito por métodos públicos enquanto a propriedade 'table' é protegida.
 */
export abstract class BaseService<T> {
  protected table: string;

  constructor(table: string) {
    this.table = table;
  }

  async findById(id: number | string): Promise<T | null> {
    const [rows]: any = await db.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
    if (!rows.length) return null;
    return rows[0];
  }

  async findAll(orderBy?: string): Promise<T[]> {
    const orderClause = orderBy ? ` ORDER BY ${orderBy}` : "";
    const [rows]: any = await db.query(`SELECT * FROM ${this.table}${orderClause}`);
    return rows;
  }

  async create(data: any): Promise<any> {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data).map(() => "?").join(", ");
    const values = Object.values(data);
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`;
    const [result]: any = await db.query(query, values);
    return result;
  }

  async update(id: number | string, data: any): Promise<any> {
    const updates = Object.keys(data).map(key => `${key} = ?`).join(", ");
    const values = Object.values(data);
    values.push(id);
    const query = `UPDATE ${this.table} SET ${updates} WHERE id = ?`;
    await db.query(query, values);
  }

  async delete(id: number | string): Promise<any> {
    const query = `DELETE FROM ${this.table} WHERE id = ?`;
    await db.query(query, [id]);
  }
}
