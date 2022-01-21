
  
import React from 'react'
import { Icon } from 'react-icons-kit'
import {ic_shopping_basket} from 'react-icons-kit/md/ic_shopping_basket'
import '../index.css'

export const IndividualFilteredProduct = ({individualFilteredProduct, addToCart}) => {

    const handleAddToCart=()=>{
        addToCart(individualFilteredProduct);
    }

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualFilteredProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualFilteredProduct.title}</div>
            <div className='product-text description'>{individualFilteredProduct.description}</div>
            <div className='product-text price' dir="rtl">  {individualFilteredProduct.price} جنيه</div>
            <button className='cart-btn' onClick={handleAddToCart}> أضف للسلة </button>
        </div> 
    )
}