import pool from "../configs/connectDB"

let getAllNotes = async (req, res) => {
    //http
    //404 501 
    //json => object
    const [rows, fields] = await pool.execute(`SELECT * FROM todolist`);

    return res.status(200).json({
        message: "Bao",
        data: rows
    })
}

let createNewNote = async (req, res) => {
    let { title, importance, date, time, location } = req.body;

    if(!title || !importance || !date || !time){
        return res.status(200).json({
            message: 'missing'
        })
    }

    await pool.execute('insert into todolist(title, importance, date, time, location) values (?, ?, ?, ?, ?)',
        [title, importance, date, time, location]);

    return res.status(200).json({
        message: 'ok'
    })
}

let updateNote = async (req, res) => {
    let { title, importance, date, time, location, description, id } = req.body;

    if(!title || !importance || !date || !time || !id){
        return res.status(200).json({
            message: 'missing'
        })
    }

    await pool.execute('update todolist set title = ?, importance = ?, date = ?, time = ?, location = ?, description = ?  where id = ?',
        [title, importance, date, time, location, description, id]);

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteNote = async (req, res) => {

    let userID = req.params.id;

    if(!userID){
        return res.status(200).json({
            message: 'missing'
        })
    }

    await pool.execute('delete from todolist where id = ?', [userID]);

    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote, 
    deleteNote
}