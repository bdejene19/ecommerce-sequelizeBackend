const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',  async (req, res) => {
  // find all categories
  let categories = await Category.findAll({
    include: [{ model: Product }]
  })

  res.json(categories)
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const specificCategory = await Category.findOne({
      include: [{ model: Product }],
      where: {
        id: req.params.id,
      }
    })
    
    res.json(specificCategory);
  } catch(err) {
    console.log(err);
  }

});

router.post('/', (req, res) => {
  // create a new category
  try {
    let newCategory = {
      category_name: req.body.category_name,
    }
    Category.create(newCategory).then(categoryAdded => {
      res.json(`Success adding ${categoryAdded}`)
    });

  } catch(e) {
    console.log({message: 'error adding new category to db'});
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedName = await Category.update({
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      
      },
    )
    res.json(`success updating category name`);
    // res.json(updatedName);

  } catch(err) {
    console.log(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    res.json('Success deleting category')

  } catch(err) {
    console.log(err);
  }
  
});

module.exports = router;
