
exports.getMCM = (req, res) => {
    res.render("mobileCM", {
        user: req.user,
        req: req
    })
}