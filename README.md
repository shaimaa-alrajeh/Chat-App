# Chat Application

A real-time chat application that allows two users to communicate seamlessly. Built with **React** on the frontend and **Express** with **Socket.IO** on the backend, this project demonstrates how to implement WebSocket-based communication, user authentication, and message persistence.

## Features

- **Real-Time Messaging**: Messages are sent and received instantly using Socket.IO.
- **User Authentication**: Login and registration functionality with user details stored in a JSON file.
- **Message History**: Chat messages are saved and retrieved from a persistent storage (JSON file).
- **Contact Management**: Add and manage contacts for communication.
- **File Uploads**: Users can upload profile pictures during registration.

## Technologies Used

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express, Socket.IO
- **Storage**: JSON file for user and message data

## Prerequisites

- Node.js and npm installed
- Basic understanding of React and Node.js

## Getting Started

### 1. Clone the Repository
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```
### 2. Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```
#### Start the backend server:

```bash
npm start
```

### 3. Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd ../frontend
npm install
```
#### Start the frontend development server:

```bash
npm start
```

## Usage

1. **Register a User**:
   - Go to the registration page.
   - Fill in the name, phone number, and upload an image.
   - On successful registration, log in with the credentials.

2. **Add Contacts**:
   - Add contacts by their name and phone number.
   - Only existing users can be added as contacts.

3. **Start Chatting**:
   - Open the chat interface.
   - Send and receive messages in real time.

## Backend Endpoints

- **Login**: `POST /login`  
  Authenticate users based on their name and phone number.  

- **Register**: `POST /api/register`  
  Register new users with name, phone number, and profile picture.  

- **Add Contact**: `POST /contact`  
  Add a contact to a user’s contact list.  

- **Get Data**: `GET /data`  
  Retrieve all user data and messages.  

## How It Works

1. **Socket Connection**:
   - Each user is assigned a unique socket ID upon connection.
   - The server tracks socket IDs for the two users in the chat (e.g., `socketIdFrom` for User A and `socketIdTo` for User B).

2. **Real-Time Messaging**:
   - Messages are transmitted through Socket.IO using the `message` event.
   - The server determines the sender and receiver based on socket IDs and broadcasts the message to all connected clients.

3. **Message Persistence**:
   - Each message is saved in the `data.json` file under both sender’s and receiver’s message arrays.
   - Message objects include `from`, `to`, `timestamp`, and `message` fields.

4. **Contact Management**:
   - Users can add existing users as contacts by their name and phone number.
   - Duplicate contacts or adding oneself as a contact is prevented.
## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Make your changes in a new branch.
3. Submit a pull request with a detailed description of the updates.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
