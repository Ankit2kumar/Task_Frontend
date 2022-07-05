import React, { useContext,useState } from "react";

import { AppContext } from "../context";
import Categories from "./Categories";

export default function Products({setModal}) {
  const { selectedItems, setSelectedItems, info } = useContext(AppContext);
  const [selected,setSelected] = useState([])

  const onSelectProduct = (name) => {
    let oldValue = [...selected ];
    if (oldValue.includes(name)) {
      const listValues = selected.filter((item) => item != name);
      oldValue = listValues;
    } else {
      oldValue.push(name);
    }

    const value = { ...selectedItems };
    value["products"].push(name);
    setSelectedItems(value);
    setSelected(oldValue)
  };

  return (
    <div className="product__container" >
      <div className="product__title">
        <h3>Products</h3>
        <button className="btn" onClick={() => setModal(true)}>Done</button>
      </div>
      <div className="product__content">
        <div className="product__lists">
          {info?.products.map((pro, key) => (
            <div className="item" key={key}>
              <div className="product__item">
                <p className="product__p">{pro}</p>
                <input type="checkbox" onChange={() => onSelectProduct(pro)} />
              </div>
              {selected.includes(pro) && <Categories />}
            </div>
          ))}
        </div>
      </div>
      <button className="btn">+ Add Product</button>
    </div>
  );
}
