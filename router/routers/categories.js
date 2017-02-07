const {Router} = require('express');
const CategoryController = require('../../controller/category-controller');

const router = new Router();
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:id', categoryCtrl.getOne);
router.put('/:id', categoryCtrl.update);
router.post('/', categoryCtrl.create);
router.delete('/:id', categoryCtrl.delete);

module.exports = router;