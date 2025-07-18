// src/components/AuthCallback.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthCallback = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const token = params.get("token");

		if (token) {
			localStorage.setItem("token", token);
			navigate("/dashboard");
		} else {
			navigate("/");
		}
	}, [location, navigate]);

	return <div>Loading...</div>;
};

export default AuthCallback;
