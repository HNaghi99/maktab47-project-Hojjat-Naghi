import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
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
  const [obj, setObj] = React.useState(null);
  const [objList, setObjList] = React.useState([]);
  const classes = useStyles();
  const [group, setGroups] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });
  let globalData = [];
  let groupArray = [];
  let previousHeader;
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
    console.log("obj is:", e.target.value);
    const objectList = group[findIndex(head)][head];
    console.log("OBJECT list is:", objectList);
    setHeader(head);
    setObjList(objectList);
    setObj(null);
  };
  const handleLanguageChange = (e) => {
    const name = e.target.value;
    props.group(name);
    setObj(name);
  };
  React.useEffect(() => {
    async function dataProvider() {
      return getGroups();
    }
    const data = dataProvider();
    data.then((group) => {
      group.forEach((element, index, array) => {
        const header = element.header;
        const name = element.name;
        if (previousHeader !== header) {
          const objOfData = {};
          if (index !== 0) {
            objOfData[`${previousHeader}`] = groupArray;
            globalData.push(objOfData);
          }
          previousHeader = header;
          groupArray = [];
        }
        if (previousHeader === header) {
          groupArray.push(name);
        }
        if (index === array.length - 1) {
          const objOfData = {};
          objOfData[`${previousHeader}`] = groupArray;
          globalData.push(objOfData);
        }
      });
      setGroups(globalData);
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
          value={obj}
          onChange={handleLanguageChange}
          inputProps={{
            name: "age",
            id: "filled-age-native-simple",
          }}
        >
          <option aria-label="None" value="" disabled={true} selected={true} />
          {objList.map((obj) => {
            return <option value={obj}>{obj}</option>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
