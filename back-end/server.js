const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const http = require('http');
const { Server } = require('socket.io');
const { log } = require('console');

const app = express();
const PORT = 5000;
app.use(express.json())
app.use(cors());
const server = http.createServer(app);

//Load users data from data.json and Read from json / write on json
const userDataPath = path.join(__dirname, 'data.json');
const readUsersFile = () => {
    const data = fs.readFileSync(userDataPath, 'utf8');
    return JSON.parse(data)
}
const writeUsersFile = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2))
}


// Login endpoint 
app.post('/login', (req, res) => {
    const users = readUsersFile()
    const { name, mobileNumber } = req.body;
    const user = users.find(user => user.name === name && user.phone === mobileNumber);
    if (user) {
        res.json(user)
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(404).json({ message: 'User not available in the app' });
    }
});


// Singup endpoint 
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
const storage = multer.diskStorage({ //This function creates a storage object for handling file uploads on disk.
    destination: (req, file, cb) => { //This function determines the folder where the uploaded files will be stored.
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save file in uniuqe name with original extension
    }
});
const upload = multer({ storage }); // This is a middleware for handling multipart/form-data, which is primarily used for uploading files
app.post('/api/register', upload.single('img'), (req, res) => {
    const { name, phone } = req.body
    const users = readUsersFile()
    let userName = users.find((element) => {
        return element.name === name
    })
    let userPhone = users.find((element) => {
        return element.phone === phone
    })
    if (userName) {
        console.log("The userName is already exist");
        res.status(404).json("The userName is already exist");
    }
    else if (userPhone) {
        console.log("The phone is already exist");
        res.status(404).json("The phone is already exist");
    }
    else {
        const newUser = {
            id: Math.floor(Math.random() * 100000),
            name: name,
            phone: phone,
            img: req.file.path,
            messages: [],
            contact: []
        }
        users.push(newUser)
        writeUsersFile(users)
        res.json("'Registration successful")
    }
})


// Contact endpoint 
app.post('/contact', (req, res) => {
    let { contactName, contactNumber } = req.body.contact
    let userLoggedIn = req.body.userLoggedIn
    const users = readUsersFile()
    //give me the contact if is exist in json
    let userContact = users.find((element) => {
        return contactName === element.name && contactNumber === element.phone
    })
    //give me the user how loggedin
    let userLogged = users.find((element) => {
        return userLoggedIn === element.name
    })
    //give me the user if the contatc is exist in the userloggedcontact
    let existContatc = userLogged.contact.find((element) => {
        return contactName === element.contactName
    })
    if (userContact) {
        if (userLogged.name !== contactName && userLogged.phone !== contactNumber) {
            if (!existContatc) {
                userLogged.contact.push({ contactName: contactName, contactNumber: contactNumber });
                writeUsersFile(users);
                res.status(201).json('Contact added successfully');
            }
            else {
                res.status(404).json("The contact is already exist");
            }
        }
        else {
            res.status(404).json("You can't add the user who logged in");
        }
    }
    else {
        res.status(404).json("The contact is not exist");
    }
})

// data endpoint
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'data.json'));
});















const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Track socket IDs for 'from' and 'to' users
let socketIdFrom = null;
let socketIdTo = null;
// Track socket IDs for 'from' and 'to' users

// Assign user names
const from = 'Shaimaa AlRajeh';
const to = 'yara Mamary';

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Set 'from' and 'to' socket IDs based on the first and second connections
    if (!socketIdFrom) {
        socketIdFrom = socket.id;
        console.log(`Assigned socketIdFrom for ${from}:`, socketIdFrom);
    } else if (!socketIdTo) {
        socketIdTo = socket.id;
        console.log(`Assigned socketIdTo for ${to}:`, socketIdTo);
    }

    // Listen for messages
    socket.on('message', (message) => {
        // Check if the message is not empty
        if (!message || message.trim() === '') {
            console.log("Received an empty message, ignoring.");
            return; // Exit if the message is empty
        }

        const timestamp = new Date().toISOString();
        let fromUser, toUser;

        // Determine the sender and receiver based on socket ID
        if (socket.id === socketIdFrom) {
            fromUser = from;
            toUser = to;
            console.log(`Message from ${fromUser} (socketIdFrom):`, socket.id);
        } else if (socket.id === socketIdTo) {
            fromUser = to;
            toUser = from;
            console.log(`Message from ${fromUser} (socketIdTo):`, socket.id);
        } else {
            console.log("Unknown socket ID, ignoring.");
            return; // Exit if socket ID does not match any tracked IDs
        }

        const messageData = { from: fromUser, to: toUser, timestamp, message };

        // Emit message to all clients
        io.emit('message', messageData, socketIdFrom, socketIdTo, socket.id);
        console.log('-------------------', socket.id, '--------------');
        

        // Save the message to 'data.json' for both users
        const filePath = path.join(__dirname, 'data.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }

            let users = JSON.parse(data);

            // Store message in 'fromUser' user's messages
            const fromUserEntry = users.find(user => user.name === fromUser);
            if (fromUserEntry) {
                let messageEntry = fromUserEntry.messages.find(msg => msg.from === fromUser && msg.to === toUser);
                if (messageEntry) {
                    messageEntry.message.push(message);
                    messageEntry.timestamp.push(timestamp);
                } else {
                    fromUserEntry.messages.push({ from: fromUser, to: toUser, timestamp: [timestamp], message: [message] });
                }
            } else {
                console.error("From user not found");
            }

            // Store message in 'toUser' user's messages
            const toUserEntry = users.find(user => user.name === toUser);
            if (toUserEntry) {
                let messageEntry = toUserEntry.messages.find(msg => msg.from === fromUser && msg.to === toUser);
                if (messageEntry) {
                    messageEntry.message.push(message);
                    messageEntry.timestamp.push(timestamp);
                } else {
                    toUserEntry.messages.push({ from: fromUser, to: toUser, timestamp: [timestamp], message: [message] });
                }
            } else {
                console.error("To user not found");
            }

            // Write updated data back to the file
            fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                } else {
                    console.log('Message saved successfully for both users!');
                }
            });
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        if (socket.id === socketIdFrom) {
            socketIdFrom = null; // Reset if 'from' user disconnects
        } else if (socket.id === socketIdTo) {
            socketIdTo = null; // Reset if 'to' user disconnects
        }
    });
});






















































// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});