import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const UpdateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const {
    data: blog,
    isloading,
    error,
  } = useFetch("http://localhost:8000/blogs/" + id);
  //id is coming undefined in this / UpdateBlog.js:16 PUT http://localhost:8000/blogs/undefined
  const history = useHistory();
  const handleUpdate = (e) => {
    e.preventDefault();
    const data = { title, body, author };
    setIsPending(true);
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      setIsPending(false);
      history.push("/");
    });
  };
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setAuthor(blog.author);
    }
  }, [blog]);
  return (
    <div className="create">
      {isloading && <div>loading.....</div>}
      {error && <div>{error}</div>}
      {blog && (
        <div>
          <h2>Updatinga new Blog</h2>
          <form onSubmit={handleUpdate}>
            <label>Blog title:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Blog body:</label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <label>Blog author:</label>
            <select
              value={author}
              onChange={(e) => {
                console.log(e.target.value);
                setAuthor(e.target.value);
              }}
            >
              <option value="mario">mario</option>
              <option value="yoshi">yoshi</option>
            </select>
            {!isPending ? (
              <button>update Blog</button>
            ) : (
              <button disabled>updating Blog...</button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateBlog;
