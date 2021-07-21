import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getProducts } from "../../api/Api";
import "./style.css";
import { Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loaderAction } from "../../redux/reducer/loadReducer";
import { useSelector } from "react-redux";
function Home(props) {
  const dispatch = useDispatch();
  const loadStatus = useSelector((state) => state.loader.loadStatus);
  const [counter, setCounter] = React.useState(0);
  if (counter === 0) dispatch(loaderAction.displayLoader());
  const loadClass = loadStatus ? `hiding` : `showing`;
  const ContentClasses = `slides-container ${loadClass}`;
  console.log("COUNTER", counter);
  const [groups, setGroups] = React.useState([]);
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 10000,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 10000,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 10000,
        },
      },
    ],
  };
  React.useEffect(() => {
    const dataProvider = async () => {
      return getProducts();
    };
    const data = dataProvider();
    // dispatch(loaderAction.displayLoader());
    data.then(async (groups) => {
      var filter = {
        stock: "0",
        price: "0",
      };
      const arrayOfProducts = Object.values(groups);
      const filteredProducts = arrayOfProducts.filter((product) => {
        for (var key in filter) {
          if (product[key] === filter[key]) return false;
          else return product;
        }
      });
      const arrayOfGroups = [];
      let groupObject = {};
      for (let i = 0; i < filteredProducts.length; i++) {
        const header = filteredProducts[i].header;
        const index = filteredProducts.findIndex(
          (group) => group.header === header
        );
        if (i === index) {
          console.log("header is:", header, filteredProducts);
          groupObject[`${header}`] = [];
          for (let j = 0; j < filteredProducts.length; j++) {
            if (filteredProducts[j].header === header) {
              groupObject[`${header}`].push(filteredProducts[j]);
            }
          }
          arrayOfGroups.push(groupObject);
          groupObject = {};
        }
      }
      setGroups(arrayOfGroups);
      setCounter(counter + 1);
      dispatch(loaderAction.hideLoader());
    });
  }, []);
  const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  function insertrialcamma(n) {
    var m = "";
    for (var i = 0; i < n.length; i++) {
      var c = n.substr(n.length - i - 1, 1);
      if ((i % 3 == 0) & (i > 0)) {
        m = c + "," + m;
      } else {
        m = c + m;
      }
    }
    return m;
  }
  return (
    <div className={ContentClasses}>
      {groups.map((group) => {
        return (
          <>
            <div className="slide-container">
              <Box
                component={Link}
                className="groups-link"
                to={`/groups/${Object.values(group)[0][0]["group"]}`}
              >
                کالاهای گروه {Object.keys(group)[0]}
              </Box>
              <Slider {...settings}>
                {Object.values(group)[0].map((product) => {
                  return (
                    <div>
                      <div className="slider-item">
                        <div className="product-data">
                          <h3>{product.name}</h3>
                          <h3 dir="rtl">
                            {insertrialcamma(e2p(product.price))} تومان
                          </h3>
                        </div>
                        <img
                          src={"http://localhost:3004".concat(
                            "",
                            product.image
                          )}
                          alt="تصویر محصول"
                          width="130px"
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </>
        );
      })}
    </div>
  );
}
export { Home };
