# Video Upload REST API

## Description
A Node.js, Express.js, and MongoDB-based REST API for uploading, retrieving, updating, and deleting video records.  
This project allows users to manage a video library with basic CRUD operations, schema validation, and proper response codes. It is designed as a backend practice assignment for APIs in Action Bootcamp.

## Features
- Add (upload) video records with validation (title and videoUrl required)
- Retrieve all uploaded videos
- Update video details by ID
- Delete videos by ID
- Standardized JSON responses and error handling

## Table of Contents
- Installation
- Usage
- API Endpoints
- Example Requests & Responses
- Project Structure
- Contributing
- License
- Contact

## Installation

1. **Clone this repository**  

2. **Install dependencies**  

3. **Ensure MongoDB is running locally**  
The API connects to a local `podcast` database at `mongodb://localhost:27017/podcast`.
- For cloud DB (e.g., MongoDB Atlas), replace the connection string in `server.js`.

4. **Run the server**  
The API will be available at `http://localhost:5000`.

## Usage

Use Postman, Thunder Client, curl, or your frontend app to interact with the API endpoints.

## API Endpoints

### Add Video  
`POST /api/videos`  
**Body Example:**  
{“title”: “JavaScript Basics”,“description”: “Introductory course for JS beginners.”,“videoUrl”: “https://example.com/js-basics”}

### Retrieve All Videos  
`GET /api/videos`

### Update Video  
`PUT /api/videos/:id`  
**Body Example:**  
{“title”: “JavaScript Advanced”,“description”: “Advanced JS concepts”,“videoUrl”: “https://example.com/js-advanced”}

### Delete Video  
`DELETE /api/videos/:id`

## Project Structure
├── server.js
├── package.json
├── README.md

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.  
Follow standard style and submit helpful commit messages.

## License

This project is released under the MIT License.

## Contact

Maintainer: [Your Name]  
Email: your.email@example.com



