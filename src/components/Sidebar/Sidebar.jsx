import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as actions from '../../actions';
import { selectedSymbolSelector } from '../../reducers/selectors';

import { menu } from './constants';

import './Sidebar.scss';

const b = block('side-bar');

class Sidebar extends React.PureComponent {
  componentDidMount() {
    const { symbol } = this.props;
    this.getData(symbol);
  }

  render() {
    const { symbol } = this.props;
    return (
      <nav className={b()}>
        {_.map(menu, x => (
          <span
            key={`${x.order}_${x.symbol}`}
            onClick={() => this.handleOnClick(x.symbol)}
            className={b('item', {active: x.symbol.toLowerCase() === symbol.toLowerCase()})}
          >{x.symbol}</span>
          ))
        }
      </nav>
    );
  }

  handleOnClick(symbol) {
    this.getData(symbol);
  }

  getData(symbol) {
    const { selectSymbol } = this.props.actions;
    selectSymbol(symbol);
  }
}

const mapStateToProps = (state) => {
  return {
    symbol: selectedSymbolSelector(state),
  };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
