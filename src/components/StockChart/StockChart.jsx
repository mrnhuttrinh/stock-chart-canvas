import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import _ from 'lodash';
import DrawChart from './DrawChart';
import { selectedSymbolSelector, selectedDataSelector, selectedRequestingSelector, selectedErrorSelector } from '../../reducers/selectors';

import './StockChart.scss';

const b = block('stock-chart');

const stockChartId = 'stock-chart';

class StockChart extends React.PureComponent {
  ctx = null;

  componentDidMount() {
    if (this.ctx == null) {
      this.ctx = new DrawChart(stockChartId);
      this.ctx.fillColor().drawYaxis().drawXaxis();
    }
  }

  componentDidUpdate() {
    if (this.ctx) {
      this.ctx.draw(this.props.data);
    }
  }

  render() {
    const { requesting, error } = this.props;
    return (
      <div ref={el => this.parentEl = el} className={b()}>
        {
          !_.isEmpty(error) && (
            <div className={b('error')}>
              {_.map(_.values(error), err => (<span>{err}</span>))}
            </div>
          )
        }
        {requesting && (<div className={b('loading')}>Loading...</div>)}
        <canvas width="1200" height="400" className={b('chart')} id={stockChartId} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    symbol: selectedSymbolSelector(state),
    data: selectedDataSelector(state),
    requesting: selectedRequestingSelector(state),
    error: selectedErrorSelector(state),
  };
}

export default connect(mapStateToProps)(StockChart);