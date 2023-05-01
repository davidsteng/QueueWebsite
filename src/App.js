import { useState } from 'react';
import './App.css';
import Form from './components/Common/Form';
import Home from './Home';
import React, { useEffect } from 'react'
import {db} from './firebase-config'
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState('');
  const [TA, setTA] = useState('');
  const [code, setCode] = useState('');
  const [id, setID] = useState('');
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
    }
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
    }
  }
  window.onload = function() {
    navigate('/login')
  }
  const handleSubmit = async () => {
        console.log("Working?")
        const codeCheck = doc(db, "codeAccess", "UserCodes");
        const checkSnap = await getDoc(codeCheck);
        if (checkSnap.exists()) {
            let Codes = checkSnap.data()["Codes"]
            if(Codes.includes(valid)) {
                const index = Codes.indexOf(valid)
                Codes.splice(index, 1)
                await setDoc(codeCheck, {Codes})
                const codeListRef = doc(db, "Courses", "CodeList");
                const docSnap = await getDoc(codeListRef);
                if (docSnap.exists()) {
                  console.log("Document data:", docSnap.data());
                  let CourseMap = docSnap.data()["CourseMap"]
                  CourseMap[code] = id
                  await setDoc(codeListRef, {CourseMap});
                } else {
                  // docSnap.data() will be undefined in this case
                }
                const taListRef = doc(db, "Courses", "TACodeList");
                const docSnapTA = await getDoc(taListRef);
                if (docSnapTA.exists()) {
                  console.log("Document data:", docSnapTA.data());
                  let TAMap = docSnapTA.data()["TAMap"]
                  TAMap[TA] = id
                  await setDoc(taListRef, {TAMap});
                } else {
                  // docSnap.data() will be undefined in this case
                }
                const addCourseRef = doc(db, "Courses", id);
                await setDoc(addCourseRef, {
                    AverageTimeWait: 0,
                    CourseID: id,
                    CourseQueue: {},
                    CourseReasonQueue: {},
                    QueueOnJoin: {},
                    TAList: {},
                    TimeWaitCalc: {},
                    totalQueueSize: 0,
                    totalWaitTime: 0
                    });
                console.log("Success")
                window.alert("Course Added Successfully")
            } else {
              console.log("Invalid code")
              window.alert("Invalid Token")
            }
        } else {
          // checkSnap.data() will be undefined in this case
          window.alert("Error Please Contact Team for Support")
        }
            
  }
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }
  }, [])
  return (
    <div className="App">
      <>
        <Routes>
          <Route
            path='/login'
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}
              />}
          />
          <Route
            path='/register'
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)}
              />}
          />
          <Route
            path='/home'
            element={
              <Home
               setID={setID}
               setCode={setCode}
               setTA={setTA}
               setValid={setValid}
               handleAction={() => handleSubmit()}
              />}
          />
        </Routes>
      </>
    </div>
  );
}

export default App;