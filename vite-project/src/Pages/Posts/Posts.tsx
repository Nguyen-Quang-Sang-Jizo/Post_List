import { useNavigate } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import { POST } from "../interfaces/interface";

type IProps = {
  setPosts: (arr: POST[]) => void;
  posts: POST[];
};

const Posts: React.FC<IProps> = (props) => {
  const { posts, setPosts } = props;
  const navigate = useNavigate();

  const fetchApiOnce = async () => {
    const hasFetched = localStorage.getItem('hasFetched');

    if (hasFetched !== 'true') {
      try {
        const response = await axios.get(config.apiUrl);
        console.log('response', response);
        setPosts(response.data);
        localStorage.setItem('hasFetched', 'true');
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  fetchApiOnce();

  const handleDelete = async (post: POST) => {
    try {
      const response = await axios.delete(`${config.apiUrl}/${post.id}`);
      console.log('response', response);
      if (response.status === 200) {
        const update = posts.filter((p: POST) => p.id !== post.id)
        setPosts(update);
      }
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  return (
    <div style={{ padding: "150px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "10px",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(`/post/new}`)}
        >
          Create New
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "500" }}>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length > 0 ? (
              posts.map((item: POST) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.body}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/updatepost/${item.id}`)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Posts;
