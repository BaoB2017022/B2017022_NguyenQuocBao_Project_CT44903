import pool from "../configs/connectDB";

let getHomepage = async (req, res) => {
    //Logic
    const [rows, fields] = await pool.execute('SELECT * FROM todolist');
    //Truyen du lieu vao view
    //Thay doi tu kieu object ve string {key: value}
    return res.render("homePage.ejs", { dataUser: rows });       
}

let getDetailPage = async (req, res) => {
    let id = req.params.userID;
    let [user] = await pool.execute(`select * from todolist where id = ?`, [id])

    //console.log('check req params: ', user)
    return res.send(JSON.stringify(user))
}

let createNewNote = async (req, res) => {
    console.log('check req: ', req.body)
    let { title, importance, date, time, location } = req.body;

    await pool.execute('insert into todolist(title, importance, date, time, location) values (?, ?, ?, ?, ?)',
        [title, importance, date, time, location]);

    return res.redirect('/')
}

let deleteNote = async (req, res) => {
    let userID = req.body.userID;
    await pool.execute('delete from todolist where id = ?', [userID]);

    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute(`Select * from todolist where id = ?`, [id]);

    return res.render('updatePage.ejs', { dataUser: user[0] }); 
}

let postUpdateNote = async (req, res) => {
    let { title, importance, date, time, location, description, id } = req.body;

    await pool.execute('update todolist set title = ?, importance = ?, date = ?, time = ?, location = ?, description = ?  where id = ?',
        [title, importance, date, time, location, description, id]);

    console.log('check request: ', req.body)
    return res.redirect('/')
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewNote,
    deleteNote, 
    getEditPage,
    postUpdateNote
}