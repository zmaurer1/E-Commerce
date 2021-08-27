const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{ model:Product }]
    });
    res.status(200).json(categoryData);
  } catch(err){
    res.status(418).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include:[{ model:Product }],
    });
    if (!categoryData){
      res.status(404).json({ messdage: "That product don't exist" });
      return;
    }
    res.status(200).json(categoryData);
  }catch(err) {
    res.status(418).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name:req.body.category_name,
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(418).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!categoryData[0]){
      res.status(418).json({ message:"Aint no category with that id!" });
      return;
    }
    res.status(200).json(categoryData);
  }catch(err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!categoryData) {
      res.status(418).json({ message: "Aint no category with that id!" });
      return;
    }
    res.status(200).json(categoryData);
  }catch(err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
