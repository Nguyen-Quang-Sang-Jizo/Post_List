import React, { useState }  from "react";
import Posts from "./Pages/Posts/Posts";
import { Routes, Route } from "react-router-dom";
import Post from "./Pages/Post/Post";
import UpdatePost from "./Pages/UpdatePost/UpdatePost";
import { POST } from "./Pages/interfaces/interface";




const App = () => {
  const [posts, setPosts] = useState<POST[]>([]);


  return ( 
      <Routes>
        <Route path="/" element={<Posts
        setPosts={setPosts}
        posts={posts}
        />} />
        <Route path="/post/:id" element={<Post
        setPosts={setPosts}
        posts={posts}
        />} />
      <Route path="/updatepost/:id" element={<UpdatePost
        setPosts={setPosts}
        posts={posts}
        />} />
      </Routes>
  );
};

export default App;
