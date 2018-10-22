import React from 'react';
import block from 'bem-cn';

import './Header.scss';

const b = block('header');

class Header extends React.PureComponent {
  render() {
    return (
      <header className={b()}>
        A Header
      </header>
    );
  }
}

export default Header;