import React, { Component , useEffect , useState } from 'react'
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

// Constructors
// ------------------------------
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
})

const App = () => {

	// Data Settings
	// ------------------------------
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  // States
	// ------------------------------
  const [ state, setState ] = useState(
    { isSignedIn: false }
  )

  
  // Effects
  // ------------------------------
  
  useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        setState({ isSignedIn: Boolean(user) })
        console.log("user", user)
      })
  },[])

  // Logics
	// ------------------------------
  const LandingContent = ({ uiConfig, isSignedIn }) => {

    // Components
    // ------------------------------
    const SignInBox = () => (
      <>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </>
    )

    const ProfileBox = () => (
      <>
        <span>
        <div>Signed In!</div>
        <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
        <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
        <img
          alt="profile picture"
          src={firebase.auth().currentUser.photoURL}
        />
        </span>
      </>
    )

    if ( isSignedIn!==true ) { return (<SignInBox />) }
    else { return (<ProfileBox />) }
  }

	// Render
	// ------------------------------
  return (
    <div className="App">
      <LandingContent uiConfig={uiConfig} isSignedIn={state.isSignedIn} />
    </div>
  )

}

export default App
