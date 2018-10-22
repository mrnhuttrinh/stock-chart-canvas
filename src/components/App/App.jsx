import React from 'react';
import { block } from 'bem-cn';
import {Header, Footer, Sidebar, StockChart} from '../';

import './App.scss';

const b = block('app-container');

class App extends React.PureComponent {
  render() {
    return (
      <div className={b()}>
        <Header />
        <div className={b('main')}>
          <Sidebar />
          <StockChart />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;