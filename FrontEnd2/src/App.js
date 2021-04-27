import './App.css';

import React from 'react';


//----------------------------------------------------------
//Following Steps from Canvas: 
// 1.) Importing Firebase into App.js File
//----------------------------------------------------------

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


//----------------------------------------------------------
//2.) Setting up Config: 
// Configure Firebase.
//----------------------------------------------------------

const config = {  
  apiKey: "AIzaSyBM1b1wpI20J2BWg_u2mO7I5WxEo1SA6jo",
  authDomain: "jsfirebaseproject-c8bde.firebaseapp.com",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}
//----------------------------------------------------------
//3.) A State called "Is Signed in" is definted. "
//----------------------------------------------------------

class SignInScreen extends React.Component 
{
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };
  
//----------------------------------------------------------
//4.) uiConfig is used to configure firebaseui
//----------------------------------------------------------
  uiConfig = 
    {
      signInFlow: 'popup',
// 4.1  From Canvas instructions, i've changed this to email/password authentication
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      callbacks:  
        {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => false
        }
    };
 
//----------------------------------------------------------
// 5.) A listener is created that listens for changes in sign in state from Firebase, 
// and updates your React component state with the new value
//----------------------------------------------------------
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
                      }
  
  //5.1  ^^^^You can additionally save that user object in your React component's state so that you can use it later.
  // Not sure what this means?
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
 //----------------------------------------------------------
// 5.)   In the render function, <StyledFirebaseAuth /> is added to the signed in view with 2 props
// Q -What are props? 
//----------------------------------------------------------
  //can't do comments in the render function - because inside render is JSX
  //
render() {
    //variable isSignedIn keeps track of sign in status
    // hit command forward slash inside render to auto command
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.email}! You are now signed-in!</p>
          <SignedInComponent> </SignedInComponent>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}


//----------------------------------------------------------
// I.   LANDING PAGE
//----------------------------------------------------------
function LandingPage() 
{
  return (
    
    <div id = "Main Page" class = "main-div">
        <title> LANDING PAGE</title>
            <h3> Enter your Credentials</h3>
            <input type = "email" placeholder = "Email..." id = "email_field" />
            <input type = "password" placeholder = "Password..." id = "password_field"/>
            <button onclick = "login()"> Login to Account </button>
    </div>
  )
}

//----------------------------------------------------------
// II. SIGNED IN COMPONENT
//----------------------------------------------------------
 function SignedInComponent() 
{
  return (
    <section className = "section">
      <div className = "container has-text-centered">
        Hello Username! You are now signed in. 
        <h1>Questionaire</h1>

        <h3 id="demo">Question 1: Where is your pain located?</h3>
        <input id = "Pain Location" />  
      
        <h3 id="demo">Question 2: Where does your pain radiate to?</h3>
        <input id = "Radiation Location" />  
       
        <h3 id="demo">Question 3: How Severe is your pain?</h3>
        <input id = "Pain Severity" />
<p></p>  
<button> Return</button>
<button> Submit</button>

      </div>
    </section>
  )
}

//----------------------------------------------------------
// III.   OTHER FUNCTIONS: 
//----------------------------------------------------------
function login() {

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value; 
  window.alert(userEmail + ' ' + userPass)
  
  }

export default SignInScreen;
//export default SignedInComponent



//----------------------------------------------------------
// I.   END 
//----------------------------------------------------------


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
const firebaseConfig = {
  apiKey: "AIzaSyBM1b1wpI20J2BWg_u2mO7I5WxEo1SA6jo",
  authDomain: "jsfirebaseproject-c8bde.firebaseapp.com",
  databaseURL: "https://jsfirebaseproject-c8bde-default-rtdb.firebaseio.com",
  projectId: "jsfirebaseproject-c8bde",
  storageBucket: "jsfirebaseproject-c8bde.appspot.com",
  messagingSenderId: "381754669941",
  appId: "1:381754669941:web:9d748993adba847036313c",
  measurementId: "G-RVGM15FDPY"
};

*/

/*
 function App() 
{
  return (
    
    // Why can't this go here? <button > change what's displayed</button>
//what is a section for? 
    <section className = "section"> 
      <div className = "container has-text-centered">

        <h1 className = "title"> Functions created in App.JS  Displayed here</h1>
        <div className = "subtitle">subtitle goes here - why is this in a div?? </div>
        
        <button>Sign in</button>
        </div>
    </section>
  );
}

*/
