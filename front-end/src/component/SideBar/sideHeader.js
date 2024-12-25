import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';


function SideHeader() {
    let userLogged = sessionStorage.getItem("userLogged")
    let userLoggedIn = JSON.parse(userLogged)
    let [MessageContactError, setMessageContactError] = useState("")
    
    const [open, setOpen] = useState(false); 
    const [contact, setContact] = useState({
        contactName: "",
        contactNumber: ""
    })
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setContact({contactName: "", contactNumber: ""})
        setMessageContactError("")
    };
    const changeContact = (event)=>{
        let {name, value} = event.target
        setContact((prevState)=>({...prevState, [name]: value}))
    }
    const addContact = async ()=>{
        let result
        try {
            const response = await fetch('http://localhost:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({contact, userLoggedIn}),
            });
            result = await response.json();
            if (response.ok) {
                setOpen(false);
                setContact({contactName: "", contactNumber: ""})
                console.log("Contact added successfully");
            } else {
                setMessageContactError(result);
            }
        } catch (error) {
            setMessageContactError(result)
            setContact({contactName: "", contactNumber: ""})
            console.error('Contact not found in this app');
        }
    }
    return(
        <header className="p-4 border-b border-gray-300 md:flex sm:block justify-between items-center bg-blue-400 text-white">
            <h1 className="font-semibold">{userLoggedIn}</h1>
            <div className="relative">
                <Button  style={{ border: "2px solid black", height: "60px", borderRadius: "50%", fontSize: "45px", color: "black"}} onClick={handleClickOpen}>
                    +
                </Button>
                <div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                            component: 'form',
                            }}
                        >
                            <DialogTitle>Add Contact</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please enter the name and phone number
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    name="contactName"
                                    label="contactName"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={contact.contactName}
                                    onChange={changeContact}
                                />
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    name="contactNumber"
                                    label="contactNumber"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={contact.contactNumber}
                                    onChange={changeContact}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="button" onClick={addContact}>Save</Button>
                            </DialogActions>
                            <p className="text-red-500">{MessageContactError}</p>
                        </Dialog>
                    </div>
            </div>
        </header>
    )
}
export default SideHeader