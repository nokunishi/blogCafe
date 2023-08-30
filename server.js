const express = require('express')
const app = express()
const mongoose = require('mongoose')
const articleRouter = require('./routes/articlesRoute')
const Article = require('./models/articles')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('articles/index', {articles: articles})
})

app.use("/articles", articleRouter);


app.listen(3000)