// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
	const [media, setMedia] = useState([]);
	const [file, setFile] = useState(null);

	const fetchMedia = async () => {
		const token = localStorage.getItem("token");
		const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/media/gallery`, {
			headers: { "x-auth-token": token },
		});
		setMedia(res.data);
	};

	useEffect(() => {
		fetchMedia();
	}, []);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append("media", file);
		const token = localStorage.getItem("token");
		await axios.post(`${import.meta.env.VITE_API_URL}/api/media/upload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				"x-auth-token": token,
			},
		});
		fetchMedia();
	};

	return (
		<div>
			<h2>Your Gallery</h2>
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>

			<div className="gallery">
				{media.map((item) => (
					<div key={item.public_id}>
						{item.mediaType === "image" ? (
							<img src={item.url} alt="" width="200" />
						) : (
							<video src={item.url} width="200" controls />
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
