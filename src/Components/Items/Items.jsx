import React, { Fragment, useContext } from "react"
import { Table, Row } from "reactstrap";
import { BiTrash } from "react-icons/bi";
import { cartContext } from "../context/cartContext";
import { Link } from 'react-router-dom';
import galleryicon from '../../Images/galleryicon.png'
import "../Cart/Cart.css";
import Header from '../Header/Header'

function Items() {
    const { cartItems, onAdd, onDecrease, onremove } = useContext(cartContext);
    console.log(cartItems, "cartItems")


    return (
        <div>
            <Header />
            <div className="all_title mt-2">
                <h5 className="cattilte">Cart</h5>
            </div>
            <div className="cart-summary">

                <table id="example" class="sortable"

                >
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th >Product</th>
                            <th>Product Image</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    {cartItems.length > 0 &&
                        cartItems.map((item) => {
                            return <tbody>
                                <tr>
                                    <td sorttable_customkey="category">{item.category}</td>
                                    <td sorttable_customkey="category">{item.title}</td>
                                    <td>
                                        <img
                                            src={galleryicon}
                                            alt="img"
                                            width="70"
                                            height="50"
                                            className="img-avatar"
                                        />
                                    </td>

                                   
                                    <td sorttable_customkey="category">$ {item.Count * item.price}</td>
                                    
                                </tr>
                            </tbody>
                        })}
                </table>
            </div>
        </div>


    )

}
export default Items;
