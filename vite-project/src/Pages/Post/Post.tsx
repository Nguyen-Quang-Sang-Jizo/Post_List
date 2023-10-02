import config from "../../config.json";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./Post.css";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<Post>({
    userId: 1,
    id: 11,
    title: "",
    body: "",
  });

  useEffect(() => {
    if (id !== "new") {
      const fetchPost = async () => {
        try {
          const { data } = await axios.get<Post>(`${config.apiUrl}/${id}`);
          setPost(data);
        } catch (error) {
          console.error("Lỗi khi fetch dữ liệu:", error);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (id === "new") {
        await axios.post(config.apiUrl, post);
      } else {
        await axios.put(`${config.apiUrl}/${id}`, post);
      }
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi lưu bài viết:", error);
    }
  };

  return (
    <div className="post__wrapper">
      <div className="container">
        <form className="post" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title..."
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Body..."
            name="body"
            value={post.body}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            {id === "new" ? "Post" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
