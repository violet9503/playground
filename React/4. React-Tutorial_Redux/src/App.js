import React from 'react';
import CounterContainer from './containers/CounterContainer';
import PostListContainer from './containers/PostListContainer';
import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

const App = () => {
  return (
    <div>
      <CounterContainer />
      <hr />
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
};

export default App;
