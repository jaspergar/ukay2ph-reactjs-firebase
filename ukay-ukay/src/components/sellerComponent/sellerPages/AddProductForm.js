
import React,{useState} from 'react'
import '../../../css/AddProductForm.css'
import {MenBoyTopCategory,MenBoyBottomCategory,MenBoyFootwearCategory,BagCategory,WomenGirlTopCategory,WomenGirlBottomCategory,WomenGirlFootwearCategory} from './ProductCategoryData'
import axios from '../../../axios'
import { db, functions, storage } from '../../../firebase';
import { useStateValue } from '../../../contextApi/StateProvider';
import { useHistory } from 'react-router-dom';





export default function AddProductForm() {

    const [mainCategory,setMainCategory] = useState('');
    const [subCategory,setSubCategory] = useState('');
    const [selectedCategories, setSelectedCategories] = useState('');
    const [itemCategory,setItemCategory] = useState('');
    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [brand,setBrand] = useState('');
    const [size,setSize] = useState('');
    const [material,setMaterial] = useState('');
    const [price,setPrice] = useState(0);
    const [stock,setStock] = useState(0);
    const [image,setImage] = useState('');
    // const [fileUrl,setFileUrl] = useState(null)
    const [makeAdmin,setMakeAdmin] = useState('')

   const [{user},dispatch] = useStateValue()

   const history = useHistory()
  
   const onSubmit = async (e) => {
          e.preventDefault()

       // add product image to the firestore and image to storage
      
      const file = image
      const storageRef = storage.ref()
      const fileRef = storageRef.child('Images/'+file.name)
      await fileRef.put(file)
      const fileUrl = await fileRef.getDownloadURL()
      console.log(fileUrl)

      // add product to firestore with product image
      db.collection('users').doc(user?.uid).collection('adminProduct').doc().set({
        mainCategory:mainCategory,
        subCategory:subCategory,
        itemCategory:itemCategory,
        title:title,
        desc:desc,
        brand:brand,
        size:size,
        material:material,
        price:price,
        stock:stock,
        image: fileUrl
    }).then(() => {
        history.push('/sellerProduct/myProduct')
    })
      
   }

    return (
      <div className="addproduct">
           <div className="addproduct__info">
                <h2>Add a New Product</h2>
                <p>Please choose the right category for your product.</p>
           </div>
            
           
                 <form action="" className="addproduct__form">
                 
                      <div className="addproduct__formcontainer">
                          <div className="addproduct__formtitle">
                              <h3>Categories</h3>
                          </div>
                          <div className="addproduct__categoryinput">
                          
                          <select name="mainCategory" id="mainCategory" value={mainCategory} onChange={(e) => {setMainCategory(e.target.value)}} className="addproduct__input">
                               <option value="">Main Category...</option>
                                <option value="Men's Fashion">Men's Fashion</option>
                                <option value="Women's Fashion">Women's Fashion</option>
                                <option value="Boy's Fashion">Boy's Fashion</option>
                                <option value="Girl's Fashion">Girl's Fashion</option>
                                <option value="Baby">Baby</option>
                            </select>
                            
                            <select name="subCategory" value={subCategory}  onChange={(e) => {setSubCategory(e.target.value)}} className="addproduct__input">
                            <option value="">Sub Category...</option>
                                <option value="Top">Top</option>
                                <option value="Bottom">Bottom</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Bags">Bags</option>
                            </select>
                            {/*dynamic*/}

                            <select  name="itemCategory" value={itemCategory} onChange={(e) => {setItemCategory(e.target.value)}} className="addproduct__input">
                            <option value="">Item Category...</option>
                                <option value="Shirts">Shirts</option>
                                <option value="Polo">Polo</option>
                                <option value="Sweaters">Sweaters</option>
                                <option value="Jackets">Jackets</option>
                                <option value="Fashion Hoodie">Fashion Hoodie</option>
                            </select>

                         
                          </div>
                      </div>

                      <div className="addproduct__formcontainer">
                          <div className="addproduct__formtitle">
                              <h3>Basic Info</h3>
                          </div>
                          <div className="addproduct__basicinfoinput">

                          {/* temporary */}
                             {/* <label htmlFor="admin">Make Admin</label>
                              <input type="text" id="admin" className="addproduct__input" value={makeAdmin} onChange={(e) => {setMakeAdmin(e.target.value)}}/> */}
                              {/* temporary */}


                              <label htmlFor="title">Product Title</label>
                              <input type="text" id="title"value={title} onChange={(e) => {setTitle(e.target.value)}} className="addproduct__input"/>
                              <label htmlFor="desc">Product Description</label>

                              <textarea name="comment" id="desc" value={desc} onChange={(e) => {setDesc(e.target.value)}} className="addproduct__input"/>
                              <div className="addproduct__basicinfodropdown">
                                    <select value={brand} onChange={(e) => {setBrand(e.target.value)}} className="addproduct__input">
                                    <option value="">Brand...</option>
                                        <option value="Adidas">Adidas</option>
                                        <option value="H&M">H&M</option>
                                        <option value="Nike">Nike</option>
                                        <option value="Lacoste">Lacoste</option>
                                        <option value="Penshoppe">Penshoppe</option>
                                    </select>
                                    <select value={size} onChange={(e) => {setSize(e.target.value)}} className="addproduct__input">
                                    <option value="">Size...</option>
                                        <option value="Extra Small">Extra Small</option>
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                        <option value="Extra Large">Extra Large</option>
                                    </select>
                                    <select value={material} onChange={(e) => {setMaterial(e.target.value)}} className="addproduct__input">
                                    <option value="">Material...</option>
                                        <option value="Cotton">Cotton</option>
                                        <option value="Denim">Denim</option>
                                        <option value="Lether">Lether</option>
                                        <option value="Wool">Wool</option>
                                    </select>
                              </div>
                             
                          </div>
                      </div>

                      

                      <div className="addproduct__formcontainer">
                          <div className="addproduct__formtitle">
                              <h3>Sales Info</h3>
                          </div>
                          <div className="addproduct__salesinfoinput">
                           <div className="addproduct__salesinfocontainer">
                           <label htmlFor="price">Price</label>
                              <input type="number" value={price} onChange={(e) => {setPrice(e.target.value)}}  className="addproduct__input"/>
                           </div>
                           <div className="addproduct__salesinfocontainer">
                              <label htmlFor="stock">Stock</label>
                              <input type="text" value={stock} onChange={(e) => {setStock(e.target.value)}} className="addproduct__input"/>
                            </div>
                          </div>
                      </div>

                      <div className="addproduct__formcontainer">
                          <div className="addproduct__formtitle">
                              <h3>Media</h3>
                          </div>
                          <div className="addproduct__mediainput">
                              <input type="file"   onChange={(e)=>{setImage(e.target.files[0])}} className="addproduct__input"/>
                          </div>
                      </div>

                      <button onClick={onSubmit} className="addproduct__addbtn">Add Product</button>
                 </form>

               
      </div>
    )
}
