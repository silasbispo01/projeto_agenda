exports.show_contacts = (req, res) => {
    if(!req.session.user) return res.redirect("/")
    res.render("contacts/show_contatos")
}