import express from 'express';
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {

    router.get('/users', APIController.getAllNotes);

    router.post('/create-user', APIController.createNewNote);

    router.put('/update-user', APIController.updateNote);

    router.delete('/delete-user/:id', APIController.deleteNote);

    return app.use('/api/v1', router);
}

export default initAPIRoute;