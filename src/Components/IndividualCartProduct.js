import React from 'react'
import { Icon } from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import { auth, fs } from '../Config/Config'
import {ic_delete} from 'react-icons-kit/md/ic_delete'
import {ic_add_shopping_cart_twotone} from 'react-icons-kit/md/ic_add_shopping_cart_twotone'

export const IndividualCartProduct = ({cartProduct,cartProductIncrease,cartProductDecrease}) => {
   
   
    const handleCartProductIncrease=()=>{
        cartProductIncrease(cartProduct);
    }

    const handleCartProductDecrease=()=>{
        cartProductDecrease(cartProduct);
    }

    const handleCartProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(()=>{
                    console.log('successfully deleted');
                })
            }
        })
    }
  
   
   
   
   
    return (
        <div className='product' style={{background:"white"}}>
        <div className='product-img'>
            <img src={cartProduct.url} alt="product-img"/>
        </div>
        <div className='product-text title'>{cartProduct.title}</div>
        <div className='product-text description'>{cartProduct.description}</div>
        <div className='product-text price' dir='rtl'> {cartProduct.price} جنيه</div>
        <div className='product-text quantity-box'>
            <div className='action-btns minus mx-2' onClick={handleCartProductDecrease} >
            <Icon icon={minus} size={20} />
            </div>                
            <div><Icon icon={ic_add_shopping_cart_twotone} size={18}/>   {cartProduct.qty}</div>               
            <div className='action-btns plus mx-2' onClick={handleCartProductIncrease}>
                <Icon icon={plus} size={20} />
            </div>
        </div>
        <div className='product-text cart-price' dir="rtl">{cartProduct.TotalProductPrice} جنيه</div>
        <div  onClick={handleCartProductDelete}><Icon class="material-icons" icon={ic_delete} size={30} /></div>            
    </div>
    )
}
