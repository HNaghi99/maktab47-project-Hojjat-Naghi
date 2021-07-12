import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getProducts } from "../../api/Api";
import "./style.css";
import { Box } from "@material-ui/core";

function Home(props) {
  const [groups, setGroups] = React.useState([]);
  let globalArray = [];
  let groupArray = [];
  let previousHeader;
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
    data.then((group) => {
      group.forEach((element, index, array) => {
        const header = element.header;
        if (header !== previousHeader) {
          previousHeader = header;
          if (index !== 0) {
            globalArray.push(groupArray);
            groupArray = [];
          }
        }
        if (header === previousHeader) {
          groupArray.push(element);
        }
        if (index === array.length - 1) {
          globalArray.push(groupArray);
        }
      });
      setGroups(globalArray);
    });
  }, []);
  return (
    <div className="slides-container">
      {groups.map((group) => {
        return (
          <>
            <div className="slide-container">
              <Box
                component={Link}
                className="groups-link"
                to={`/groups/${group[0].group}`}
              >
                کالاهای گروه {group[0].header}
              </Box>
              <Slider {...settings}>
                {group.map((product) => {
                  return (
                    <div>
                      <div className="slider-item">
                        <div className="product-data">
                          <h3>{product.name}</h3>
                          <h3 dir="rtl">{product.price} تومان</h3>
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
