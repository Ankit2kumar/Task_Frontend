import React, { useContext, useState,useEffect } from "react";
import { AppContext } from "../context";

import SubProducts from "./SubProduct";

function Categories() {
  const { selectedItems, setSelectedItems, info } = useContext(AppContext);
  
  const [categories,setCategories] = useState([])
  const [selected, setSelected] = useState([]);
  const [toggle, setToggle] = useState(false);

  const onSelectCategory = (name) => {
    let oldValue = [...selected];
    let value = { ...selectedItems };
    if (oldValue.includes(name)) {
      const listValues = selected.filter((item) => item != name);
      oldValue = listValues;
    } else {
      oldValue.push(name);
    }

    value["categories"].push(name);

    setSelected(oldValue);
    setSelectedItems(value);
  };

  const onSearch = ({target:{value}}) => {
    if(value){
      const latest = [...info?.categories]
      setCategories(latest.filter(item => item.includes(value)))
    }else{
      setCategories(info?.categories)
    }

  }

  useEffect(() => {
    info?.categories && setCategories(info.categories)
  },[])

  return (
    <div className="category__container">
      <div className="category__title">
        <h3>Select Subcategories</h3>
        <i
          className={toggle ? "fa fa-sort-up arrowIcon" : "fa fa-sort-down arrowIcon"}
          onClick={() => setToggle(!toggle)}
        ></i>
      </div>
      <div className='toggle' style={{display:toggle? 'flex':'none',flexDirection:'column'}}>
        <div className="category__content">
          <input type="text" placeholder="search category" onChange={onSearch} />
          <div className="category__lists">
            {categories.map((cate, key) => (
              <div className="item" key={key}>
                <div className="category__item">
                  <p className="category__p">{cate}</p>
                  <input
                    type="checkbox"
                    onChange={() => onSelectCategory(cate)}
                  />
                </div>
                {selected.includes(cate) && <SubProducts />}
              </div>
            ))}
          </div>
        </div>
        <button className="btn addSub">+ Add Subcategory</button>
      </div>
    </div>
  );
}

export default Categories;
