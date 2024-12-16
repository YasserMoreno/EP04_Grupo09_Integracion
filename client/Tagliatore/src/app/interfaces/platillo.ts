import { Categoria } from "./categoria";

export interface Platillo {
    id?: string; 
    nombre: string;
    ingredientes: string[];
    precio: number;
    imagenes: string[]; 
    categoriaId: Categoria; 
    createdAt?: string;
    updatedAt?: string;
}