import React from 'react';

const DEFAULT_STATE = { golNav: false, };

export const ThemeContext = React.createContext(DEFAULT_STATE);

export default class Provider extends React.Component {
    constructor() {
        super();
        this.state = DEFAULT_STATE;
    }

    toggleNav = () => {
        this.setState({golNav: !this.state.golNav});
    };

  render() {
    return (
      <ThemeContext.Provider 
        value={{
          ...this.state,
          toggleNav: this.toggleNav,
        }}
      > 
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

