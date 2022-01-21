import React from 'react'
import { motion } from "framer-motion";

export const IndividualProduct = ({individualProduct, addToCart}) => {
   
     const handleAddToCart=() =>{
         addToCart(individualProduct);
     }

    return (
        <div className='product' style={{background:"white"}}>
        <div className='product-img'>
            <img src={individualProduct.url} alt="product-img"/>
        </div>
        <div className='product-text title'>{individualProduct.title}</div>
        <div className='product-text description'>{individualProduct.description}</div>
        <div className='product-text price' dir="rtl">  {individualProduct.price} جنيه</div>
        <button  className='cart-btn' onClick={handleAddToCart}>أضف للسلة</button>
    </div> 
    )
}



/*

*/