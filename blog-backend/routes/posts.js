const express = require('express');
const router = express.Router();
const pool = require("../config");


router.post('/send', async (req, resp) => {
    try {



        const { title, tag, content, status, author_id } = req.body;
        // const now = new Date();
        const query = 'insert into tbl_post (title,tag,content,status,author_id) values($1,$2,$3,$4,$5) returning*'
        const values = [title,tag, content, status, author_id];
        const data = await pool.query(query, values);

        resp.send({ Result: data.rows[0] })
    } catch (err) {
        resp.status(500).send({ Erros: err.message })
    }

})

router.put('/update/:id', async (req, resp) => {
    try {



        const id = req.params.id
        const now = new Date();
        const { title, tag, content, status } = req.body;
        const values = [id, title, tag, content, status, now]
        const query = 'update tbl_post set title = $2,tag=$3,content=$4 ,status=$5,update_time=$6 where id=$1 returning*'
        const data = await pool.query(query, values);
        resp.send(data.rows[0]);
    } catch (err) {
        console.log(err.message);


    }

})





router.get('/home' , async(req,resp)=>{
    try {
        const query = 'select * from tbl_post  order by update_time desc ';
        const data = await pool.query(query);
        resp.send(data.rows);

    } catch (err) {
        console.log(err.message);
        
    }
})



module.exports = router;

