
import _ from "lodash";
import React, { useContext, Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import * as IosIcons from "react-icons/io";
import Card from '../Common/Card'
// import { productdata } from '../data'
import './Products.css';
import { cartContext } from "../context/cartContext";
import Header from '../Header/Header'
import { AddNotification } from "../Common/forms/notification"
import galleryicon from '../../Images/galleryicon.png'
import { getProducts } from '../../Services/apicalls'



function Products(props) {
    console.log(props)
    const { onAdd, cartItems ,Searchdata} = useContext(cartContext);
    const [openNotification, setopenNotification] = React.useState(false)
    const [loading, setloading] = React.useState(true)
    const [isModalOpen, setisModalOpen] = React.useState(true)
    const [productdata, setproductdata] = useState([]);


    const ProceedItems = () => {
        if (localStorage.getItem("mobileNo") == null) {
            setopenNotification(true)
            setloading(false)
            setisModalOpen(false)


        } else if (localStorage.getItem("mobileNo") != null) {
            props.history.push({
                pathname: `/cart`,
            });
        }
    }

    useEffect(() => {
        getProductList()
        console.log(localStorage.getItem("searchdata"))
    },[])

    const getProductList = async () => {
        const res = await getProducts(props.history.location.state.ProductDetails)
        console.log(res, "res", res.status)
        if (res.status == 200) {
            if(localStorage.getItem("searchdata") == ""){
                setproductdata(res.data)  
                localStorage.setItem("productsearch",JSON.stringify(res.data))
            }
            else{
                setproductdata(JSON.parse(localStorage.getItem("productsearch")))  

            }
            // let data = JSON.stringify(res.data)
            // localStorage.setItem("products",JSON.parse(res.data));
        }
        console.log(productdata,"productdata",JSON.parse(localStorage.getItem("productsearch")))
    }
    return (
        <Fragment>
            <Header />
            <AddNotification
                visible={openNotification}
                variant="warning"
                message={`Please Login for Checkout`}
                onClose={() => setopenNotification(false)}
            />
            <div className={cartItems.length > 0 && 'overflowdiv'}>
                <Container id="containerpadding">
                    <div className="ptitle">
                        <h5 className="catprotilte">Products</h5>
                    </div>
                    <Row>
                        {productdata.length > 0 &&
                            productdata?.map((p, i) => {
                                return <Col md={3} sm={12} className='mt-4'>
                                    <Card
                                        prodname={p.title}
                                        fixprice={p.price}
                                        // offerprice={}
                                        // prodcount={"/ Kg"}
                                        imgsource={galleryicon}
                                    >

                                        <div className="row text-center bottomdiv">
                                            <div className="col-md-12">
                                                <div className=" heart-cover-div">
                                                    <div className="heart-div">
                                                        <input
                                                            id={`toggle-heart${i}`}
                                                            className="toggle-heart"
                                                            type="checkbox"
                                                        />
                                                        <label
                                                            for={`toggle-heart${i}`}
                                                            onClick={() => this.wishlistloginCheck(p)}
                                                            className="hrt-lbl"
                                                            aria-label="like"
                                                            title="Add To Wishlist"
                                                        >
                                                            ❤{" "}
                                                        </label>
                                                    </div>
                                                    <div className="cart-div">
                                                        <input
                                                            id={`toggle-cart${i}`}
                                                            className="toggle-cart"
                                                            type="checkbox"
                                                        />
                                                        <label
                                                            for={`toggle-cart${i}`}
                                                            className="cart-lbl"
                                                            title="Add To Cart"
                                                            onClick={() => onAdd(p)}
                                                        >
                                                            {" "}
                                                            <IosIcons.IoMdCart />{" "}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            })
                        }
                    </Row>
                </Container>
            </div>
            {cartItems.length > 0 && <Row style={{ width: "100%" }}>
                <div className="proceeddiv">
                    <div className='disdiv'>
                        <Col sm={6} className='btnleft'>

                        </Col>
                        <Col sm={6} className='btnright' onClick={ProceedItems}>
                            <button type="button" class="btn btn-lg btn-primary" >Proceed</button>
                        </Col>
                    </div>
                </div>
            </Row>}
        </Fragment>
    );
}

export default (Products);
