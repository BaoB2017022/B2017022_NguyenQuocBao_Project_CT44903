import express from 'express';
import homeController from '../controller/homeController'

let router = express.Router();

const initWebRoute = (app) => {

    router.get('/', homeController.getHomepage);

    router.get('/detail/user/:userID', homeController.getDetailPage)

    router.post('/create-new-user', homeController.createNewNote);

    router.post('/delete-user', homeController.deleteNote);

    router.get('/edit-user/:id', homeController.getEditPage);

    router.post('/update-user', homeController.postUpdateNote);

    router.get('/about', (req, res) => {
        res.send("Nguyen Quoc Bao");
    })

    return app.use('/', router);
}

export default initWebRoute;