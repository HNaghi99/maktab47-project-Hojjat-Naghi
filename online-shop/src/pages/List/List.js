import React from "react";
import { useParams, link } from "react-router";
import { getProductsofGroup, getGroups } from "../../api/Api";
import Grid from "@material-ui/core/Grid";
import style from "./style.css";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
//add
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { loaderAction } from "../../redux/reducer/loadReducer";
//add
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));
//
function List(props) {
  const dispatch = useDispatch();
  //add
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //
  const { groupName } = useParams();
  const [products, setProducts] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  console.log("route of page:", groupName);
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
  React.useEffect(() => {
    const dataProvider = async () => {
      return getProductsofGroup(groupName);
    };
    const groupProvider = async () => {
      return getGroups();
    };
    dispatch(loaderAction.displayLoader());
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
      dispatch(loaderAction.hideLoader());
    });
  }, [groupName]);
  return (
    <Grid container>
      <Grid item md={2} sm={3} xs={4} className="side-bar">
        <aside>
          {groups.map((group, index) => {
            return (
              <div className="groups-list">
                <Accordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className="accordion-summary"
                  >
                    <Typography className="content">
                      {Object.keys(group)[0]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <ul className="list-of-group">
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
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
        </aside>
      </Grid>
      <Grid item md={10} sm={9} xs={8} className="main-wrapper">
        <Grid container className="main-section">
          {products.map((product) => {
            return (
              <>
                <Grid item md={4} sm={6} xs={12}>
                  <Box
                    component={Link}
                    to={`/product-details/${product.id}`}
                    className="card-container"
                  >
                    <div className="card">
                      <img
                        src={`http://localhost:3004${product.image}`}
                        className="group-img"
                      />
                      <div className="price-and-name">
                        <h3>{product.name}</h3>
                        <h3 dir="rtl">
                          {insertrialcamma(e2p(product.price))}تومان
                        </h3>
                      </div>
                    </div>
                  </Box>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
export { List };
