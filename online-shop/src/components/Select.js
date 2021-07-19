import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getGroups } from "../api/Api";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export function SelectItem(props) {
  const [click, setClick] = React.useState(false);
  const [header, setHeader] = React.useState(null);
  const [subGroup, setSubgroup] = React.useState(null);
  const [subgroupList, setSubgroupList] = React.useState([]);
  const classes = useStyles();
  const [group, setGroups] = React.useState([]);
  const findIndex = (name) => {
    const ListOfNames = [];
    group.forEach((element) => {
      ListOfNames.push(Object.keys(element)[0]);
    });
    return ListOfNames.indexOf(name);
  };
  const handleCountryChange = (e) => {
    const head = e.target.value;
    props.head(head);
    const objectList = group[findIndex(head)][head];
    setHeader(head);
    setSubgroupList(objectList);
    setSubgroup(null);
  };
  const handleLanguageChange = (e) => {
    const name = e.target.value;
    props.group(name);
    setSubgroup(name);
  };
  React.useEffect(() => {
    async function dataProvider() {
      return getGroups();
    }
    const data = dataProvider();
    data.then((groups) => {
      const arrayOfGroups = [];
      let groupObject = {};
      for (let i = 0; i < groups.length; i++) {
        const header = groups[i].header;
        const index = groups.findIndex((group) => group.header === header);
        if (i === index) {
          groupObject[`${header}`] = [];
          for (let j = 0; j < groups.length; j++) {
            if (groups[j].header === header) {
              groupObject[`${header}`].push(groups[j].name);
            }
          }
          arrayOfGroups.push(groupObject);
          groupObject = {};
        }
      }
      setGroups(arrayOfGroups);
    });
  }, []);
  return (
    <div className="select-box">
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">گروه</InputLabel>
        <Select
          native
          value={header}
          onChange={handleCountryChange}
          onClick={() => setClick(true)}
          inputProps={{
            name: "age",
            id: "filled-age-native-simple",
          }}
        >
          <option aria-label="None" value="" disabled={true} selected={true} />
          {group.map((item) => {
            return (
              <option
                //   key={item.id}
                value={Object.keys(item)[0]}
              >
                {Object.keys(item)[0]}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">زیرگروه</InputLabel>
        <Select
          native
          value={subGroup}
          onChange={handleLanguageChange}
          inputProps={{
            name: "age",
            id: "filled-age-native-simple",
          }}
        >
          <option aria-label="None" value="" disabled={true} selected={true} />
          {subgroupList.map((obj) => {
            return <option value={obj}>{obj}</option>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
