import React, { Component } from "react";

const HOC = WrappedComponent => {
  // eslint-disable-next-line
  class WrapperComponent extends Component {
    render() {
      // eslint-disable-next-line
      const {visible, ...props} = this.props;
      if (visible) {
        return <WrappedComponent {...this.props} />
      } else {
        return null
      }
    }
  }
};

class WrappedComponent extends Component {
  render() {
    return <div visible={true}>hello</div>;
  }
}

export default HOC(WrappedComponent);
