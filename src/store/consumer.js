import React from 'react';
import {ThemeContext} from './providers';

export default class Consumer extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <ThemeContext.Consumer>
        {({golNav, toggleNav}) => {
          return React.Children.map(children, child =>
            React.cloneElement(child, {
              golNav,
              toggleNav,
            })
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

