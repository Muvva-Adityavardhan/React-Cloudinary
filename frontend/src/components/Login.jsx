// src/components/Login.jsx
import React from "react";

const Login = () => {
	const googleAuth = () => {
		window.open(`${import.meta.env.VITE_API_URL}/auth/google`, "_self");
	};

	return (
		<div>
			<h2>Login with Google</h2>
			<button onClick={googleAuth}>Login with Google</button>
		</div>
	);
};

export default Login;
