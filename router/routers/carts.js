const {Router} = require('express');
const CartController = require('../../controller/cart-controller');

const router =  Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getAll);
router.get('/:id', cartCtrl.getOne);
router.put('/:id', cartCtrl.update);
router.post('/', cartCtrl.create);
router.delete('/:id', cartCtrl.delete);

module.exports = router;


