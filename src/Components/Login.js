import { Link } from "react-router-dom";
import React, {useState,useEffect} from 'react';
import { auth } from "../Config/Config";
 import { useNavigate } from "react-router-dom";


import   "bootstrap/dist/css/bootstrap.min.css";

 import Form from "react-bootstrap/Form";
 import { Button, Container } from 'react-bootstrap';


export const Login = () => {






    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

  const handleLogin=(e)=>{



        e.preventDefault();
       
       /* 
        auth.onAuthStateChanged(user => {
          setUser(user);
            setTimeout(() =>{
              setSuccessMsg('login');
              navigate('/');
          },3000)})
*/

        
        
      
     
        auth.signInWithEmailAndPassword(email,password).then(() =>{
            setSuccessMsg('loginSuccessful, you will now redirect to home');
            setEmail('');
            setPassword('');
            setErrorMsg('');
           setTimeout(() =>{
                setSuccessMsg('');
                navigate('/');
            },3000)

        }).catch(error=>setErrorMsg(error.message));

 
    }
  

    return (
      <div className="Login">
        <Container>
          <h1 >
              Log in to your account 
          </h1>
         {successMsg  &&  (
               <>
               <div className="success-msg">{successMsg}</div>
               <br/>
              </>
          )}
      <Form onSubmit={handleLogin}>
      <Form.Group size="lg" controlId="email">
      <Form.Label>Email</Form.Label>
         <Form.Control type="email" 
  required onChange={(e)=>setEmail(e.target.value)} value={(email)}  placeholder='Your Email' />
</Form.Group>
      <br />
      <Form.Group size="lg" controlId="password">
         <Form.Label>Password</Form.Label> 
        <Form.Control type="password" required onChange={(e)=>setPassword(e.target.value)} value={(password)}  placeholder='Your Password' />
        </Form.Group>
         <br />

         <Button variant="primary" block size="lg" type="submit" >LOGIN</Button>
         </Form>
       



          <span>Don't have an account Singup  
          <Link to="/signup" className="link"> Here</Link></span>
    

      
          

          <>
         
         
       



          </>
          {errorMsg && (
        <>
          <br></br>
          <div className="error-msg">{errorMsg}</div>
        </>
      )}
      </Container>
        </div>
  
    )
}
