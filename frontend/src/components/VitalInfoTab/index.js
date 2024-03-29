import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { fetchEditProduct } from "../../store/productReducer";
import "./VitalInfoTab.css";

const VitalInfoTab = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.products[productId]);

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(product?.name);
  const [department, setDepartment] = useState(product?.department);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [freeReturn, setFreeReturn] = useState(product?.freeReturn);
  const [prime, setPrime] = useState(product?.prime);
  const [previewImage, setPreviewImage] = useState(product?.previewImage);
  const [errors, setErrors] = useState([]);

  const departments = [
    "Alexa",
    "Appliances",
    "Arts",
    "Audible",
    "Auto",
    "Baby",
    "Beauty",
    "Books",
    "CDs",
    "Cellular",
    "Clothing",
    "Collectibles",
    "Computers",
    "Credit",
    "Devices",
    "Electronics",
    "Education",
    "Games",
    "Garden",
    "Grocery",
    "Handmade",
    "Health",
    "Home",
    "Industrial",
    "Kindle",
    "Luxury",
    "Magazines",
    "Music",
    "Office",
    "Pets",
    "Pharmacy",
    "Prime",
    "Services",
    "Software",
    "Sports",
    "Tools",
    "Toys",
    "Travel",
    "Video",
    "Warehouse",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    product = {
      ...product,
      name,
      department,
      price,
      description,
      freeReturn,
      prime,
      previewImage,
    };
    setErrors([]);

    const response = await dispatch(
      fetchEditProduct(product, product?.id)
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    if (response) history.push(`/inventory`);
  };

  if (!product) {
    return <Redirect to="/" />;
  }

  return (
    <div id="vital-info-p">
      <div className="edit-product-top">
        <h1 className="edit-product-box">Vital Info</h1>
        <NavLink
          to={`/products/${product?.id}/images`}
          className="edit-product-tabs"
        >
          <h1 className="edit-product-tabs">Images</h1>
        </NavLink>
        <NavLink
          to={`/products/${product?.id}/descriptions`}
          className="edit-product-tabs"
        >
          <h1 className="edit-product-tabs">Description</h1>
        </NavLink>
      </div>
      <div id="edit-product-hr-section">
        {/* <hr className="edit-short-hr" /> */}
        <hr className="edit-long-hr" />
      </div>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <div className="edit-product-rows">
          <span className="edit-green-asterisk">*</span>
          <span className="edit-product-labels">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="edit-product-input"
          />
        </div>
        <div className="edit-product-rows">
          <span className="edit-green-asterisk">*</span>
          <span className="edit-product-labels">Department</span>
          <select
            name="type"
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
            className="edit-product-select"
          >
            <option value="" disabled>
              Select a department
            </option>
            {departments.map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
        <div id="edit-product-price-row">
          <span className="edit-green-asterisk">*</span>
          <span id="edit-price-label">Price</span>
          <span>${product?.price}</span>
        </div>
        <div className="edit-product-rows">
          <span className="edit-green-asterisk">*</span>
          <span className="edit-product-labels">Description</span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="edit-product-input"
          />
        </div>
        <div className="edit-product-free-row">
          <span className="edit-green-asterisk">*</span>
          <span className="edit-free-label">Free Return?</span>
          <input
            type="checkbox"
            checked={freeReturn}
            onChange={(e) => setFreeReturn(!freeReturn)}
          />
        </div>
        <div id="edit-product-prime-row">
          <span className="edit-green-asterisk">*</span>
          <span className="edit-prime-label">Prime Shipping Available?</span>
          <input
            type="checkbox"
            checked={prime}
            onChange={(e) => setPrime(!prime)}
          />
        </div>
        <div className="edit-product-rows">
          <span className="edit-green-asterisk">*</span>
          <span className="edit-product-labels">Preview Image</span>
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
            className="edit-product-input"
          />
        </div>
        <button type="submit" className="inventory-submit-btn">
          Submit
        </button>
        <ul className="error-ul">
          {errors?.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default VitalInfoTab;
