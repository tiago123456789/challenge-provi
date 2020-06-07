import Knex from "knex";

export async function seed(knex: Knex) {
    return knex.table("itens").insert([
        { name: "Batérias", path_image: 'baterias.svg' },
        { name: "Eletrônicos", path_image: 'eletronicos.svg' },
        { name: "Lâmpadas", path_image: 'lampadas.svg' },
        { name: "Oléo", path_image: 'oleo.svg' },
        { name: "Orgânicos", path_image: 'organicos.svg' },
        { name: "Papéis e Papelão", path_image: 'papeis-papelao.svg' }
    ])
  };