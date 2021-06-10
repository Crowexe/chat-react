import { useUser } from "../context/user";

const Login = () => {
	const { login } = useUser();
	
	return (
	<button onClick={login}>
		login with Google
	</button>
	);
}

export default Login;