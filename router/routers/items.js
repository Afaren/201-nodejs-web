const {Router}= require('express');
const ItemController = require('../../controller/ItemController') ;


const router = Router();
const item = new ItemController();

router.get('/', item.getAll);
router.get('/:id', item.getOne);
router.post('/', item.create)
router.delete('/:id', item.delete)
router.put('/:id', item.update);

module.exports = router;