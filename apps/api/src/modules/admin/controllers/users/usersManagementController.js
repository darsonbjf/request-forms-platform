import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../../../shared/prisma/client.js';

// Criação de Usuários
const addUser = async (req, res) => {
  const { username, password, cpf, nome, nivelPermissao } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const newUser =  await prisma.usuario.create({
      data: {
        username,
        passwordHash, 
        cpf,
        nome,
        nivelPermissao: nivelPermissao || "user",
      },
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
   } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  };

// Atualizar status do usuário
const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedUser = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json({ message: 'Status atualizado com sucesso', usuario: updatedUser });
  } catch (err) {
    console.error('Erro ao atualizar status do usuário', err);
    res.status(500).json({ error: 'Erro ao atualizar status', details: err.message });
  }
};

// Alterar permissão de usuários
const changeUserPermission = async (req, res) => {
  const { id } = req.params; 
  const { nivelPermissao } = req.body; 

  if (!['administrador', 'moderador'].includes(nivelPermissao)) {
      return res.status(400).json({ error: 'Nível de permissão inválido' });
  }

  try {

      const user = await prisma.usuario.findUnique({
          where: { id: parseInt(id) },
      });

      if (!user) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
      }


      if (req.usuario.nivelPermissao !== 'administrador') {
          return res.status(403).json({ error: 'Permissão insuficiente para alterar o nível de permissão de outro usuário' });
      }


      const updatedUser = await prisma.usuario.update({
          where: { id: parseInt(id) },
          data: {
              nivelPermissao, 
          },
      });

      return res.status(200).json({ message: 'Nível de permissão atualizado com sucesso', user: updatedUser });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o nível de permissão', details: error.message });
  }
};

export { addUser, updateUserStatus, changeUserPermission };