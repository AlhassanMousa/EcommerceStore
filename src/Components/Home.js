import React, { useState ,useEffect} from 'react'
import {Products} from './Products';
import { auth, fs } from '../Config/Config';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';
import { IndividualFilteredProduct } from './IndividualFilteredProduct';
import { Login } from './Login';



import {
  MenuButton,
  MenuList,
  MenuItem,
  Menu,} from '@chakra-ui/menu'

import { Box, Flex,IconButton } from '@chakra-ui/react'
import { BsFilter } from "react-icons/bs";

export const Home = (props) => {






     const [isPending, setIsPending] = useState(true);
     const [user, setUser] = useState(null);


   //get current user 
   function GetUserUid(){
       const [uid , setUid] = useState(null);





       useEffect(() => {
           auth.onAuthStateChanged(user => {
               if(user){
                   setUid(user.uid);
                 }
                });
       }, [])
       return uid;
   }

const uid = GetUserUid();

   useEffect(() => {
    auth.onAuthStateChanged(user => {
        if(user){
           fs.collection('users').doc(user.uid).get().then(snapshot => {
            setUser(snapshot.data().FullName);
            setIsPending(false);
          })
         }
        else{
            setIsPending(false);
            setUser(null);
        }
     })
}, [])





  // state of products
  const [products, setProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
    const products = await fs.collection("Products").get();
    const productsArray = [];
    for (const snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };
useEffect(() => {
    getProducts();
},[])




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



const navigate = useNavigate();

  // global variable
  let Product;
 // add to cart
 const addToCart = (product) => {
  if (uid !== null) {
    // console.log(product);
    Product = product;
    Product["qty"] = 1;
    Product["TotalProductPrice"] = Product.qty * Product.price;
    fs.collection("Cart " + uid)
      .doc(product.ID)
      .set(Product)
      .then(() => {
        console.log("successfully added to cart");
      });
  } else {
       navigate('/login');
  }
};




   // categories list rendering using span tag
   const [spans]=useState([
    {id: 'All', text: 'All'},
    {id: 'ElectronicDevices', text: 'Electronic Devices'},
    {id: 'MobileAccessories', text: 'Mobile Accessories'},
    {id: 'TVAndHomeAppliances', text: 'TV & Home Appliances'},
    {id: 'SportsAndOutdoors', text: 'Sports & outdoors'},
    {id: 'HealthAndBeauty', text: 'Health & Beauty'},
    {id: 'HomeAndLifestyle', text: 'Home & Lifestyle'},
    {id: 'MensFashion', text: `Men's Fashion`},
    {id: 'WatchesBagsAndJewellery', text: `Watches, bags & Jewellery`},
    {id: 'Groceries', text: 'Groceries'},             
])

//active class state
const [ active, setActive] = useState('');

//
    // category state
    const [category, setCategory]=useState('');

    // handle change ... it will set category and active states
    const handleChange=(individualSpan)=>{
        setActive(individualSpan.id);
        setCategory(individualSpan.text);
        filterFunction(individualSpan.text);
    }

    // filtered products state
    const [filteredProducts, setFilteredProducts]=useState([]);

    // filter function
    const filterFunction = (text)=>{
        if(products.length>1){
            const filter=products.filter((product)=>product.category===text);
            setFilteredProducts(filter);
        }
        else{
            console.log('no products to filter')
        } 
    }

const returntoAllProducts=()=>{
  setActive('');
  setCategory('');
  setFilteredProducts([]);
}

  if (isPending)
    return (
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        Fetching  Products for you...
      </h2>
    );

    









    return (
        <>
            
    


          {!isPending && (
            <>

          <Navbar  user={user} totalProducts={totalProducts}/>
          <br />
          <div className='filter-box'  dir="rtl">
       

      <Box pos="relative" >
        <Flex ml="auto">
       
          <Box  ml="3" display={{ base: "none", md: "block" }}>
        
        
          <Box ml={{ base: 2, md: 1 }}>
            <Menu preventOverflow >
              <MenuButton 
                as={IconButton}
                size="xs"
                fontSize="xl"
                variant="ghost"
                borderRadius="full"
                icon={<BsFilter /> }
              />
            <MenuList className='menulist'>
  {spans.map((individualSpan,index)=>(

   <MenuItem key={index} id={individualSpan.id}
                    onClick={()=>handleChange(individualSpan)}
                    className={individualSpan.id===active ? active:'deactive'}>{individualSpan.text}   </MenuItem>

  ))}
 </MenuList>
            </Menu>
          </Box>
          </Box>
        </Flex>
      </Box>
  

      </div>




       <div className='container-fluid filter-products-main-box'>
                
         {filteredProducts.length > 0&&(
                  <div className='my-products'>
                      <h1 className='text-center'>{category}</h1>
                      <a href="javascript:void(0)" onClick={returntoAllProducts}>Return to All Products</a>
        

                      <div className='products-box'>
                          {filteredProducts.map(individualFilteredProduct=>(
                              <IndividualFilteredProduct key={individualFilteredProduct.ID}
                              individualFilteredProduct={individualFilteredProduct}
                              addToCart={addToCart}/>
                          ))}
                      </div>
                  </div>  
                )}
                       {filteredProducts.length < 1&&(
                    <>
                        {products.length > 0&&(
                            <div className='my-products'>
                                <div className='products-box'>
                                    <Products products={products} addToCart={addToCart}/>
                                </div>
                            </div>
                        )}
                        {products.length < 1&&(
                            <div className='my-products please-wait'>Please wait...</div>
                        )}
             </>
           )
         } 
         
       </div>
          {/* {products.length < 1 && (
            <div className="container-fluid">Please wait....</div>
          )} */}
        </>
   
          )}
          </>
    )
}


/*

    {products && products.length > 0 && (
            <div className="container-fluid">
              <h1 className="text-center">Products</h1>
              <div className="products-box">
                <Products products={products}  addToCart={addToCart}/>
              </div>
            </div>
          )}

*/


/*

   {spans.map((individualSpan,index)=>(
                    
                        <button key={index} id={individualSpan.id}
                        onClick={()=>handleChange(individualSpan)}
                        className={individualSpan.id===active ? active:'deactive'}>{individualSpan.text}</button>
                    ))}


 */


/*
import {
  MenuButton,
  MenuList,
  MenuItem,
  Menu} from '@chakra-ui/menu'
import { ImMenu } from 'react-icons/im';


 <Menu  >
  <MenuButton
    as={ImMenu}
    rightIcon={<ImMenu />}
    variant="ghost"
  />
         <MenuList className='menulist'>
  {spans.map((individualSpan,index)=>(

   <MenuItem key={index} id={individualSpan.id}
                    onClick={()=>handleChange(individualSpan)}
                    className={individualSpan.id===active ? active:'deactive'}>{individualSpan.text}   </MenuItem>

  ))}
 </MenuList>
   </Menu>
   */