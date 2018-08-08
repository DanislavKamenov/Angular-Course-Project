const routes = require('../controllers/');

module.exports = (router) => {
    router.use('/auth/', routes.authRoutes);
    router.use('/category/', routes.categoryRoutes);
    router.use('/meme/', routes.memeRoutes);
    router.use('/comment/', routes.commentRoutes);
    router.use('/user/', routes.userRoutes);

    router.all('*', (req, res) => {
        res.status(404).json({
            success: false,
            message: '404 not found!'
        }); 
    });
};