
import _ from "lodash";
import React, { useContext, Fragment, useEffect, useState } from "react";
import { Container } from "reactstrap";
// import { productdata } from '../data'
import './Home.css';
import { cartContext } from "../context/cartContext";
import Banner from '../../Images/Banner.webp'
import Banner1 from '../../Images/Banner1.jpg'
import Banner2 from '../../Images/Banner2.jpg'
import galleryicon from '../../Images/galleryicon.png'
import Header from '../Header/Header'
import { getCategory } from '../../Services/apicalls'


function Home(props) {
  const { cartItems } = useContext(cartContext);
  const [productdata, setproductdata] = useState([]);
  const SelectedCategory = (data) => {
    console.log(data)
    localStorage.setItem("productsdata", data.title);
    props.history.push({
      pathname: `/products`,
      state: {
        ProductDetails: data.title,

      },
    });
  }
  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = async () => {
    let data = []
    const res = await getCategory()
    if (res.status == 200) {
      res.data.map((i, j) => {
        data.push({ "title": i })
      })
      setproductdata(data)
      console.log(localStorage.getItem("searchdata") == "")
      if (localStorage.getItem("searchdata") == "") {
        setproductdata(data)
        localStorage.setItem("productsearch", JSON.stringify(data))
      }
      else {
        setproductdata(JSON.parse(localStorage.getItem("productsearch")))
       
      }
    }
    console.log(productdata,"productdata")
  }

  return (
    <Fragment>
      <Header />
      <div id='home'
        className="container-fluid"
        style={{ height: "90vh", margin: "0px", padding: "0px" }}
      >
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner" style={{ height: "90vh" }}>
            <div class="carousel-item active">
              <img src={Banner} class="d-block w-100" alt="..." style={{ height: "90vh" }} />
            </div>
            <div class="carousel-item">
              <img src={Banner1} class="d-block w-100" alt="..." style={{ height: "90vh" }} />
            </div>
            <div class="carousel-item">
              <img src={Banner2} class="d-block w-100" alt="..." style={{ height: "90vh" }} />
            </div>
          </div>
        </div>

      </div>
      <div className="proback">
        <Container id='products'>
          <div className="all_title">
            <h5 className="cattilte">Category</h5>
          </div>

          <div className="categorycards">
            {

              productdata?.map((category, index) => {
                return (
                  <div
                    className="categorycardsdiv"
                    onClick={() => SelectedCategory(category)}
                  >
                    <div className="cat_cardbody">
                      <div className="cat_img">
                        <img src={galleryicon} alt="image" />
                      </div>
                      <div className="cat_footer">
                        <div className="catname_footer">
                          {category.title}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}


          </div>
        </Container>
      </div>
    </Fragment>
  );
}

export default (Home);
