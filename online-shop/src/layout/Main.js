import { Component } from "react";
import PrivateHeader from "./components/PrivateHeader/PrivateHeader";
import PublicHeader from "./components/PublicHeader/PublicHeader";
class Main extends Component {
  render() {
    return (
      <>
        {this.props.isPublic ? <PublicHeader /> : <PrivateHeader />}
        {this.props.children}
      </>
    );
  }
}
export { Main };
