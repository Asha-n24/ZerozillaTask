
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import "./Header.css";
import { getProducts, getCategory } from '../../Services/apicalls'
import logo from '../../Images/logo.png'
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
function Header(props) {
  const { cartItems } = useContext(cartContext);
  const [searchtext, setsearchtext] = React.useState()
  const [productdata, setproductdata] = useState([]);

  const Logout = () => {
    localStorage.clear()
    props.history.push({
      pathname: `/`,
    });
    window.location.reload();
  }

  useEffect(() => {
    console.log(props)
    if (window.location.pathname == "/products") {
      getProductList();
    }
    else {
      getCategoryList()

    }

    console.log(window.location.pathname, window.location.pathname == "/products", "ppppppp")

  }, [1])

  const getCategoryList = async () => {
    let data = []
    const res = await getCategory()
    console.log(res, "res", res.status)
    if (res.status == 200) {
      res.data.map((i, j) => {
        data.push({ "title": i })
      })
      setproductdata(data);

    }
  }
  const getProductList = async () => {
    const res = await getProducts(localStorage.getItem("productsdata"))
    console.log(res, "res", res.status)
    if (res.status == 200) {
      setproductdata(res.data)
    }
    console.log(productdata, "productdata")
  }
  const handlechange = (e) => {
    console.log(productdata, "ikikikikik")
    setsearchtext(e.target.value);
    console.log(searchtext, "searchdata")
    localStorage.setItem("searchdata", e.target.value)
    const search = e.target.value;

    const res = productdata.filter(x => x.title.toLowerCase().includes(search.toLowerCase()))
    console.log(res, "resss", productdata.filter(x => x.title.toLowerCase().includes(search.toLowerCase())))
    if (localStorage.getItem("searchdata") != "") {
      localStorage.setItem("productsearch", JSON.stringify(res))
    } else {
      localStorage.setItem("productsearch", JSON.stringify(productdata))
      
    }
    
  }

  const Searchdata = () => {
    window.location.reload(true);
  }
  return (
    <>
      <div className="header">
        <div className="header_text">
          <div className="header_heading"><img src={logo} alt={logo} width={100} height={50} /></div>
        </div>
        <div class="wrap">
          <div class="search">
            <input type="text" class="searchTerm" onChange={(e) => handlechange(e)} value={localStorage.getItem("searchdata")} />
            <button type="submit" class="searchButton" onClick={() => Searchdata()}>
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="d-flex pt-2 ">
          <Link to="/">
            <div className="divpadding">
              <div>Products</div>
            </div>
          </Link>
        </div>


        <Link to="/cart">
          <div className="header_carticon pt-2 mr-2">
            {" "}
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={cartItems?.length} color="secondary">
                <ShoppingCartIcon className="header_Shoppingcart" />
              </StyledBadge>
            </IconButton>
          </div>
        </Link>
        {localStorage.getItem("mobileNo") != null ? <div className="signinhover">

          <div className="signindiv mt-2 ">

            <div className="sign-in " ><i class="fa fa-user-circle-o" aria-hidden="true"></i> {localStorage.getItem("mobileNo") != 'null' && localStorage.getItem("mobileNo")}</div>
          </div>

        </div>
          : <Link to="/login">
            <div className="signindiv mt-2 ">
              <div className="sign-in"><i class="fa fa-sign-in" aria-hidden="true"></i> SignIn / SignUp</div>
            </div>
          </Link>}


        {localStorage.getItem("mobileNo") != null && <div className='logoutdiv' onClick={Logout}> Logout</div>}
      </div>
    </>
  );
}

export default Header;
