import React from 'react';
import block from 'bem-cn';

import './Footer.scss';

const b = block('footer');

class Footer extends React.PureComponent {
  render() {
    return (
      <footer className={b()}>
        A Footer
      </footer>
    );
  }
}

export default Footer;