import { Cliente } from "./cliente";
import { Mesa } from "./mesa";
import { Mesero } from "./mesero";
import { Platillo } from "./platillo";

export interface Orden {
    _id: string; 
    mesaId: Mesa ; 
    clienteId: Cliente; 
    meseroId: Mesero; 
  
    platillos: {
      platilloId: Platillo; 
      cantidad: number; 
    }[];
  
    estado?: 'pendiente' | 'entregado' | 'cancelado'; 
    createdAt?: Date; 
    updatedAt?: Date;
  }
  