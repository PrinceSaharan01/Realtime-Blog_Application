const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const pool = require('./config');
app.use(cors());
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})

io.on("connection", (socket) => {



    console.log(socket.id);

    try {

        const userNotes = async () => {
            const query = 'select * from tbl_post  order by update_time desc ';
            const result = await pool.query(query);
            socket.emit('user', result.rows);
        }
        userNotes();


        const userComments = async () => {
            const query = 'select * from  tbl_comment order by create_time  ';
            const result = await pool.query(query);
            socket.emit('comments', result.rows)

        }
        userComments();

        // Create and post using Sockets

        socket.on('post', async (data) => {

            const { title, tag, content, status, author_id } = data;

            const query = 'insert into tbl_post (title,tag,content,status,author_id) values($1,$2,$3,$4,$5) returning*'
            const values = [title, tag, content, status, author_id];
            const result = await pool.query(query, values);
            socket.broadcast.emit('fetch', result.rows[0]);
        })


        // Deleting using sockets


        socket.on('delete', async (id) => {
            const qd = 'delete from tbl_comment where post_id=$1'
            const values = [id];
            const result = await pool.query(qd, values)
            const query = 'delete from tbl_post where id = $1';
            const data = await pool.query(query, values);
            if (data.rowCount > 0) {

                // socket.broadcast.emit()
                // console.log('deleted');
                io.emit('deleted', id);
            }

        })

        // updating using sockets 

        socket.on('update', async (data) => {
            const now = new Date();
            // console.log(data);
            const values = [data.id, data.satt, data.vall, now];
            const query = 'update  tbl_post set status =$2 , content = $3, update_time =$4 where id=$1 returning*'
            const result = await pool.query(query, values);
            // console.log(result.rows[0]);
            socket.broadcast.emit('updated', { ...result.rows[0], index: data.index })

        })


        // commenting the post

        socket.on('on_comment', async (data) => {
            const { post_id } = data;
            const values = [post_id, data.author, data.email, data.comment]
            const query = 'insert into tbl_comment (post_id,author,email,content) values($1,$2,$3,$4) returning*';
            const result = await pool.query(query, values);
            // console.log(result.rows[0]);
            socket.broadcast.emit('verify', result.rows[0]);


        })
        socket.on('update_comment', async (data) => {
            console.log(data);
        })

        socket.on('verify_comment', async (id) => {
            const value = ['Post', id.id]
            const query = 'update tbl_comment set status = $1 where id =$2 returning*';
            const result = await pool.query(query, value);
            // console.log(result.rows[0]);
            socket.broadcast.emit('verified_comment', { ...result.rows[0], id: id.id })
            // console.log(id);
        })

        socket.on('delete_comment', async (id) => {
            // console.log(id);
            const value = [id];
            const query = 'delete from tbl_comment where id=$1'
            const result = await pool.query(query, value)
            socket.broadcast.emit('delete_confirmed', id)
        })

        socket.on('disconnect', () => {
            console.log("User Disconnected");
        })

    } catch (err) {
        console.log(err.message);

    }
})

app.use("/user", require("./routes/user"));
app.use('/data', require('./routes/data'));
server.listen(7878, () => {
    console.log("Server running at 7878");
})
