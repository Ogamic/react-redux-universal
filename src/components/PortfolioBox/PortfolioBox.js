import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PortfolioBox extends Component {
    static propTypes = {
        link: PropTypes.string.isRequired,
        projectCategory: PropTypes.string.isRequired,
        projectName: PropTypes.string.isRequired,
        thumbnailUrl: PropTypes.string.isRequired
    }

    render() {
        const styles = require("./PortfolioBox.scss");
        return (
            <a className={styles.portfolioBox} href={this.props.link}>
                <img className="img-fluid" src={this.props.thumbnailUrl} alt="" />
                <div className={styles.portfolioBoxCaption}>
                    <div className={styles.portfolioBoxCaptionContent}>
                        <div className={`${styles.projectCategory} text-faded`}>{this.props.projectCategory}</div>
                        <div className={styles.projectName}>{this.props.projectName}</div>
                    </div>
                </div>
            </a>
        );
    }
}
