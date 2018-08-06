const routes = require('../routes/');

module.exports = (router) => {
    router.use('/auth/', routes.authRoutes);
    router.use('/category/', routes.categoryRoutes);
    router.use('/post/', routes.postRoutes);
    router.use('/comment/', routes.commentRoutes);
    router.use('/user/', routes.userRoutes);
    router.use('/message/', routes.messageRoutes);

    router.all('*', (req, res) => {
        res.status(404).json({
            success: false,
            message: '404 not found!'
        }); 
    });
};