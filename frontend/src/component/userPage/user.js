import React from "react";
import axios from "axios";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Card, CardContent } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Container, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const host_url = process.env.REACT_APP_HOST_URL;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function UserPage() {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);//  FOR CREATE USER
    const [openupdate, setopenUpdate] = React.useState(false); // FOR UPDATE USER

    // STATES FOR USER CREATE
    const [userId, setUserId] = React.useState("");
    const [firstname, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [avatar, setAvatar] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [domain, setDomain] = React.useState("");
    const [available, setAvailabele] = React.useState("");

    // STATES FOR USER UPDATE
    const [updateuserId, setUpdateUserId] = React.useState("");
    const [updateFirstname, setUpdateFirstName] = React.useState("");
    const [updateLastname, setUpdateLastName] = React.useState("");
    const [updateEmail, setUpdateEmail] = React.useState("");
    const [updateAvatar, setUpdateAvatar] = React.useState("");
    const [updateGender, setUpdateGender] = React.useState("");
    const [updatedomain, setUpdateDomain] = React.useState("");
    const [updateAvailable, setUpdateAvailabele] = React.useState("");

    const [IdForDelete, setIdForDelete] = React.useState(""); // ID WANT TO DELETE
    const [userfullname, setUserfind] = React.useState("");// ID FOR FIND
    const [openDelete, setopenDelete] = React.useState(false); // I

    const [domains, setDomains] = React.useState([]); // GET ALL THE DOMAINS VALUE

    //STATES FOR POPUPS
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [stateUpdate, setUpdateState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [errorstate, setErrorState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [maxLimitState, setMaxLimitState] = React.useState(
        {
            open: false,
            vertical: 'top',
            horizontal: 'center',
        }
    );
    const [succesState, setSuccesState] = React.useState(
        {
            open: false,
            vertical: 'top',
            horizontal: 'center',
        }
    );
    const [TeamState, setTeamState] = React.useState(
        {
            open: false,
            vertical: 'top',
            horizontal: 'center',
        }
    );

    const [searchQuery, setSearchQuery] = React.useState('');
    const [users, setUsers] = React.useState([]); // GET ALL USERS IN BUCKET

    const filteredUserss = users.filter(({ first_name, last_name }) => {
        const fullName = `${first_name.toLowerCase()} ${last_name.toLowerCase().replace(/\s/g, '')}`;
        const queryFirst = searchQuery.trim().toLowerCase();
        return (
            first_name.toLowerCase().includes(queryFirst) ||
            last_name.toLowerCase().includes(queryFirst) ||
            fullName.includes(queryFirst) ||
            last_name.toLowerCase().startsWith(queryFirst)
        );
    });



    // PAGINATION
    const [currentPage, setCurrentPage] = React.useState(1);
    const usersPerPage = 20;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUserss.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (event, value) => {
        setCurrentPage(value);
    };

    // FOR CREATE OPEN
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // FOR DELETE OPEN
    const handleDeleteOpen = () => setopenDelete(true);
    const handledeleteClose = () => setopenDelete(false);

    //FOR UPDATE OPEN
    const handleUpdateOpen = () => setopenUpdate(true);
    const handleUpdateClose = () => setopenUpdate(false);

    const [openTeam, setOpenTeam] = React.useState(false);
    const handleOpenTeam = () => setOpenTeam(true);
    const handleCloseTeam = () => setOpenTeam(false);

    const [selectedDomain, setSelectedDomain] = React.useState('');// STATE FOR DOMAINS
    const [selectedGender, setSelectedGender] = React.useState(''); // FOR GENDER FILTER
    const [selectedAvailability, setSelectedAvailability] = React.useState(''); // FOR AVAILABLE FILTER

    // ADD MEMBER
    const [TeamMembers, setTeamMembers] = React.useState([]);
    const [TeamMembersDomains, setTeamMembersDomains] = React.useState({});
    const [teamName, setTeamName] = React.useState("");

    // const [first_name, setFirstNameSearch] = React.useState(''); // Example state for first_name

    // const [fcurrentUsers, setCurrentUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = React.useState([]);


    // GET ALL THE USERS
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${host_url}users`);
                console.log("check 1");
                console.log(response.data);
                console.log("chek 1.1");
                setUsers(response.data);
                // console.log(response.data.data[1].first_name)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // GET DOMAINS
    React.useEffect(() => {
        console.log("helloi")
        const fetchData = async () => {
            try {
                const response = await axios.get(`${host_url}domains`);
                setDomains(response.data.data);
                console.log(response.data.data)


            } catch (error) {
                console.error('Error fetching domains data:', error);
            }
        };
        fetchData();
    }, []);

    // CREATE USERS
    const HandleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, ": ", value);
        switch (name) {
            case "id":
                setUserId(value);
                break;
            case "firstname":
                setFirstName(value);
                break;
            case "lastname":
                setLastName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "Gender":
                setGender(value);
                break;
            case "Avatar":
                setAvatar(value);
                break;
            case "domain":
                setDomain(value);
                break;
            case "Available":
                setAvailabele(value);
                break;
            default:
                console.log("Invalid input name");
        }
    }

    const handleCreateUser = async () => {
        const Userdata = {
            Id: userId,
            FirstName: firstname,
            LastName: lastname,
            Email: email,
            Gender: gender,
            Avatar: avatar,
            Domain: domain,
            Available: available,
        }
        console.log(Userdata);
        const response = await axios.post(`${host_url}users`, Userdata);
        console.log(response);
        setUserId("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setGender("");
        setAvatar("");
        setDomain("");
        setAvailabele("");
        setState({
            open: true,
            vertical: 'top',
            horizontal: 'right',
        });
        setTimeout(() => {
            setState({
                ...state,
                open: false,
            });
        }, 2000);

    };

    // DELETE USER
    const handleDeleteUser = async () => {
        try {
            const userId = IdForDelete;
            const response = await axios.delete(`${host_url}users/${userId}`);
            console.log(response.data.message);
            if (response.status === 200) {
                const taskIndexToDelete = users.findIndex(user => user.id === userId);
                if (taskIndexToDelete !== -1) {
                    const updatedUserData = [...users];
                    updatedUserData.splice(taskIndexToDelete, 1);
                    setUsers(updatedUserData);
                    console.log("User deleted successfully");
                } else {
                    console.log("User not found in local state");
                }
            } else {
                console.log(`Request failed with status code ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        handledeleteClose();
    };
    const DeleteUser = (taskForDelete) => {
        setIdForDelete(taskForDelete);
        handleDeleteOpen();
    }


    const HandleFindUser = (e) => {
        const searchQuery = e.target.value;
        setSearchQuery(searchQuery);
        setCurrentPage(1);
    };
    const HandleFindUserfunc = (searchQuery, users) => {
        const lowercaseQuery = searchQuery.toLowerCase();
        const filteredUsers = users.filter(({ first_name, last_name }) => {
            const fullName = `${first_name.toLowerCase()} ${last_name.toLowerCase().replace(/\s/g, '')}`;
            const queryFirst = lowercaseQuery.trim().toLowerCase();
            return (
                first_name.toLowerCase().includes(queryFirst) ||
                last_name.toLowerCase().includes(queryFirst) ||
                fullName.includes(lowercaseQuery) ||
                last_name.toLowerCase().startsWith(queryFirst)

            );
        });
        return filteredUsers;
    };
    const filtered = HandleFindUserfunc(searchQuery, users);

    // UPDATE USER
    const HandleUpdateChange = (e) => {
        const { name, value } = e.target;
        console.log(name, ": ", value);
        switch (name) {
            case "idforUpdate":
                setUpdateUserId(value);
                break;
            case "firstnameforUpdate":
                setUpdateFirstName(value);
                break;
            case "lastnameforUpdate":
                setUpdateLastName(value);
                break;
            case "emailforUpdate":
                setUpdateEmail(value);
                break;
            case "GenderforUpdate":
                setUpdateGender(value);
                break;
            case "AvatarforUpdate":
                setUpdateAvatar(value);
                break;
            case "domainforUpdate":
                setUpdateDomain(value);
                break;
            case "AvailableforUpdate":
                setUpdateAvailabele(value);
                break;
            default:
                console.log("Invalid input name");
        }
    }

    const handleupdateUser = async () => {
        try {
            const putData = {
                FirstName: updateFirstname,
                LastName: updateLastname,
                Email: updateEmail,
                Gender: updateGender,
                Avatar: updateAvatar,
                Domain: updatedomain,
                Available: updateAvailable,
            };

            const response = await axios.put(`${host_url}users/${updateuserId}`, putData);
            console.log(response.data.message);

            if (response.status === 200) {
                const updatedUserData = response.data.data;
                const updatedUserIndex = users.findIndex(user => user.id === updateuserId);

                if (updatedUserIndex !== -1) {
                    const updatedUsers = [...users];
                    updatedUsers[updatedUserIndex] = updatedUserData;
                    setUsers(updatedUsers);
                }

                setUpdateUserId('');
                setUpdateFirstName('');
                setUpdateLastName('');
                setUpdateEmail('');
                setUpdateGender('');
                setUpdateAvatar('');
                setUpdateDomain('');
                setUpdateAvailabele('');
                setUpdateState({
                    open: true,
                    vertical: 'top',
                    horizontal: 'right',
                });
                setTimeout(() => {
                    setUpdateState({
                        ...stateUpdate,
                        open: false,
                    });
                }, 2000);
            } else {
                console.log('Update failed');
            }
        } catch (error) {
            console.error('Error while updating:', error);
        }
    };

    // DATA SHOW BEFORE UPDATE
    const UpdateUser = (id, fname, lname, gender, domain, available, email, avatar) => {
        setUpdateUserId(id);
        setUpdateFirstName(fname);
        setUpdateLastName(lname);
        setUpdateEmail(email);
        setUpdateGender(gender);
        setUpdateAvatar(avatar);
        setUpdateDomain(domain);
        setUpdateAvailabele(available);
        handleUpdateOpen();
    }

    // VARIOUS FILTERS
    const handleInputsChange = async (e) => {
        const { name, value } = e.target;
        try {
            const params = [];
            let url = `${host_url}gender/`;

            if (name === "gender") {
                setSelectedGender(value);
                params.push(`gender=${value}`);
            } else {
                params.push(`gender=${selectedGender}`);
            }
            if (name === "domain") {
                setSelectedDomain(value);
                params.push(`domain=${value}`);
            } else {
                params.push(`domain=${selectedDomain}`);
            }
            if (name === "availability") {
                setSelectedAvailability(value);
                params.push(`available=${value}`);
            } else {
                params.push(`available=${selectedAvailability}`);
            }
            if (params.length > 0) {
                url += `?${params.join('&')}`;
            }
            console.log({ url });
            const response = await axios.get(url);
            console.log(response);
            const foundUsers = response.data.data;

            if (foundUsers && foundUsers.length > 0) {
                setUsers(foundUsers);
                setUserfind("");
            } else {
                console.log('No users found');
            }


        } catch (error) {
            console.error('Error while fetching users:', error);
        }
    };


    // ADD MEMBER IN TEAM
    const AddMemberUser = (id, fname, lname, gender, domain, available, email, avatar) => {
        console.log("CHeck for team members 1", domain, !TeamMembersDomains[domain], available);
        if (!TeamMembersDomains[domain] && available) {
            console.log("Check for team member 2");
            setTeamMembers(prev => [...prev, {
                id,
                fname,
                lname,
                gender,
                domain,
                available,
                email,
                avatar
            }]);
            setTeamMembersDomains(prev => ({ ...prev, [domain]: true }));
            // snackbar for success.
            setSuccesState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
            });
            setTimeout(() => {
                setSuccesState({
                    ...succesState,
                    open: false,
                });
            }, 3000);
        }
        else if (!available) {
            // snackbar for not available.
            setErrorState({
                open: true,
                vertical: 'center',
                horizontal: 'center',
            });
            setTimeout(() => {
                setErrorState({
                    ...errorstate,
                    open: false,
                });
            }, 2000);

        }
        else {
            setMaxLimitState({
                open: true,
                vertical: 'center',
                horizontal: 'center',
            });
            setTimeout(() => {
                setMaxLimitState({
                    ...maxLimitState,
                    open: false,
                });
            }, 2000);
            // snackbar for duplicate domain.(team member with the domain name already exist)
        }
    }
    const HandleCreateTeamInput = (e) => {
        const { name, value } = e.target;
        console.log(name, ": ", value);
        switch (name) {
            case "TeamName":
                setTeamName(value);
                break;
            default:
                console.log("Invalid input name");
        }
    }
    const handleTeamClick = async () => {
        try {
            const data = {
                TeamName: teamName,
                MembersArray: TeamMembers
            }
            console.log(data);
            const response = await axios.post(`${host_url}team`, data);
            console.log(response.data)
            setTeamName("");
            setTeamMembers([]);
            console.log("latest")
            setTeamState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
            });
            setTimeout(() => {
                setTeamState({
                    ...TeamState,
                    open: false,
                });
            }, 2000);
            handleCloseTeam();
        } catch (error) {
            console.error('Error while Creating Team:', error);
        }
    }

    // NAVIGATE TO TEAM PAGE
    const handleTeamPage = () => {
        navigate('/Teampage');
    }

    return (
        <>
            <Grid container item xs={16} justifyContent="space-between">
                <Item style={{ boxShadow: "none", textAlign: "left" }}>
                    <Button onClick={handleOpen} variant="contained" endIcon={<SendIcon />} style={{ margin: "15px" }}>Create User</Button>
                </Item>
                <Item style={{ boxShadow: "none", textAlign: "right" }}>
                    <Button onClick={handleTeamPage} sx={{ mt: 3 }} variant="contained" color="success">Team Page</Button>
                </Item>
            </Grid>         

            <Grid container spacing={2} columns={16}>
                <Grid item xs={16}>
                    <Item style={{ boxShadow: "none", textAlign: "left" }}>
                        <input onChange={HandleFindUser} value={searchQuery} id="userfullname" type="text" placeholder="Search user" name="userfullname" role="search" style={{ textAlign: "left",width: "200px", marginRight: "1rem", height: "26px", marginTop: "19px", marginLeft: "15px" }} />
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Domain</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={selectedDomain}
                                label="Domain"
                                onChange={handleInputsChange}
                                sx={{ height: '50px', padding: '0' }}
                                name="domain"
                            >
                                <MenuItem value="">All</MenuItem>
                                {domains.length > 0 && domains.map((domain) => (
                                    <MenuItem key={domain} value={domain}>
                                        {domain}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={selectedGender}
                                label="Gender"
                                onChange={handleInputsChange}
                                sx={{ height: '50px', padding: "0" }}
                                name="gender"
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Bigender">Bigender</MenuItem>
                                <MenuItem value="Agender">Agender</MenuItem>
                                <MenuItem value="Polygender">Polygender</MenuItem>
                                <MenuItem value="Non-binary">Non-binary</MenuItem>

                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Availability</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={selectedAvailability}
                                label="availability"
                                onChange={handleInputsChange}
                                sx={{ height: '50px', padding: "0" }}
                                name="availability"
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="yes">Available</MenuItem>
                                <MenuItem value="no">Not Available</MenuItem>
                            </Select>
                        </FormControl>
                    </Item>
                </Grid>
            </Grid>





            {/* MEMBER SELECTED FOR ADD*/}
            <Container style={{ marginTop: TeamMembers.length ? "2rem" : "none", border: TeamMembers.length ? "1px solid #ccc" : "none", padding: TeamMembers.length ? "20px" : "none" }}>
                <Item style={{ boxShadow: "none", textAlign: "center", marginBottom: TeamMembers.length ? "8px" : "none" }}>
                    {
                        TeamMembers.length ?
                            <Button onClick={handleOpenTeam} variant="contained" style={{ marginLeft: "25px" }}>Create Team</Button>
                            :
                            null
                    }
                </Item>
                <Grid container spacing={2}>
                    {TeamMembers.map((user, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            {user && (
                                <Card variant="outlined" style={{ marginBottom: '10px' }}>
                                    <CardContent>
                                        <Typography variant="body1">
                                            <img src={user.avatar} alt="User Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                        </Typography>
                                        <Typography variant="h6">Name: {user.fname} {user.lname}</Typography>
                                        <Typography variant="body1">Id: {user.id}</Typography>
                                        <Typography variant="body1">Gender: {user.gender}</Typography>
                                        <Typography variant="body1">Domain: {user.domain}</Typography>
                                        <Typography variant="body1"> Available: {user.available ? 'Yes' : 'No'}</Typography>
                                        <Typography variant="body1">Email: {user.email}</Typography>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <hr></hr>

            <Container style={{ marginTop: "2rem" }}>
                <Grid container spacing={2}>
                    {
                        currentUsers.map((user, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                {user && (
                                    <Card variant="outlined" style={{ marginBottom: '10px' }}>
                                        <CardContent>
                                            <Typography variant="body1">
                                                <img src={user.avatar} alt="User Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                            </Typography>
                                            <Typography variant="h6">Name: {user.first_name} {user.last_name}</Typography>
                                            <Typography variant="body1">Id: {user.id}</Typography>
                                            <Typography variant="body1">Gender: {user.gender}</Typography>
                                            <Typography variant="body1">Domain: {user.domain}</Typography>
                                            <Typography variant="body1"> Available: {user.available ? 'Yes' : 'No'}</Typography>
                                            <Typography variant="body1">Email: {user.email}</Typography>
                                            <Button onClick={() => DeleteUser(user?.id,)} size="small" variant="outlined" style={{ marginRight: "8px" }}>delete</Button>
                                            <Button onClick={() => UpdateUser(user?.id, user?.first_name, user?.last_name, user?.gender, user?.domain, user?.available, user?.email, user?.avatar)} size="small" variant="contained" >update</Button>
                                            <Button onClick={() => AddMemberUser(user?.id, user?.first_name, user?.last_name, user?.gender, user?.domain, user?.available, user?.email, user?.avatar)} size="small" variant="contained" sx={{ m: 1 }} >Add In team</Button>
                                        </CardContent>
                                    </Card>
                                )}
                            </Grid>
                        ))
                    }
                </Grid>
                <Pagination
                    count={Math.ceil((users.length) / usersPerPage)}
                    page={currentPage}
                    onChange={paginate}
                    style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                />
            </Container>


            {/* MODAL FOR CREATE USER*/}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography sx={{ p: 2, textAlign: 'center' }} id="modal-modal-title" variant="h5" component="h2">
                                create user
                            </Typography>
                            <Typography gutterBottom>
                                <label for="id" style={{ fontFamily: "serif", margin: "34px" }}>Id</label>
                                <input onChange={HandleInputChange} type="number" placeholder="Id" name="id" value={userId} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="name" style={{ fontFamily: "serif", margin: "7px" }}>FirstName</label>
                                <input onChange={HandleInputChange} type="text" placeholder="firstname" name="firstname" value={firstname} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="description" style={{ fontFamily: "serif", margin: "7px" }}>LastName</label>
                                <input onChange={HandleInputChange} type="text" placeholder="lastname" name="lastname" value={lastname} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="price" style={{ fontFamily: "serif", margin: "20px" }}>Email</label>
                                <input onChange={HandleInputChange} type="email" placeholder="email" name="email" value={email} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="quantity" style={{ fontFamily: "serif", margin: "16px" }}>Gender</label>
                                <input onChange={HandleInputChange} type="text" placeholder="gender" name="Gender" value={gender} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="category" style={{ fontFamily: "serif", margin: "18px" }}>Avatar</label>
                                <input onChange={HandleInputChange} type="text" placeholder="avatar" name="Avatar" value={avatar} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="category" style={{ fontFamily: "serif", margin: "14px" }}>Domain</label>
                                <input onChange={HandleInputChange} type="text" placeholder="Domain" name="domain" value={domain} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="category" style={{ fontFamily: "serif", margin: "10px" }}>Available</label>
                                <input onChange={HandleInputChange} type="text" placeholder="available" name="Available" value={available} />
                            </Typography>
                        </div>
                        <Grid xs={12} sx={{ display: 'flex', justifyContent: "space-between", marginTop: "8px" }}>
                            <Button onClick={handleClose} variant="contained" color="error">cancel</Button>
                            <Button onClick={handleCreateUser} variant="contained" color="success">create</Button>
                        </Grid>

                    </Box>
                </Modal>
            </div>
            <Box>

                {/* MODAL AREA FOR DELETE*/}
                <Modal
                    open={openDelete}
                    onClose={handledeleteClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography sx={{ p: 2, textAlign: 'center' }} id="modal-modal-title" variant="h5" component="h2">
                            Are you sure ?
                        </Typography>
                        <Grid xs={12} sx={{ display: 'flex', justifyContent: "space-between" }}>
                            <Button onClick={handledeleteClose} variant="contained" color="error" style={{ margin: '10px' }}>cancel</Button>
                            <Button onClick={handleDeleteUser} variant="contained" color="success" style={{ margin: '10px' }}>Delete</Button>
                        </Grid>
                    </Box>
                </Modal>

                {/* MODAL AREA FOR UPDATE*/}
                <Modal
                    open={openupdate}
                    onClose={handleUpdateClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography sx={{ p: 2, textAlign: 'center' }} id="modal-modal-title" variant="h5" component="h2">
                                Update user
                            </Typography>
                            <Typography gutterBottom>
                                <label for="id" style={{ fontFamily: "serif", margin: "34px" }}>Id</label>
                                <input onChange={HandleUpdateChange} type="number" placeholder="Id" name="idforUpdate" value={updateuserId} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="name" style={{ fontFamily: "serif", margin: "7px" }}>FirstName</label>
                                <input onChange={HandleUpdateChange} type="text" placeholder="firstname" name="firstnameforUpdate" value={updateFirstname} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="description" style={{ fontFamily: "serif", margin: "7px" }}>LastName</label>
                                <input onChange={HandleUpdateChange} type="text" placeholder="lastname" name="lastnameforUpdate" value={updateLastname} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="price" style={{ fontFamily: "serif", margin: "20px" }}>Email</label>
                                <input onChange={HandleUpdateChange} type="email" placeholder="email" name="emailforUpdate" value={updateEmail} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="quantity" style={{ fontFamily: "serif", margin: "16px" }}>Gender</label>
                                <input onChange={HandleUpdateChange} type="text" placeholder="gender" name="GenderforUpdate" value={updateGender} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="category" style={{ fontFamily: "serif", margin: "18px" }}>Avatar</label>
                                <input onChange={HandleUpdateChange} type="text" placeholder="avatar" name="AvatarforUpdate" value={updateAvatar} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="category" style={{ fontFamily: "serif", margin: "14px" }}>Domain</label>
                                <input onChange={HandleUpdateChange} type="text" placeholder="Domain" name="domainforUpdate" value={updatedomain} />
                            </Typography>
                            <Typography gutterBottom>
                                <label for="category" style={{ fontFamily: "serif", margin: "10px" }}>Available</label>
                                <input onChange={HandleUpdateChange} type="text" placeholder="available" name="AvailableforUpdate" value={updateAvailable} />
                            </Typography>
                        </div>
                        <Grid xs={12} sx={{ display: 'flex', justifyContent: "space-between", marginTop: "8px" }}>
                            <Button onClick={handleUpdateClose} variant="contained" color="error">cancel</Button>
                            <Button onClick={handleupdateUser} variant="contained" color="success">update</Button>
                        </Grid>

                    </Box>
                </Modal>

                {/* FOR CREATE TEAM*/}
                <div>
                    <Modal
                        open={openTeam}
                        onClose={handleCloseTeam}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography sx={{ p: 2, textAlign: 'center' }} id="modal-modal-title" variant="h5" component="h2">
                                    create Team
                                </Typography>
                                <Typography gutterBottom>
                                    <label for="id" style={{ fontFamily: "serif", marginLeft: "12px", marginRight: "5px" }}>Team Name</label>
                                    <input onChange={HandleCreateTeamInput} type="text" placeholder="Team name" name="TeamName" />
                                </Typography>
                            </div>
                            <Grid xs={12} sx={{ display: 'flex', justifyContent: "space-between", marginTop: "8px" }}>
                                <Button onClick={handleCloseTeam} variant="contained" color="error">cancel</Button>
                                <Button onClick={handleTeamClick} variant="contained" color="success">create Team</Button>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                {/* FOR USER CREATE*/}
                <Snackbar
                    anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
                    open={state.open}
                    message="Added"
                    key={state.vertical + state.horizontal}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        User  is Created
                    </Alert>
                </Snackbar>

                {/* FOR USER UPDATE*/}
                <Snackbar
                    anchorOrigin={{ vertical: stateUpdate.vertical, horizontal: stateUpdate.horizontal }}
                    open={stateUpdate.open}
                    onClose={() => setUpdateState({ ...stateUpdate, open: false })}
                    key={stateUpdate.vertical + stateUpdate.horizontal}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        User is updated
                    </Alert>
                </Snackbar>

                {/*  Member Added*/}
                <Snackbar
                    anchorOrigin={{ vertical: succesState.vertical, horizontal: succesState.horizontal }}
                    open={succesState.open}
                    message=" Member Added"
                    key={succesState.vertical + succesState.horizontal}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Member Added
                    </Alert>
                </Snackbar>

                {/*   Not available*/}
                <Snackbar
                    anchorOrigin={{ vertical: errorstate.vertical, horizontal: errorstate.horizontal }}
                    open={errorstate.open}
                    message="Not available"
                    key={errorstate.vertical + errorstate.horizontal}
                >
                    <Alert severity="info" sx={{ width: '100%' }}>
                        Not available
                    </Alert>
                </Snackbar>

                {/*     Member Already Exist*/}
                <Snackbar
                    anchorOrigin={{ vertical: maxLimitState.vertical, horizontal: maxLimitState.horizontal }}
                    open={maxLimitState.open}
                    message="Member Already Exist"
                    key={maxLimitState.vertical + maxLimitState.horizontal}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Member Already Exist
                    </Alert>
                </Snackbar>

                {/*FOR TEAM CREATED*/}
                <Snackbar
                    anchorOrigin={{ vertical: TeamState.vertical, horizontal: TeamState.horizontal }}
                    open={TeamState.open}
                    message="Member Already Exist"
                    key={TeamState.vertical + TeamState.horizontal}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Team is created
                    </Alert>
                </Snackbar>

            </Box>
        </>
    )
};


export default UserPage;