const {Router} = require('express');
const CartController = require('../../controller/cart-controller');


const router = new Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getAll);
router.get('/:cartId', cartCtrl.getOne);
router.put('/:cartId', cartCtrl.update);
router.delete('/:cartId', cartCtrl.delete);
router.post('/', cartCtrl.create);

module.exports = router;