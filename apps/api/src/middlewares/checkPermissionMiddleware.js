const checkPermission = (nivelNecessario) => (req, res, next) => {

    if (!req.usuario || !req.usuario.nivelPermissao) {
        return res.status(401).json({ error: 'Usuário não autenticado ou sem permissão' });
      }

    const { nivelPermissao } = req.usuario; 
  
    if (nivelPermissao === 'administrador' || (nivelPermissao === 'moderador' && nivelNecessario !== 'administrador')) {
      return next();
    }
  
    res.status(403).json({ error: 'Acesso negado: permissão insuficiente' });
  };

export default checkPermission;