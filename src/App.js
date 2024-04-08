import "./App.css";
import { useEffect, useState } from "react";
export default function App() {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [API, setAPI] = useState("users");
  const [query, setQuery] = useState("");

  const clickHandler = (val) => {
    setAPI(val);
  };

  useEffect(() => {
    async function fetchAPI() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/${API}`);

        const data = await res.json();

        setData(data);
        setError("");
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
      }
    }
    fetchAPI();
  }, [API]);
  const filteredData =
    query === ""
      ? data
      : data.filter((item) => {
          // Assuming 'name' for users and comments, 'title' and 'body' for posts
          return API === "posts"
            ? item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.body.toLowerCase().includes(query.toLowerCase())
            : item.name.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div className="App">
      <h1>
        Simple getUsers, getComments, getPosts API project from JSONplaceholder
      </h1>
      <Button clickHandler={clickHandler}>users</Button>
      <Button clickHandler={clickHandler}>posts</Button>
      <Button clickHandler={clickHandler}>comments</Button>
      <Search query={query} setQuery={setQuery} />

      {/* {!error && <User users={filteredUsers}/>} */}

      {error && <Error error={error} />}
      {API === "users" && <Users users={filteredData} />}
      {API === "posts" && <Posts posts={filteredData} />}
      {API === "comments" && <Comments comments={filteredData} />}
    </div>
  );
}
function Comments({ comments }) {
  return (
    <div>
      <ol>
        {comments.map((comment, i) => (
          <li key={i}>{comment.name}</li>
        ))}
      </ol>
    </div>
  );
}
function User({ key, user }) {
  const addressKeys = Object.keys(user.address).filter(key => key !== 'geo');
  const getAddress = () => {
    let address = ""
    for(let key of addressKeys) {
      address+= `${key[0].toUpperCase() + key.slice(1)}: ${user.address[key]}` + "\n"
    }
    return address
  }
 
console.log(addressKeys);
  return (
    <li key={key}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{getAddress()}</p>
    </li>
  );
}
function Posts({ posts }) {
  return (
    <div>
      <ol>
        {posts.map((post, i) => (
          <li key={i}>{post.body}</li>
        ))}
      </ol>
    </div>
  );
}
function Error({ error }) {
  return <div>{error}</div>;
}
function Users({ users }) {
  return (
    <ol>
      {users.map((user, i) => (
        <User key={i} user={user} />
      ))}
    </ol>
  );
}
function Search({ query, setQuery }) {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}
function Button({ clickHandler, children }) {
  return (
    <button value={children} onClick={() => clickHandler(children)}>
      Get {children}
    </button>
  );
}
