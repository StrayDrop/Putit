import React, { Component , useEffect , useState , useRef , componentDidMount } from 'react'
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

// Constructors
// ------------------------------
firebase.initializeApp({
  apiKey: "AIzaSyAPKCgY9Jz82gupg5f-VOcNe06ESwSfDRs",
  authDomain: "putit-182e5.firebaseapp.com"
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

  const [ state, setState ] = useState(
    { isSignedIn: false }
  )

  useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        setState({ isSignedIn: Boolean(user) })
        console.log("user", user)
      })
  },[])

  return (
    <div className="App">
      {state.isSignedIn ?  <ProfileContent/> : <SignInContent uiConfig={uiConfig}/>}
    </div>
  )

}


const ProfileContent = () => (
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

const SignInContent = ({uiConfig}) => (
  <>
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
  </>
)


export default App
