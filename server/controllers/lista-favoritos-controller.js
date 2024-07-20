const { Op } = require('sequelize');
const ListaFavoritos = require('../models/ListaFavoritos');
const ItemLista = require('../models/ItemLista');
const Produto = require('../models/Produto');

exports.criarListaFavoritos = async (req, res) => {
  const { nome_lista, privado } = req.body;
  const id_usuario = req.user.id_usuario; // Supondo que o middleware de autenticação adicione o ID do usuário ao req.user

  try {
    const novaLista = await ListaFavoritos.create({ id_usuario, nome_lista, privado });
    res.status(201).json(novaLista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar lista de favoritos.' });
  }
};

exports.adicionarProdutoLista = async (req, res) => {
  const { id_lista_favoritos, id_produto } = req.body;

  try {
    const novoItem = await ItemLista.create({ id_lista_favoritos, id_produto });
    res.status(201).json(novoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar produto à lista de favoritos.' });
  }
};

exports.removerProdutoLista = async (req, res) => {
  const { id_lista_favoritos, id_produto } = req.body;

  try {
    const item = await ItemLista.findOne({ where: { id_lista_favoritos, id_produto } });
    if (!item) {
      return res.status(404).json({ message: 'Produto não encontrado na lista de favoritos.' });
    }
    await item.destroy();
    res.status(200).json({ message: 'Produto removido da lista de favoritos com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover produto da lista de favoritos.' });
  }
};


exports.obterListasFavoritos = async (req, res) => {
  const id_usuario = req.user.id_usuario;

  try {
    const listas = await ListaFavoritos.findAll({ where: { id_usuario } });

    const listasComPrimeiroProduto = await Promise.all(
      listas.map(async (lista) => {
        const itens = await ItemLista.findAll({ where: { id_lista_favoritos: lista.id_lista_favoritos }, include: Produto });
        let primeiro_produto = null;
        if (itens.length > 0) {
          primeiro_produto = itens[0].Produto;
        }
        return { ...lista.toJSON(), primeiro_produto };
      })
    );

    res.status(200).json(listasComPrimeiroProduto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter listas de favoritos.' });
  }
};

exports.obterListaFavoritos = async (req, res) => {
  const { id_lista_favoritos } = req.params;
  const id_usuario = req.user.id_usuario;

  try {
    console.log(id_lista_favoritos)

    const lista = await ListaFavoritos.findOne({ where: { id_lista_favoritos, id_usuario } });
    if (!lista) {
      return res.status(404).json({ message: 'Lista não encontrada.' });
    }
    const itens = await ItemLista.findAll({ where: { id_lista_favoritos: id_lista_favoritos }, include: Produto });
    res.status(200).json({ lista, itens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter a lista de favoritos.' });
  }
};

exports.editarListaFavoritos = async (req, res) => {
  const { id_lista_favoritos } = req.params;
  const { nome_lista, privado } = req.body;
  const id_usuario = req.user.id_usuario;

  try {
    const lista = await ListaFavoritos.findOne({ where: { id_lista_favoritos, id_usuario } });
    if (!lista) {
      return res.status(404).json({ message: 'Lista não encontrada.' });
    }
    lista.nome_lista = nome_lista;
    lista.privado = privado;
    await lista.save();
    res.status(200).json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao editar a lista de favoritos.' });
  }
};

exports.excluirListaFavoritos = async (req, res) => {
  const { id_lista_favoritos } = req.params;
  const id_usuario = req.user.id_usuario;

  try {
    const lista = await ListaFavoritos.findOne({ where: { id_lista_favoritos, id_usuario } });
    if (!lista) {
      return res.status(404).json({ message: 'Lista não encontrada.' });
    }
    await ItemLista.destroy({ where: { id_lista_favoritos: id_lista_favoritos } });

    await lista.destroy();
    res.status(200).json({ message: 'Lista excluída com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir a lista de favoritos.' });
  }
};

exports.obterListasPublicasDeUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const listas = await ListaFavoritos.findAll({
      where: {
        id_usuario: id_usuario,
        privado: false
      },
      attributes: ['id_lista_favoritos', 'nome_lista', 'privado'],
    });

    res.status(200).json(listas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter as listas públicas do usuário.' });
  }
};

exports.obterListaPublicaEspecifica = async (req, res) => {
  const { id_usuario, id_lista_favoritos } = req.params;

  try {
    const lista = await ListaFavoritos.findOne({
      where: {
        id_lista_favoritos: id_lista_favoritos,
        id_usuario: id_usuario,
        privado: false
      },
      attributes: ['id_lista_favoritos', 'nome_lista', 'privado'],
      include: [
        {
          model: ItemLista,
          attributes: ['id_item_lista', 'id_produto'],
          include: [
            {
              model: Produto,
              attributes: ['id_produto', 'nome', 'ingredientes', 'descricao', 'marca', 'imagem'],
            },
          ],
        },
      ],
    });

    if (!lista) {
      return res.status(404).json({ message: 'Lista não encontrada.' });
    }

    res.status(200).json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter a lista do usuário.' });
  }
};

