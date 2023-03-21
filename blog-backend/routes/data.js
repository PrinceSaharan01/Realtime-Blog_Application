
const express = require('express');
const router = express.Router();
const pool = require("../config");



router.get('/comments', async (req, resp) => {
    try {
        const query = 'select * from tbl_comment order by create_time'
        const data = await pool.query(query);
        resp.send(data.rows);

    } catch (err) {
        resp.status(400).send(err.message)

    }

})


router.get('/posts', async (req, resp) => {
    try {
        const query = 'select * from tbl_post  order by update_time desc ';
        const data = await pool.query(query);
        resp.send(data.rows);

    } catch (err) {
        console.log(err.message);

    }
})

module.exports = router;