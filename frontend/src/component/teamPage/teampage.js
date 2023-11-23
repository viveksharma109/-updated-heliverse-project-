import React from "react";
import axios from "axios";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Card, CardContent } from '@mui/material';

import { useNavigate } from 'react-router-dom';


const host_url = process.env.REACT_APP_HOST_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

function Teampage() {

    const navigate = useNavigate();
    const [Teams, SetTeams] = React.useState([]); // FOR TEAM 
    const [SearhTeamName, setSearchName] = React.useState(""); // FOR TEAM SEARCH

    // SNACKBAR STATE
    const [errorstate, setErrorState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
  
    // TEAMS
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${host_url}teams`);
                console.log("check 3");
                console.log(response.data);
                SetTeams(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    // SEARCH TEAM 
    const handleInputSearch = (e) => {
        const { name, value } = e.target;
        console.log(name, ": ", value);
        switch (name) {
            case "searchTeam":
                setSearchName(value);
                break;
            default:
                console.log("Invalid input name");
        }
    }
    const handleSearchButton = async () => {
        try {
            const teamName = SearhTeamName;
            const response = await axios.get(`${host_url}team/${teamName}`);
            const foundTeam = response.data;
            if (foundTeam) {
                if (foundTeam.error) {
                    console.log('Error:', foundTeam.error);
                } else {
                    SetTeams([foundTeam.data]);
                    setSearchName("");
                }
            } else {
                console.log('Team not found');
              
            }
        } catch (error) {
            console.error('Error while finding:', error);
            setErrorState({
                open: true,
                vertical: 'top',
                horizontal: 'center',
            });
            setTimeout(() => {
                setErrorState({
                    ...errorstate,
                    open: false,
                });
            }, 2000);
            setSearchName("");
        }
    }

    // PAGE NAVIGATE
    const handleUserPage = () => {
        navigate('/');
    }

    return (
        <>    {/* FOR User Page*/}
            <Grid sx={{ textAlign: 'left', my: 2 }} xs={12}>
                <Button onClick={handleUserPage} sx={{ m: 1 }} variant="outlined" size="medium" >User page</Button>
            </Grid>

            <Grid sx={{ textAlign: 'center', my: 2 }} xs={12}>
                <h1> Team Page </h1>
            </Grid>

             {/* FOR Team Search*/}
            <Grid>
                <input onChange={handleInputSearch} value={SearhTeamName} type="text" placeholder="Search Team" name="searchTeam" style={{ textAlign: "left", marginRight: "1rem", height: "26px", marginLeft: "8px" }} />
                <Button onClick={handleSearchButton} variant="outlined">Search Team</Button>
            </Grid>

            <Grid sx={{ background: 'lightgrey', px: 1 }} xs={12}>
                <h2>All Teams</h2>
            </Grid>

            {/* FOR Team Data*/}
            <Grid container spacing={2} sx={{ marginLeft: "10px" }}>
                {Teams.map((team, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                        {team && (
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Team Name: {team.teamName}
                                    </Typography>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                            <thead>
                                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Member Name</th>
                                                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Member ID</th>
                                                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Member domain</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {team.members.map((member, memberIndex) => (
                                                    <tr key={memberIndex} style={{ backgroundColor: memberIndex % 2 === 0 ? '#f9f9f9' : 'white' }}>
                                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{`${member.fname} ${member.lname}`}</td>
                                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{member.id}</td>
                                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{member.domain}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                ))}
            </Grid>

            {/* FOR Team not found*/}
            <Snackbar
                anchorOrigin={{ vertical: errorstate.vertical, horizontal: errorstate.horizontal }}
                open={errorstate.open}
                message="Team not found"
                key={errorstate.vertical + errorstate.horizontal}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                   Team not Exist
                </Alert>
            </Snackbar>
        </>
    )
}

export default Teampage;