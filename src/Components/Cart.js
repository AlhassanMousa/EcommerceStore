import React,{useState,useEffect} from 'react'
import { Navbar } from './Navbar';
import {auth,fs} from '../Config/Config'
import { CartProducts } from './CartProducts';
//import StripeCheckout from 'react-stipe-checkout'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/'
import { Modal } from "./Modal";
import "react-toastify/dist/ReactToastify.css";



toast.configure();

export const Cart = () => {
//show modal state 
const [showModal, setShowModal] = useState(false);
//trigger modal 
const triggerModal=()=>{
    setShowModal(true)
}
 // hiding modal
 const hideModal=()=>{
    setShowModal(false);
  }
    //getting current user function
   function GetCurrentUser(){
       const [user, setUser] = useState(null);
       useEffect(() => {
           auth.onAuthStateChanged(user=>{
               if(user){
                   fs.collection('users').doc(user.uid).get().then(snapshot=>{
                       setUser(snapshot.data().FullName);
                   })
               }
               else{
                   setUser(null);
               }
           })
       }, [])
           return user;
    }
    const user = GetCurrentUser();

//state of cart products
const [cartProducts, setCartProducts] = useState([]);
  


//getting cart products from firestore collection and update the state

useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
        if(user){
            fs.collection('Cart '+ user.uid).onSnapshot((snapshot)=>{
                const newCartProduct = snapshot.docs.map((doc)=>({
                 ID:doc.id,
                   ...doc.data(),
                }));
                setCartProducts(newCartProduct);
            })
        }
        else{
            console.log('user is not signed in to retriev cart');
        }
    })
},[])

//getting the qtr from cartProducts in a seperate array

const qty = cartProducts.map(cartProduct =>{
    return cartProduct.qty;
})

//reducing the qty in an single value
const reducerOfQty = (accumulator, currentValue)=> accumulator+currentValue;

const totalQty = qty.reduce(reducerOfQty,0);

//console.log(totalQty);
//getting totalproductprice from cartproducts in a seperate array
const price = cartProducts.map((cartProduct)=>{
    return cartProduct.TotalProductPrice;
})

//reducing the price in a single value
const reducerOfPrice =  (accumulator, currentValue)=> accumulator+currentValue;

const totalPrice = price.reduce(reducerOfPrice,0);
   

  //global variable
   let Product;
 
   //cart product icrease functionally
   const cartProductIncrease = (cartProduct) =>{
       Product = cartProduct;
       Product.qty= Product.qty+1;
       Product.TotalProductPrice = Product.qty*Product.price;

       //updateing in db
       auth.onAuthStateChanged(user=>{
           if(user){
               fs.collection('Cart '+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                console.log('increament added');   
               })
           }else{
               console.log('user not logged in ')
           }
       })
   }
       //cart product decrease functionally 
         const cartProductDecrease = (cartProduct)=>{
             Product = cartProduct;
             if(Product.qty > 1){
                 Product.qty = Product.qty-1;
                 Product.TotalProductPrice= Product.qty*Product.price;
                 //updating in db 
                 auth.onAuthStateChanged(user=>{
                    if(user){
                        fs.collection('Cart '+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                         console.log('decrement');   
                        })
                    }else{
                        console.log('user not logged in to decrement')
                    }
                })
                
             }
         
            }

  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // getting cart products
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);
    
    return (
        <>
        <Navbar user={user} totalQty={totalQty}/>
           <br /> 
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 style={{textAlign:'center'}}>سلة التسوق</h1>
                    <div className='products-box cart'>
                        <CartProducts cartProducts={cartProducts}
                        cartProductIncrease={cartProductIncrease}
                        cartProductDecrease={cartProductDecrease}
                        />
                    </div>
              
                <div className='summary-box'>
                    <h5 dir="rtl">ملخص طلبك</h5>
                    <br/>
                    <div dir="rtl">إجمالى المنتجات : <span>{totalQty}</span></div>
                    <div dir="rtl">إجمالي المبلغ المطلوب  : <span dir="rtl">{totalPrice} جنيه</span> </div>
            
                <br/>

              <button className='btn-secondary' onClick={() => triggerModal()}>الدفع عند الإستلام</button>
             
               </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No Products to show</div>
            )}
           

           {showModal===true&&(
               <Modal TotalPrice={totalPrice} totalQty={totalQty}
               hideModal={hideModal}
               />
           )}

              
        </>
    )
}


/*

            <StripeCheckout>

                </StripeCheckout>

*/


