import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context";
import instance from "../request";
import Modal from "./Modal";

function SubProducts() {
  const { selectedItems, setSelectedItems, info, setInfo } =
    useContext(AppContext);
  const [toggle, setToggle] = useState(false);
  const [subName, setSubName] = useState("");
  const [modal, setModal] = useState(false);
  const [subProducts, setSubProducts] = useState([]);

  const onSelect = (name) => {
    const value = { ...selectedItems };
    value["subproducts"].push(name);
    setSelectedItems(value);
  };

  const onSearch = ({ target: { value } }) => {
    if (value) {
      const latest = [...info?.subproducts];
      setSubProducts(latest.filter((item) => item.includes(value)));
    } else {
      setSubProducts(info?.subproducts);
    }
  };

  useEffect(() => {
    info?.subproducts && setSubProducts(info.subproducts);
  }, []);

  const onClick = async () => {
    const form = new FormData();
    form.append("name", subName);

    const { data, status } = await instance.post("addsub/", form);

    alert(data?.status);
    setModal(false);

    if (data?.code == 200) {
      const details = { ...info };
      details["subproducts"] = data.subproducts;

      setInfo(details);

      setSubProducts(data.subproducts);

      setSubName('')
    }
  };

  return (
    <>
      <div className="subproducts__container">
        <div className="subproducts__title">
          <h3>Select Sub-products</h3>
          <i
            className={
              toggle ? "fa fa-sort-up arrowIcon" : "fa fa-sort-down arrowIcon"
            }
            onClick={() => setToggle(!toggle)}
          ></i>
        </div>
        <div
          className="toggle"
          style={{ display: toggle ? "flex" : "none", flexDirection: "column" }}
        >
          <div className="subproducts__content">
            <input
              type="text"
              placeholder="search subproducts"
              onChange={onSearch}
            />
            <div className="subproducts__lists">
              {subProducts.map((sub, key) => (
                <div className="item" key={key}>
                  <div className="subproducts__item">
                    <p className="subproducts__p">{sub}</p>
                    <input type="checkbox" onChange={() => onSelect(sub)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="btn addSubPro" onClick={() => setModal(true)}>
            + Add Subproduct
          </button>
        </div>
      </div>
      <Modal openModal={modal} setOpenModal={setModal}>
        <ul>
          <li>
            <h3>New Sub products</h3>
            <p className="items">
              <input
                type="text"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
                class="itemInput"
              />
            </p>
          </li>
          <li>
            <p>
              <button className="btn" onClick={onClick}>
                Save
              </button>
            </p>
          </li>
        </ul>
      </Modal>
    </>
  );
}

export default SubProducts;
