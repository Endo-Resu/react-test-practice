import React, {useState} from 'react';
import axios from "axios";

const Login = () => {
    const [error, setError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/users/1");
            setUser(data)
        } catch (error) {
            setError(true)
        }
        setLoading(false)
    }

    return (
        <div className="container">
            <span>{user.name}</span>
            <form title="form">
                <input
                    type="text"
                    placeholder="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    disabled={!userName || !password}
                    onClick={handleClick}
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                <span
                    data-testid="error"
                    style={{visibility: error ? "visible" : "hidden"}}
                >
                    Something error-like
                </span>
            </form>
        </div>
    );
};

export default Login;
