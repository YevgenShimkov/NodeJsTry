// перевірка, чи залогинений користувач
module.exports = (req, res, next) => {
    // console.log(req.user)
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next(); // якщо так- то просто наступний мідлвер
}