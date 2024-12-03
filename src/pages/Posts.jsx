import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Posts = () => {
    let navigate = useNavigate();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(id);

  const [loading, setLoading] = useState(true);

  function onSearch() {
    fetchPosts(search);
  }

  async function fetchPosts(userId) {
    setLoading(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
    );
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="post__search">
        
        <button onClick={() => navigate('/')}>← Back</button>
        
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            onKeyDown={(event) => event.key === "Enter" && onSearch()}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={id}
            min={0}
          />
          <button onClick={() => onSearch()}>Enter</button>
        </div>
      </div>

      {loading
        ? new Array(10).fill(0).map((_, index) => (
            <div key={index} className="post">
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        : posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))}
    </>
  );
};

export default Posts;
