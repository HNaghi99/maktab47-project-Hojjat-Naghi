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
function Home(props) {
  const dispatch = useDispatch();
  const [groups, setGroups] = React.useState([]);
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 5000,
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
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 5000,
        },
      },
    ],
  };
  React.useEffect(() => {
    const dataProvider = async () => {
      return getProducts();
    };
    const data = dataProvider();
    dispatch(loaderAction.displayLoader());
    data.then(async (groups) => {
      const arrayOfGroups = [];
      let groupObject = {};
      for (let i = 0; i < groups.length; i++) {
        const header = groups[i].header;
        const index = groups.findIndex((group) => group.header === header);
        if (i === index) {
          console.log("header is:", header, groups);
          groupObject[`${header}`] = [];
          for (let j = 0; j < groups.length; j++) {
            if (groups[j].header === header) {
              groupObject[`${header}`].push(groups[j]);
            }
          }
          arrayOfGroups.push(groupObject);
          groupObject = {};
        }
      }
      dispatch(loaderAction.hideLoader());
      setGroups(arrayOfGroups);
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
    <div className="slides-container">
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
