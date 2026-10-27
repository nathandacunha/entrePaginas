export function exigirLogin(req, res, next) {
    if(!req.session.usuario) {
        return res.status(401).json({ erro: "Você precisa estar logado" });
    }
    next();
} 

// para a pagina HTML redireciona em vez de devolver em json
export function exigirLoginPagina(req, res, next) {
    if(!req.session.usuario) {
        return res.redirect('/pages/login.html')
    }
    next();
}