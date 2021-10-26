import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

interface Post {
  title: string;
  caption: string;
}

function App() {
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } =
    useAuth0();

  const [token, setToken] = useState<string>("");

  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e) {
        alert(e);
      }
    };
    getToken();
  }, []);

  const fetchPosts = () => {
    axios.get("http://localhost:3000/api/v1/posts").then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  console.log(token);

  return (
    <div className="App">
      <header className="App-header">
        {!isAuthenticated ? (
          <button onClick={loginWithRedirect}>Log in</button>
        ) : (
          <>
            <h2>投稿一覧</h2>
            <button onClick={fetchPosts}>投稿取得</button>
            {posts?.map((post: any, index: number) => (
              <div key={index}>
                <p>{post.title}</p>
                <p>{post.caption}</p>
              </div>
            ))}
            <button
              onClick={() => {
                logout({ returnTo: window.location.origin });
              }}
            >
              Log out
            </button>
          </>
        )}
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
