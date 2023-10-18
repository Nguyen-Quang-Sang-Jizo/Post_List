import config from "../../config.json";
import {  useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

interface Postss {
  id:number;
  userId: number;
  title: string;
  body: string;
}

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
  setPosts: (arr: string[]) => void;
  posts: string[];
};

const Post: React.FC<IProps> = (props) => {
  const { posts, setPosts } = props;
  const navigate = useNavigate();
  const [titleValue, setTitleValue] = useState<string>("");
  const [bodyValue, setBodyValue] = useState<string>("");


  const has = localStorage.getItem('has');
  
    if (has !== 'true') {
      let nextId = 100
      localStorage.setItem("nextId", nextId.toString());
      }

      localStorage.setItem('has', 'true');

  const postRequest = async () => {
    try {
      let savedId = localStorage.getItem("nextId");
      if(savedId){
      let nextId = parseInt(savedId);
      nextId = nextId + 1;
      const post = {
        title: titleValue,
        body: bodyValue,
        userId: 1
      } as Postss;
      localStorage.setItem("nextId", nextId.toString());

      const postRes = await axios.post(config.apiUrl, post);
      postRes.data.id = nextId;
      if (postRes.data) {
        posts.splice(0, 0, postRes.data);
        const updatedList = [...posts];
        setPosts(updatedList);
        localStorage.setItem("posts", JSON.stringify(updatedList));

      }
    }
    } catch (error) {
      console.log(error);
    }
  }

  
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {if (titleValue.trim() === '' || bodyValue.trim() === '') {
      alert('Vui lòng nhập đầy đủ nội dung.');
    } else {
        await postRequest();
        navigate('/')
    }
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
            onClick={handleSubmit}
          >
            OK
          </Button>
        </Box>
  );
};

export default Post;
