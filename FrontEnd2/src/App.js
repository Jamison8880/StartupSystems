import './App.css';

import React, { useState } from "react";
import axios from 'axios'

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
  async componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );

    
     // this.setState({data:token})
                      }
  // async componentDidMount(){

  // }

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
        
        <h1 style={{textAlign: "center",  color: "Green"}}>Welcome to the Pain Questionaire</h1>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        
    

          <SignedInComponent> </SignedInComponent>

      </div>
    );
  }
}


////HOW DO I GET TOKEN? 
// async componentDidMount() {
//   //const token = await firebase.auth().
//   const token = await firebase.auth().currentUser.getIdToken()

  //currentUser.getIdToken()
//this.setState({data: token})
// }
//----------------------------------------------------------


//----------------------------------------------------------
// II. SIGNED IN COMPONENT
//----------------------------------------------------------
 function SignedInComponent() 
{

   let [Name, SetName ] =  useState(''); // parameter you pass into it is inital value (with empty strings, that is initial value. It returns 2 values: current value of state, and function that you can calll to update value of that state. ) 
  let [Name2, SetName2] = useState(''); 
  let [Name3, SetName3] = useState(''); 

   function handleChange(event) {  
    SetName(event.target.value);
     }
  function handleChange2(event) {  
    SetName2(event.target.value);
    }
  function handleChange3(event) {  
      SetName3(event.target.value);
      }
  
  return (
    <section className = "section">
      <div className = "Container1">
        <h1 style={{color: "Green"}}>Welcome {firebase.auth().currentUser.email}! </h1>
        <p style = {{textAlign: "center"}} > You are now signed-in. Please fill in the questions below</p>
       
      
        <h1 style = {{textAlign: "center"}}  >Pain Questionaire</h1>

        <h3 id="demo" style = {{color: "blue"}}>Question 1: Where is your pain located?</h3>
        <input 
            id = "Pain Location"  
            type="text"
            value={Name}
            onChange={handleChange}
            placeholder="Enter text" />  
      
        <h3 id="demo2" style = {{color: "blue"}}>Question 2: Where does your pain radiate to?</h3>
        <input 
            id = "Radiation Location" 
            type="text"
            value={Name2}
            onChange={handleChange2}
            //onChange= {(event) => SetName2(event.target.value)}
            //for event -look up mozilla documentation to see all sub-variables. 
            placeholder="Enter text" />   
       
        <h3 id="demo3" style = {{color: "blue"}}>Question 3: How Severe is your pain?</h3>
        <input
            id = "Pain Severity" 
            type="text"
            value={Name3}
            onChange={handleChange3}
            placeholder="Enter text" />   

          
<p></p>  

{/* DISPLAY LOCATION OF PAIN ON UI */}
<div style = {{   border: '1px solid black', display: "inline-grid", paddingLeft: '50px', paddingRight: '50px'}}> 
<h1> Summary for Doctor:</h1>

<p> Patient's pain is located on: 
  <span style= {{color:'blue'}}> {Name} </span> <br></br>
  and radiates to:
  <span style= {{color:'blue'}}> {Name2} </span>
  <br></br> 
  Severity is described as: 
  <span style= {{color:'blue'}}> {Name3} </span>  
  </p>
  </div>
<p></p>
<button onClick={() => firebase.auth().signOut()}>Sign-out</button>
<button onClick={() => SubmitData(Name, Name2, Name3)}> Submit My Results</button> 
 
 
     </div>
<div> 
 
<h1 style = {{color: "red"}}> Some Data from the Backend: </h1>
<p> </p>


<button style = {{backgroundColor:"red", color: "white", padding: "15px", fontSize: "1em"  }} onClick={() => GetTheData()}> Click Here for BackEnd Data</button> 

<p>  </p>
</div>




    </section>
  )
}


// {const token = await firebase.auth().currentUser.getIdToken()}
//var LocationOfPain = document.getElementById("demo1").value;

async function SubmitData(Name, Name2, Name3) {
  
  //const token = await firebase.auth().currentUser.getIdToken()
  //console.log(token)

  //alert('Variable is ' +Name );
  //alert('Variable is ' +token ); //only need plus for concatenating var with string. 
  
  
  // TO LOCAL ENVIRONMENT: 
  //axios.post('http://localhost:4000/dev/ReceivingDataFromFrontEnd', 
  //DEPLOYED API: 
  axios.post('https://ea0x278auf.execute-api.us-east-1.amazonaws.com/dev/ReceivingDataFromFrontEnd', 
  {
    PainLoc: Name,
    RadiationLoc: Name2,
    Severity: Name3
  });
  alert('Data Submitted!')
  }

  function GetTheData() {
    axios.get('https://ea0x278auf.execute-api.us-east-1.amazonaws.com/dev/SendingDataToFrontEnd').then(BackEndData => {

    console.log(BackEndData.data);
    //alert(BackEndData.data);
var UserName = BackEndData.data.username
var Paragraph = BackEndData.data.paragraph
var Numbers = BackEndData.data.numbers
alert("Backend.data.username is: " +UserName + "\r\n Backend.data.paragraph is: "   + Paragraph+ "\r\n Backend.data.numbers is: " +Numbers) 
  });
    }






//Submit Function has to get the data. 
//fetch(URL, put/post/ options)
//simplest use of fetch takes in one argument - the path to the resource you want to fetch - and returns a promise containing the response 
//when the button clicks, there should be a string that looks like: 
//  fetch mdn in google.


//----------------------------------------------------------
// III.   OTHER FUNCTIONS: 
//----------------------------------------------------------
// function login() {

//   var userEmail = document.getElementById("email_field").value;
//   var userPass = document.getElementById("password_field").value; 
//   window.alert(userEmail + ' ' + userPass)
  
//   }

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




// I.   LANDING PAGE
//----------------------------------------------------------
// function LandingPage() 
// {
//   return (
    
//     <div id = "Main Page" class = "main-div">
//         <title> LANDING PAGE</title>
//             <h3> Enter your Credentials</h3>
//             <input type = "email" placeholder = "Email..." id = "email_field" />
//             <input type = "password" placeholder = "Password..." id = "password_field"/>
//             <button onclick = "login()"> Login to Account </button>
//     </div>
//   )
// }