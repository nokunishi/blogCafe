const express = require('express')
const router = express.Router()
const Article = require('./../models/articles')

router.get('/new', (req, res) => {
    res.render('articles/new')
})


router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit')
});

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
});


router.get('/:slug', async (req, res) => {
    try {
        const article = await Article.findOne({slug: req.params.slug})
        res.render("articles/show", {article: article});
    } catch (e) {
        console.log(e)
    }
}) 

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })

    console.log(article.slug);

    try {
        article = await article.save()
        console.log(article.slug);
        res.redirect('/articles/' + article.slug)
    } catch (err){
        res.status(500).render('articles/new');
    }
})

module.exports = router 