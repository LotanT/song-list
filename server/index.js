const express = require('express');
const expressSession = require('express-session');
const cors = require('cors');
const path = require('path');

const app = express();

const session = expressSession({
  secret: 'coding is amazing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});
app.use(express.static('public'));
app.use(express.json());
app.use(session);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5000',
      'http://localhost:3000',
      'http://localhost:5000',
      '/**',
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const songRoutes = require('./api/song/song.routes');
const authRoutes = require('./api/auth/auth.routes');

app.use('/api/song', songRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
