import express from 'express';

const configViewEngine = (app) => {
    app.use(express.static('./frontend/public'));
    app.set("view engine", "ejs");
    app.set('views', './src/frontend/views')
}

export default configViewEngine;