import config from "../../config.json";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./UpdatePost.css";
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
    const [post, setPost] = useState<Postss>({
        userId: 1,
        title: "",
        body: "",
      });   
       const { id } = useParams();

    useEffect(() => {
        if (id !== "new") {
          const fetchPost = async () => {
            try {
              const { data } = await axios.get<Postss>(`${config.apiUrl}/${id}`);
              setPost(data);
            } catch (error) {
              console.error("Lỗi khi fetch dữ liệu:", error);
            }
          };
          fetchPost();
        }
      }, [id]);

      const putRequest = async () => {
        try {
          const postRes = await axios.put(`${config.apiUrl}/${id}`, {title: title, body: body, userId:1});
          if (postRes.data) {
            const finIndex = posts.findIndex(
              (item: any) => item.id === postRes.data.id
            );
            posts[finIndex] = postRes.data;
            const updatedList = [...posts];
            setPosts(updatedList);
          }
        } catch (error) {
            console.log(error);
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
              value={post.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              variant="standard"
              fullWidth
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              name="body"
              value={post.body}
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