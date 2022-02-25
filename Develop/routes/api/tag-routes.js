const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const allTags = await Tag.findAll({
    include: [{ model: Product }],
  }).catch(err => console.log(err)); 
  res.json(allTags);  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag = await Tag.findOne({
    include: [{ model: Product }],
    where: {
      id: req.params.id,
    }
  }).catch(err => console.log(err)) 
  res.json(tag);
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = {
    tag_name: req.body.tag_name,
  }
  await Tag.create(newTag).catch(err => console.log(err));
  res.json('success creating new tag')
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update({
    tag_name: req.body.tag_name,
  }, {
    where: {
      id: req.params.id,
    }
  }).catch(err => console.log(err))

  res.json('Success updating tag with id: ', req.body.tag_nam);

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where: {
      id: req.params.id,
    } 
  }).catch(err => err);
  res.status(200).json(`success deleting tag with id: ${req.params.id}`)
});

module.exports = router;
