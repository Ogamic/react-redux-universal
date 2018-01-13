import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { CounterButton, GithubButton } from 'components';
import config from 'config';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect(state => ({
  online: state.online
}))
export default class Home extends Component {
  static propTypes = {
    online: PropTypes.bool.isRequired
  };

  render() {
    const { online } = this.props;

    const styles = require('./styles/creative.scss');
    const imgThumb1 = require('./img/portfolio/thumbnails/1.jpg');
    const imgThumb2 = require('./img/portfolio/thumbnails/2.jpg');
    const imgThumb3 = require('./img/portfolio/thumbnails/3.jpg');
    const imgThumb4 = require('./img/portfolio/thumbnails/4.jpg');
    const imgThumb5 = require('./img/portfolio/thumbnails/5.jpg');
    const imgThumb6 = require('./img/portfolio/thumbnails/6.jpg');

    return (
      <div className="hello">
        <header className={styles.masthead}>
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <h1 className="text-uppercase">
                  <strong>Your Favorite Source of Free Bootstrap Themes</strong>
                </h1>
                <hr />
              </div>
              <div className="col-lg-8 mx-auto">
                <p className="text-faded mb-5">
                  Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download
                  your template and start going, no strings attached!
                </p>
                <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">
                  Find Out More
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className="bg-primary" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="section-heading text-white">We've got what you need!</h2>
                <hr className="light my-4" />
                <p className="text-faded mb-4">
                  Start Bootstrap has everything you need to get your new website up and running in no time! All of the
                  templates and themes on Start Bootstrap are open source, free to download, and easy to use. No strings
                  attached!
                </p>
                <a className="btn btn-light btn-xl js-scroll-trigger" href="#services">
                  Get Started!
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">At Your Service</h2>
                <hr className="my-4" />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-diamond text-primary mb-3 sr-icons" />
                  <h3 className="mb-3">Sturdy Templates</h3>
                  <p className="text-muted mb-0">Our templates are updated regularly so they don't break.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-paper-plane text-primary mb-3 sr-icons" />
                  <h3 className="mb-3">Ready to Ship</h3>
                  <p className="text-muted mb-0">You can use this theme as is, or you can make changes!</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-newspaper-o text-primary mb-3 sr-icons" />
                  <h3 className="mb-3">Up to Date</h3>
                  <p className="text-muted mb-0">We update dependencies to keep things fresh.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-heart text-primary mb-3 sr-icons" />
                  <h3 className="mb-3">Made with Love</h3>
                  <p className="text-muted mb-0">You have to make your websites with love these days!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="p-0" id="portfolio">
          <div className="container-fluid p-0">
            <div className="row no-gutters popup-gallery">
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href="#">
                  <img className="img-fluid" src={imgThumb1} alt="" />
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <div className="project-category text-faded">Category</div>
                      <div className="project-name">Project Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href="img/portfolio/fullsize/2.jpg">
                  <img className="img-fluid" src={imgThumb2} alt="" />
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <div className="project-category text-faded">Category</div>
                      <div className="project-name">Project Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href="img/portfolio/fullsize/3.jpg">
                  <img className="img-fluid" src={imgThumb3} alt="" />
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <div className="project-category text-faded">Category</div>
                      <div className="project-name">Project Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href="img/portfolio/fullsize/4.jpg">
                  <img className="img-fluid" src={imgThumb4} alt="" />
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <div className="project-category text-faded">Category</div>
                      <div className="project-name">Project Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href="img/portfolio/fullsize/5.jpg">
                  <img className="img-fluid" src={imgThumb5} alt="" />
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <div className="project-category text-faded">Category</div>
                      <div className="project-name">Project Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href="img/portfolio/fullsize/6.jpg">
                  <img className="img-fluid" src={imgThumb6} alt="" />
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <div className="project-category text-faded">Category</div>
                      <div className="project-name">Project Name</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-dark text-white">
          <div className="container text-center">
            <h2 className="mb-4">Free Download at Start Bootstrap!</h2>
            <a className="btn btn-light btn-xl sr-button" href="http://startbootstrap.com/template-overviews/creative/">
              Download Now!
            </a>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="section-heading">Let's Get In Touch!</h2>
                <hr className="my-4" />
                <p className="mb-5">
                  Ready to start your next project with us? That's great! Give us a call or send us an email and we will
                  get back to you as soon as possible!
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 ml-auto text-center">
                <i className="fa fa-phone fa-3x mb-3 sr-contact" />
                <p>123-456-6789</p>
              </div>
              <div className="col-lg-4 mr-auto text-center">
                <i className="fa fa-envelope-o fa-3x mb-3 sr-contact" />
                <p>
                  <a href="mailto:your-email@your-domain.com">feedback@startbootstrap.com</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
