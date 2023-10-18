import config from "../../config.json";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";


type IProps = {
    setPosts: (arr: string[]) => void;
    posts: string[];
  };

  interface Postss {
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

const UpdatePost: React.FC<IProps> = (props) =>  {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const { posts, setPosts } = props;
    const { id } = useParams();
    const [post, setPost] = useState<Postss>({
        userId: 1,
        title: "",
        body: "",
      });   

    useEffect(() => {
          const fetchPost = async () => {
            try {
              const getData = JSON.parse(localStorage.getItem("posts") || "[]");
              const data = getData.find((post: any) => post.id == id);
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
                title: title || post.title, 
                body: body || post.body,    
            };
            const updatedList = posts.map((item: any) => (item.id === postRes.id ? postRes : item));
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
return(
    <>
    <Box sx={style}>
      <Typography variant="h6" component="h2">
            Update Post
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TextField
              name="title"
              value={title === "" ? post.title : title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              variant="standard"
              fullWidth
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              name="body"
              value={body === "" ? post.body : body}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBody(e.target.value)}
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
            onClick={handleSubmit}
          >
            OK
          </Button>
        </Box>
    </>
);
};

export default UpdatePost;