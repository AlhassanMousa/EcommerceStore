import { Link } from "react-router-dom";
import React,{ useState } from 'react';
import { auth,fs } from '../Config/Config';
 import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    const handleSignup=(e)=>{
        e.preventDefault();
       auth.createUserWithEmailAndPassword(email,password).then((Credentials) => {
         console.log(Credentials);
       fs.collection('users').doc(Credentials.user.uid).set({
           FullName: fullName,
           Email:email,
           Password:password
       }).then(() => {
           setSuccessMsg('Signup successfull, you will now get automatically redirected to login')  
           setFullname('');
           setEmail('');
           setPassword('');
           setErrorMsg('');
           setTimeout(() =>{
               setSuccessMsg('');
               navigate('/Login');
           },3000)
        }).catch(error => setErrorMsg(error.message));
        }).catch((error)=>{
           setErrorMsg(error.message)
       })
  }

    return (
        <div className='container'>
          <br />
          <br />    
          <h1>sign up</h1>
          <hr></hr>
          {successMsg&&<>
         <div className='success-msg'>{successMsg}</div>
          <br />
          </>}
          <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
              <label>Full Name</label>
              <input type="text" className='form-control' required onChange={(e)=>setFullname(e.target.value)} value={(fullName)}></input>
              <br />
              <label>Email</label>
              <input type="email" className='form-control' required onChange={(e)=>setEmail(e.target.value)} value={(email)}></input>
              <br />
              <label>Password</label>
              <input type="password" className='form-control' required onChange={(e)=>setPassword(e.target.value)} value={(password)}></input>
              <br />
              <div className='btn-box' >
                  <span>Already have an account Login  <Link  className="link" to='/Login'> Here</Link></span>
                  <button className='btn btn-success' btn md>Sign Up</button>
              </div>
              </form>  
              {errorMsg&&<>
              <div className="error-msg">{errorMsg}</div>
              <br/>
              </>}
        </div>
    )
}
