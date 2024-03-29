import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  fetchEditProductOrder,
  fetchDeleteProductOrder,
  fetchProductOrder,
} from "../../store/productOrderReducer";
import { fetchProduct } from "../../store/productReducer";
import "./CartItem.css";

const CartItem = ({ productOrder }) => {
  const dispatch = useDispatch();

  const product = useSelector(
    (state) => state.products[productOrder?.productId]
  );
  let newProductOrder = useSelector(
    (state) => state.productOrders[productOrder?.id]
  );

  const [quantity, setQuantity] = useState(newProductOrder?.quantity);

  let arr = Array.from(Array(31).keys());
  arr.shift();

  const handleClick = async (e) => {
    e.preventDefault();

    await dispatch(fetchDeleteProductOrder(newProductOrder?.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newerProductOrder = {
      ...newProductOrder,
      quantity: parseInt(quantity),
    };
    await dispatch(
      fetchEditProductOrder(newerProductOrder, newProductOrder?.id)
    );
  };

  useEffect(() => {
    dispatch(fetchProductOrder(productOrder?.id));
    dispatch(fetchProduct(productOrder?.productId));
  }, [dispatch]);

  return (
    <div className="cart-product-order">
      <div className="cart-form-w-pic">
        <NavLink to={`/products/${product?.id}`}>
          <img src={product?.previewImage} alt="Product" className="cart-img" />
        </NavLink>
        <div className="cart-form">
          <NavLink
            to={`/products/${product?.id}`}
            className="cart-product-name"
          >
            <p className="cart-product-name">{product?.name}</p>
          </NavLink>
          {product?.prime && (
            <img
              id="cart-form-prime-logo"
              src="../../images/kisspng-amazon-com-amazon-prime-amazon-video-retail-prime-amazon-prime-5b376c3c2a9899.6153089515303588441745.png"
            />
          )}
          {product?.freeReturn && <p className="cart-free">FREE Returns</p>}
          <div className="cart-action">
            <form className="cart-edit-form" onSubmit={handleSubmit}>
              <span id="qty-label">Qty: </span>
              <select
                name="type"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                id="qty-form"
              >
                <>
                  {arr?.map((ele) => {
                    return (
                      <option key={ele} value={ele}>
                        {ele}
                      </option>
                    );
                  })}
                </>
              </select>
              <button type="Submit" className="cart-update-btn">
                Update
              </button>
            </form>
            <span className="cart-vl">|</span>
            <span onClick={handleClick} className="cart-delete-link">
              Delete
            </span>
          </div>
        </div>
      </div>
      <span className="cart-price">${product?.price.toFixed(2)}</span>
    </div>
  );
};

export default CartItem;
