import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state, setState] = React.useState("Sign up");
  const [formData, setFormData] = React.useState({username: "", password: "", email: ""});

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  

  const login = async () => {
    console.log("Login function executed", formData)
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)      
    }).then((response) => response.json()).then((data) => responseData = data)
    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token)   
      window.location.replace("/");   
    }
    else{
      alert(responseData.errors)
    }
    
  }
    
  

  const signup = async () => {
    console.log("Signup function executed", formData)
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)      
    }).then((response) => response.json()).then((data) => responseData = data)
    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token)   
      window.location.replace("/");   
    }
    else{
      alert(responseData.errors)
    }
    
  }



  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign up" ?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email' />
          <input name='password' value={formData.password} onChange={changeHandler} className='loginsignup-password' type="password" placeholder='Password' />
        </div>
        <button onClick={state==="Sign up" ? signup : login}>Continue</button>
        {state === "Sign up" ? <p className="loginsignup-login">Already have an account? <span onClick={() => setState("Login")}>Log in</span></p>
        :<p className="loginsignup-login">Create an account? <span onClick={() => setState("Sign up")}>Click here</span></p>}       
        
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></p>
        </div>
      </div>      
    </div>
  )
}

export default LoginSignup
