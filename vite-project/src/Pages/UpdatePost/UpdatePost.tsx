import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { POST } from "../interfaces/interface";


type IProps = {
  setPosts: (arr: POST[]) => void;
  posts: POST[];
};


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const UpdatePost: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const { posts, setPosts } = props;
  const { id } = useParams();
  const [post, setPost] = useState<POST>({
    id: Number(id),
    userId: 1,
    title: "",
    body: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = posts.find((post: POST) => post.id === Number(id)) as POST;
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };
    fetchPost();
  }, [id]);

  const putRequest = async () => {
    try {
      const postRes = {
        userId: 1,
        id: Number(id),
        title: post.title,
        body: post.body,
      };
      const updatedList = posts.map((item: POST) => (item.id === postRes.id ? postRes : item));
      setPosts(updatedList);
      localStorage.setItem("posts", JSON.stringify(updatedList));
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await putRequest();
      navigate('/')
    } catch (error) {
      console.error("Lỗi khi lưu bài viết:", error);
    }
  };

  return (
    <>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Update Post
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField
            name="title"
            value={post.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPost({ ...post, title: e.target.value })}
            variant="standard"
            fullWidth
          />
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
            name="body"
            value={post.body}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPost({ ...post, body: e.target.value })}
            variant="standard"
            multiline
            fullWidth
            rows={4}
          />
        </Typography>
        <Button
          sx={{ marginTop: "10px" }}
          variant="outlined"
          size="small"
          disabled={post.title.trim() === '' || post.body.trim() === ''}
          onClick={handleSubmit}
        >
          OK
        </Button>
        <br />
        <Link to={"/"} style={{ marginTop: "50px" }}>Home?</Link>
      </Box>
    </>
  );
};

export default UpdatePost;