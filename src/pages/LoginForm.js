import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

const LoginForm = ({login}) => {
  const initialState = { username: "", password: ""}
  const [input, setInput] = useState(initialState)
	const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const createdUserToken = await login(input)

    if (createdUserToken) {
      console.log("user is created")
      navigate("/restaurants")
    } else {
      console.log("did not create user")
      navigate("/")
    }
		setInput(initialState);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCreateAccountClick = () => {
    navigate("/register");
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
          placeholder="name@example.com"
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type="password"
          value={input.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input class="btn btn-primary" type="submit" value="Log In" />
      </form>
      <br />
      <br />
      <button type="button" class="btn btn-primary" className='create-account-button' onClick={handleCreateAccountClick}>Create New Account</button>
    </>
  );
};

export default LoginForm