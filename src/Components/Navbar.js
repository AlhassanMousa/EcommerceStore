import React,{useState,useEffect} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import ox from './elix.png'
import Icon from 'react-icons-kit';
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { logOut } from 'react-icons-kit/feather/logOut'
import { logIn } from 'react-icons-kit/feather/logIn'

import { auth } from '../Config/Config';
import './Navbar.css';
import { Sling as Hamburger } from 'hamburger-react'







export const Navbar = ({isPending,user, totalProducts}) => {
const navigate = useNavigate();

const [isOpen, setOpen] = useState(false)


const handleLogout=() =>{
    auth.signOut().then(()=>{
        navigate('/Login');
    })
}

    return (
        <>
        {user !== undefined && (
          <>
          
            <div className="navbar custom-navbar">

              <div className="leftside">
                <div className="logo d-flex ">
                  <img className="custom-logo"
          
                    src={ox}
                    alt="logo"
                    onClick={() => {
                        navigate("/");
                    }}
                  />
                  <div className="abs"
              
              onClick={() => {
                  navigate("/");
              }}
            >
              eStore
            </div>
                </div>
              </div>
              <div className="rightside custom-text">
                <>
                  {!user && (
                    <>
                
                      <div >
                        <Link className="navlink custom-icon custom-text" to="login"  >
                        <Icon icon={logIn}  size={25}/>
                        </Link>
                      </div>
                    </>
                  )}
                </>
  
                {user && (
                  <>
                    <div>
                      <div
                        className="navlink d-flex justify-content-center align-items-center custom-text"
                        // to="/"
                      >
                        <i className="fa fa-user fa-2x fa-fw"></i>
                        {/*user*/}
                      </div>
                    </div>
                    <div className="cart-menu-btn custom-icon">
                      <Link className="navlink custom-text" to="/cart">
                        <Icon icon={shoppingCart}  size={25}/>
                      </Link>
                      <span
                        className="cart-indicator custom-cart-indicator"
                        style={{
                          fontSize: "12px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      >
                        {totalProducts}
                      </span>
                    </div>
                  {/*</div>Hamburger toggled={isOpen} toggle={setOpen}  > 
                    </Hamburger>*/}
                                 <div className="custom-icon"
                      onClick={handleLogout}
                    >
                   <Icon icon={logOut}  size={25}/>

                    </div>
 

                  </>
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  };




/*
91 - 

                    <button
                      className="btn btn-danger btn-md"
                      style={{ fontWeight: "bold", letterSpacing: "2px" }}
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </button>
*/





  /*

  between     <>  and  {!user && (
  
   {user && (
                    // <Link to="/add-products" style={{listStyle:"none"}}>
                      <div
                        className="btn btn-md"
                        style={{
                          fontWeight: "bold",
                          letterSpacing: "2px",
                          background: "#edf9fe",
                          color: "#001C55",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={()=>{("/add-products")}}
                      >
                        <i
                          className="fa fa-plus"
                          aria-hidden="true"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Add new Product
                      </div>
                    // </Link>
                  )}
  */

                  /**
                   

                     up to sign in 

                        <div>
                        <Link className="navlink custom-text" to="signup">
                          SIGN UP
                        </Link>
                      </div>
                   */