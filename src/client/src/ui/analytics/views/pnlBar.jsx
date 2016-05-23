import React from 'react';
import './analytics.scss';
import numeral from 'numeral';


export default class PNLBar extends React.Component{

  static propTypes = {
    index : React.PropTypes.number,
    model: React.PropTypes.object,
    isPnL: React.PropTypes.bool,
    ratio: React.PropTypes.number,
    containerWidth: React.PropTypes.number
  }

  render(){
    let baseValue = this.props.isPnL ? this.props.model.basePnl : this.props.model.baseTradedAmount;
    let isPositive = baseValue > 0;
    let displayValue = Math.abs(baseValue * this.props.ratio);
    let xPos = isPositive ? this.props.containerWidth/2 : (this.props.containerWidth/2 - displayValue);
    let indicatorClassName = 'analytics__barchart-indicator ';
    indicatorClassName += isPositive ? 'analytics__barchart-indicator--positive' : 'analytics__barchart-indicator--negative';
    let amountStr = numeral(baseValue).format();
    let ccyPrefix = this.props.isPnL ? this.props.model.currencyPair.base : '';
    let indicatorStyle = {left: xPos + 'px', width: displayValue};
    return(
      <div className='analytics__barchart-container'>
        <div>
          <label className='analytics__barchart-label'>{this.props.model.symbol}</label>
          <label className='analytics__barchart-amount'>{ccyPrefix} {amountStr}</label>
          <span className='analytics__barchart-container'>
            <div className='analytics__barchart-bar-background'></div>
            <div className={indicatorClassName} style={indicatorStyle}></div>
            <label className='analytics__barchart-label'></label>
          </span>
        </div>
      </div>
    );
  }
}
