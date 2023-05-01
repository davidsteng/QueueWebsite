import React, { useEffect } from 'react'
import { app } from './firebase-config';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './components/Common/Button';
import { useState } from 'react';
import {db} from './firebase-config'
import { doc, setDoc, getDoc } from "firebase/firestore";
export default function Home({setID, setCode, setTA, setValid, handleAction}) {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        console.log(authToken)
        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/register')
        }
    }, [])
    return (
        <div>
            <div className="heading-container">
                <h3>
                    Course Form
                </h3>
            </div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="ValidationID"
                    label="Enter Token"
                    variant="outlined"
                    onChange={(e) => setValid(e.target.value)}
                />
                <TextField
                    id="CourseID"
                    label="Enter the Course Number"
                    variant="outlined"
                    onChange={(e) => setID(e.target.value)}
                />
                <TextField
                    id="courseCode"
                    label="Enter Course Join Code"
                    variant="outlined"
                    onChange={(e) => setCode(e.target.value)}
                />
                <TextField
                    id="TACode"
                    label="Enter TA Join Code"
                    variant="outlined"
                    onChange={(e) => setTA(e.target.value)}
                />
            </Box>

            <Button title="Submit" handleAction={handleAction}/>
            <Button title = "Log Out" handleAction={handleLogout}/>
        </div>
    )
}