import React, { useState, useEffect } from "react";

import { AppContext } from "../context";
import instance from "../request";
import Products from "./Products";
import Modal from "./Modal";

function Home() {
  const [selectedItems, setSelectedItems] = useState({
    products: [],
    categories: [],
    subproducts: [],
  });
  const [info, setInfo] = useState({
    products: [],
    categories: [],
    subproducts: [],
  });

  const [openModal, setOpenModal] = useState(false);
 

  const getDetails = async () => {
    const { data, status } = await instance.get("general/");
    data && setInfo(data);
  };

  const products= [...new Set(selectedItems?.products)]
  const subcategory= [...new Set(selectedItems?.categories)]
  const subproducts= [...new Set(selectedItems?.subproducts)]

  const onClick = async() => {
    const form = new FormData()
    form.append('products',products.toString())
    form.append('categories',subcategory.toString())
    form.append('subproducts',subproducts.toString())

    const {data,status} = await instance.post('savedetails/',form)
    if(data){
      alert(data?.status)
      setOpenModal(false)
      data.status === 'You have successfully saved details' && window.location.reload()
    }

  }

  useEffect(() => {
    getDetails();
  }, []);

  const props = { selectedItems, setSelectedItems, info,setInfo };

  return (
    <AppContext.Provider value={props}>
      <div className="container">
        <Products setModal={setOpenModal} />
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <ul>
            <li>
              <h3>Products</h3>
              <p className='items'>
                {products.map(item => `${item},`)}
              </p>
            </li>
            <li>
              <h3>SubCategory</h3>
              <p className='items'>
                {subcategory.map(item => `${item},`)}
              </p>
            </li>
            <li>
              <h3>SubProducts</h3>
              <p className='items'>
               {subproducts.map(item => `${item},`)}
              </p>
            </li>
            <li>
              <p><button className='btn' onClick={onClick}>Save</button></p>
            </li>
            
          </ul>
        </Modal>
      </div>
    </AppContext.Provider>
  );
}

export default Home;
