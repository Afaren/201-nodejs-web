const {Router} = require('express');
const CategoryController = require('../../controller/category-controller');


const router = new Router();
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:categoryId', categoryCtrl.getOne);
router.put('/:categoryId', categoryCtrl.update);
router.delete('/:categoryId', categoryCtrl.delete);
router.post('/', categoryCtrl.create);

module.exports = router;