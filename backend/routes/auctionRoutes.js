const express = require('express');
const router = express.Router();    

const authMiddleware = require('../middleware/authMiddleware');
const auctionController = require('../controllers/auctions');

router.post('/', authMiddleware, auctionController.createAuction);
router.get('/active', auctionController.getActiveAuctions);

module.exports = router;