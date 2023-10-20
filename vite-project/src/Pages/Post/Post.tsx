import config from "../../config.json";
import { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { POST } from "../interfaces/interface";
import { v4 as uuidv4 } from 'uuid'

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

type IProps = {
  setPosts: (arr: POST[]) => void;
  posts: POST[];
};

const Post: React.FC<IProps> = (props) => {
  const { posts, setPosts } = props;
  const navigate = useNavigate();
  const [titleValue, setTitleValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");

  const postRequest = async () => {
    try {
      const uuid = uuidv4();
      const nextId = parseInt(uuid.replace(/-/g, ''), 16) % 1000000 + 101;
      if (nextId) {
        const post = {
          title: titleValue,
          body: bodyValue,
          userId: 1
        } as POST;
        const postRes = await axios.post(config.apiUrl, post);
        postRes.data.id = nextId;
        if (postRes.data) {
          posts.splice(0, 0, postRes.data);
          const updatedList = [...posts];
          setPosts(updatedList);
          localStorage.setItem("posts", JSON.stringify(updatedList));
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await postRequest();
      navigate('/')
    } catch (error) {
      console.error("Lỗi khi lưu bài viết:", error);
    }
  };

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        Create New Post
      </Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <TextField
          name="title"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          variant="standard"
          fullWidth
          required
        />
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <TextField
          name="body"
          value={bodyValue}
          onChange={(e) => setBodyValue(e.target.value)}
          variant="standard"
          multiline
          fullWidth
          required
          rows={4}
        />
      </Typography>
      <Button
        sx={{ marginTop: "10px" }}
        variant="outlined"
        size="small"
        disabled={titleValue.trim() === '' || bodyValue.trim() === ''}
        onClick={handleSubmit}
      >
        OK
      </Button>
      <br />
      <Link to={"/"} style={{ marginTop: "50px" }}>Home?</Link>
    </Box>
  );
};

export default Post;
