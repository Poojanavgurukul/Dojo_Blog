import { useParams, useHistory, Link } from "react-router-dom";
import useFetch from "./useFetch";


const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isloading, error } = useFetch('http://localhost:8000/blogs/'+id)
    const history = useHistory();
    const handleDelete=()=>{
        fetch(`http://localhost:8000/blogs/${blog.id}`,{
            method:'DELETE'
        })
        .then(()=>{
            console.log(blog.id)
            history.push('/')
        })
    }
    return ( 
        <div className="blog-details">
            { isloading && <div>loading.....</div> }
            { error && <div>{error}</div>}
            { blog && (<article>
                <h2>{blog.title}</h2>
                <p>written by {blog.author}</p>
                <div>{blog.body}</div>
                <button onClick={handleDelete}>Delete</button>
                <Link to={`/update/${blog.id}`}>
                <button>update</button>
                </Link>
            </article>)}
        </div>
     );
}
 
export default BlogDetails;