import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";
import "./Posts.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";

type IProps = {
  setPosts: (arr: string[]) => void;
  posts: string[];
};

const Posts: React.FC<IProps> = (props) => {
  const { posts, setPosts } = props;
  const navigate = useNavigate();

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      const response = await axios.get(config.apiUrl);
      console.log('response', response);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleDelete = async (post: any) => {
    try {
      const response = await axios.delete(`${config.apiUrl}/${post.id}`);
      console.log('response', response);
      if (response.status === 200) {
        const update = posts.filter((p: any) => p.id !== post.id)
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
              posts.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.body}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/post/${item.id}`)}
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
