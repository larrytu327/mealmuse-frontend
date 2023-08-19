import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

const RegisterForm = ({signup}) => {
  const initialState = { username: "", password: "", first_name: "", last_name: ""}
  const [input, setInput] = useState(initialState)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const createdUserToken = await signup(input)

    if (createdUserToken) {
      navigate("/restaurants")
    } else {
      navigate("/")
    }
	setInput(initialState);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name: </label>
        <input
          id="first_name"
          name="first_name"
          value={input.first_name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="last_name">Last Name: </label>
        <input
          id="last_name"
          name="last_name"
          value={input.last_name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
};

export default RegisterForm