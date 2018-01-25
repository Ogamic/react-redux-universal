import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TransactionList = props => {
  const { trans } = props;

  return (
    <ul className="transaction-list">
      {trans && trans.map(tran => (
        <li className="item" key={tran.id}>
          <div className="main-info">
            <span className="description">{tran.description}</span>
            <span className="value">{tran.amount}</span>
          </div>
          <div className="sub-info">
            <span className="category">{tran.category}</span>
            <span className="time">{tran.time}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

TransactionList.propTypes = {
  trans: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    value: PropTypes.string,
    category: PropTypes.string,
    time: PropTypes.string
  })).isRequired
};

export default class LoggedInHomepage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleJarClick = jarName => () => {
    console.log(jarName);
    this.context.router.history.push('/spend');
  };

  render() {
    const trans = [{
      id: 1,
      description: 'ATM Withdrawal Bank',
      amount: '- $40.00',
      category: 'Bank & Cash',
      time: 'Jan 25 2018'
    },
    {
      id: 2,
      description: 'Buy Coffee',
      amount: '- $2',
      category: 'Food',
      time: 'Jan 24 2018'
    }];

    const styles = require('./LoggedInHomepage.scss');
    const chartImg = require('./column-chart.png');
    return (
      <section className={styles.loggedInSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="overview widget">
                <div className="widget-title">
                  <span>Account Overview</span>
                </div>
                <div className="widget-container">
                  <ul className="item-wrapper vertical-list">
                    <li className="item">
                      <span className="item-name">Current</span>
                      <span className="item-value">500,000,000</span>
                    </li>
                    <li className="item">
                      <span className="item-name">Predict</span>
                      <span className="item-value">800,000,000</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-8">
                  <div className="chart widget">
                    <div className="widget-title">
                      <span>Chart</span>
                    </div>
                    <div className="widget-container">
                      <img src={chartImg} alt="chart" width="100%" />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="inout widget">
                    <div className="widget-title">
                      <span>6 Jars</span>
                    </div>
                    <div className="widget-container">
                      <ul className="item-wrapper horizontal-list">
                        <li className="item">
                          <span className="item-name">NEC</span>
                          <span className="item-value">55%</span>
                        </li>
                        <li className="item">
                          <span className="item-name">EDU</span>
                          <span className="item-value">10%</span>
                        </li>
                        <li className="item">
                          <span className="item-name">PLY</span>
                          <span className="item-value">10%</span>
                        </li>
                        <li className="item">
                          <span className="item-name">LTS</span>
                          <span className="item-value">10%</span>
                        </li>
                        <li className="item">
                          <span className="item-name">FFA</span>
                          <span className="item-value">10%</span>
                        </li>
                        <li className="item">
                          <span className="item-name">GIV</span>
                          <span className="item-value">05%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="chart widget">
                    <div className="widget-title">
                      <span>Recent Transactions</span>
                    </div>
                    <div className="widget-container">
                      <TransactionList trans={trans} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
