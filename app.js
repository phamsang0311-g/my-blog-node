const express = require('express');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

// KHỞI TẠO APP (Dòng này phải nằm trên cùng, trước khi sử dụng biến app)
const app = express();

// CẤU HÌNH MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// KẾT NỐI DATABASE
mongoose.connect('mongodb://127.0.0.1:27017/blogDB')
    .then(() => console.log('Kết nối MongoDB thành công'))
    .catch((error) => console.log(error));

// 1. TRANG CHỦ - Hiển thị danh sách bài viết
app.get('/', async (req, res) => {
    const posts = await BlogPost.find({}).sort({ _id: -1 });
    res.render('index', { posts });
});

// 2. TRANG TẠO MỚI - Hiển thị form nhập liệu
app.get('/blogposts/new', (req, res) => {
    res.render('create');
});

// 3. XỬ LÝ LƯU BÀI VIẾT - Khi nhấn nút "Lưu bài viết"
app.post('/blogposts/store', async (req, res) => {
    await BlogPost.create({
        title: req.body.title,
        body: req.body.body
    });
    res.redirect('/');
});

// 4. TRANG CHI TIẾT - Xem nội dung cụ thể một bài viết
app.get('/blogposts/:id', async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('detail', { post });
});

// KHỞI CHẠY SERVER
app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});