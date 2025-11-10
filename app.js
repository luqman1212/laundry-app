const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/views', express.static('views'));

// Data sementara (simulasi database)
let pesanan = [];

// Route: Halaman utama
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Route: Tambah pesanan
app.post('/tambah', (req, res) => {
  const { nama, berat, jenis } = req.body;
  const id = Date.now();
  pesanan.push({ id, nama, berat: parseFloat(berat), jenis });
  res.redirect('/');
});

// Route: Hapus pesanan
app.post('/hapus/:id', (req, res) => {
  const id = parseInt(req.params.id);
  pesanan = pesanan.filter(p => p.id !== id);
  res.redirect('/');
});

// Route: API daftar pesanan (untuk tampil di HTML)
app.get('/pesanan', (req, res) => {
  res.json(pesanan);
});

app.listen(port, () => {
  console.log(`Aplikasi Laundry berjalan di http://localhost:${port}`);
});