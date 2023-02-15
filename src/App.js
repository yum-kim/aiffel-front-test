import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import ForumList from './components/ForumList/ForumList';
import PostDetail from './components/PostDetail/PostDetail';
import PostAdd from './components/PostAdd/PostAdd';
import './styles/main.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forum" element={<ForumList />} />
      <Route path="/forum/:id" element={<PostDetail />} />
      <Route path="/forum/add" element={<PostAdd />} />
    </Routes>
  );
}

export default App;
