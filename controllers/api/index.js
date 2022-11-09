const router = require('express').Router();
const userRoutes = require('./userRoutes');
const trackerRoutes = require('./trackerAPIRoutes')

router.use('/users', userRoutes);
router.use('/tracker', trackerRoutes); 

module.exports = router;
