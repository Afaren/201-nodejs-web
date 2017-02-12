const {Router} = require('express');
const ItemController = require('../../controller/item-controller');


const router = new Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId', itemCtrl.getOne);
router.put('/:itemId', itemCtrl.update);
router.delete('/:itemId', itemCtrl.delete);
router.post('/', itemCtrl.create);

module.exports = router;