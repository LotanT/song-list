import './assets/style/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SongList } from './pages/SongList';
import { Header } from './cmps/Header';
import { Login } from './pages/LogIn';
import { UserMsg } from './cmps/UserMsg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <section className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/songlist" element={<SongList />} />
        </Routes>
        <UserMsg />
      </BrowserRouter>
    </section>
  );
}

export default App;
