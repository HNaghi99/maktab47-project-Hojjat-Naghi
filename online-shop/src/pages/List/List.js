import React from "react";
import { useParams, link } from "react-router";
import { getProductsofGroup, getGroups } from "../../api/Api";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
function List(props) {
  const { groupName } = useParams();
  const [products, setProducts] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  console.log("route of page:", groupName);
  React.useEffect(() => {
    const dataProvider = async () => {
      return getProductsofGroup(groupName);
    };
    const groupProvider = async () => {
      return getGroups();
    };
    const groups = groupProvider();
    groups.then((groups) => {
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
              groupObject[`${header}`].push(groups[j].name);
            }
          }
          arrayOfGroups.push(groupObject);
          groupObject = {};
          console.log("GLOBAL ARRAY IS:", arrayOfGroups);
        }
      }
      setGroups(arrayOfGroups);
    });
    const products = dataProvider();
    products.then((products) => {
      console.log("products are:", products, groupName);
      setProducts(products);
    });
  }, [groupName]);
  return (
    <Grid container>
      <Grid item md={2} sm={3} xs={4}>
        <aside>
          {groups.map((group) => {
            return (
              <div className="groups-list">
                <h3>{Object.keys(group)[0]}</h3>
                <ul>
                  {Object.values(group)[0].map((subGroup) => {
                    if (subGroup === groupName)
                      return (
                        <li>
                          <Box
                            component={Link}
                            to={`/groups/${subGroup}`}
                            className="group-link selected"
                          >
                            {subGroup}
                          </Box>
                        </li>
                      );
                    else
                      return (
                        <li>
                          <Box
                            component={Link}
                            to={`/groups/${subGroup}`}
                            className="group-link"
                          >
                            {subGroup}
                          </Box>
                        </li>
                      );
                  })}
                </ul>
              </div>
            );
          })}
        </aside>
      </Grid>
      <Grid item md={10} sm={9} xs={8}>
        <Grid container>
          {products.map((product) => {
            return (
              <Grid item md={4} sm={6} xs={12}>
                <Box
                  component={Link}
                  to={`/product-details/${product.id}`}
                  className="card-container"
                >
                  <div className="card">
                    <img src={`http://localhost:3004${product.image}`} />
                    <div className="price-and-name">
                      <h3>{product.name}</h3>
                      <h3 dir="rtl">{product.price}تومان</h3>
                    </div>
                  </div>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
export { List };
