import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import {backendServer} from '../../webConfig'

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: "All",
            addresses: [],
            cards: [],
            cart: [],
            name: null,
            searchValue: "",
            redirect: false
        }
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('type');
    }

    componentDidMount() {
        axios.get(`${backendServer}/user/getUserDetails/${localStorage.getItem('id')}`)
            .then(response => {
                let data = response.data.data;
                if(localStorage.getItem('type')==='Customer'){
                    this.setState({
                        addresses: data.addresses,
                        cards: data.cards,
                        cart: data.cart,
                    })
                }
                this.setState({
                   name: data.name
                })
               
            }
            ).catch(ex => {
                alert(ex);
            });
            if(localStorage.getItem('type')==='Customer'){
                axios.get(`${backendServer}/category/getAllCategories`)
                .then(response => {
                        this.setState({
                            categories : response.data.data
                        })
                    }
                ).catch( ex =>{
                   alert(ex);
                });
            }
            
    }

    componeneDidUpdate() {
        if (this.stat.redirect) {
            this.setState({
                redirect: false
            })
        }
    }
    categoriesChangeHandler = (e) => {
        this.setState({
            selectedCategory: e.target.value
        })
    }

    searchChangeHandler = (e) => {
        this.setState({
            searchValue: e.target.value,
            redirect: false
        })
    }

    submitSearch = () => {
        if (this.state.searchValue) {
            this.setState({
                redirect: true
            })
        }

    }

    render() {
        let navLinks = null;
        let navLinkBottom = null;
        if (localStorage.getItem('type') === 'Customer') {
            navLinks = (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/product-search">{this.state.name}</Link></li>
                    <li><a onClick={this.handleLogout}>Logout</a></li>
                    <li><Link to="/carthome"><span><i className="icon-shopping-cart icon-2x"></i></span><span className="badge badge-light">{this.state.cart.length}</span></Link></li>
                </ul>
            );

            navLinkBottom = (
                <div className="row">
            <div className="col-sm-2 white">
                <span><i className="glyphicon glyphicon-map-marker"></i> Deliver to <b> {this.state.addresses.length > 0 ? this.state.addresses[0].city+ " " +this.state.addresses[0].zipcode : "No address added" } </b></span>
            </div>
                <div className="col-sm-7">
                    <ul className="nav navbar-nav xshop">
                        <li><Link to="/company/postings">Your Reviews</Link></li>
                        <li><Link to="">New Releases</Link></li>
                        <li><Link to="/orders">Orders</Link></li>
                        <li><Link to="/company/students">Link 2</Link></li>
                        <li><Link to="/company/events">Link 3</Link></li>

                    </ul>
                </div>
                
                </div>
            );
        }
        else if(localStorage.getItem('type')==='Admin'){
            navLinks = (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/product-search">{this.state.name}</Link></li>
                    <li><a onClick={this.handleLogout}>Logout</a></li>
                </ul>
            );

            navLinkBottom = (
                <div className="container-fluid">
                <div className="col-sm-offset-2 col-sm-7">
                    <ul className="nav navbar-nav xshop">
                        <li><Link to="/admin-dashboard">Dashboard</Link></li>
                        <li><Link to="/admin-category">categories</Link></li>
                        <li><Link to="/list-sellers">Sellers</Link></li>
                        <li><Link to="#">Orders</Link></li>
                    </ul>
                </div>
                <div className="col-sm-3">&nbsp;</div>
                </div>
            )

        }


        //if Cookie is set render Logout Button
        let navLogin = null;
        if (localStorage.getItem('id')) {
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            navLogin = (
                <ul className="nav navbar-nav col-sm-3">
                    <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        let categoriesDropDownOptions = this.state.categories.map(c => {
            return (
                <li className="li-dropdown" key={c.category}><button className="btn btn-link" onClick={this.categoriesChangeHandler} value={c.category}> {c.category} </button></li>
            )
        });
        if (this.state.redirect) {
            let link = "/product-search?name=" + this.state.searchValue + "&category=" + this.state.selectedCategory;
            redirectVar = <Redirect to={link} />
        }
        return (
            <div className="nopadding">
                {redirectVar}
                <nav className="navbar navbar-top">
                    <div className="container-fluid">
                        <div className="navbar-header col-sm-2 nopadding">
                            <a className="navbar-brand " href="#"><img className="navbar-brand__logo-full" src="../images/amazon-logo.png" /></a>
                        </div>
                        <div className="navbar-header col-sm-7">
                            <div className="input-group">
                                <div className="input-group-btn search-panel">
                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                        <span id="search_concept">{this.state.selectedCategory}</span> <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" role="menu">
                                        {categoriesDropDownOptions}
                                    </ul>
                                </div>
                                <input type="text" className="form-control searchbox" placeholder="Search term..." onChange={this.searchChangeHandler} value={this.state.searchValue} />
                                <span className="input-group-btn">
                                    <button className="btn btn-default searchbutton" type="button" onClick={this.submitSearch}><span className="glyphicon glyphicon-search"></span></button>
                                </span>
                            </div>

                            {/* <select onChange={this.categoriesChangeHandler} className="form-control departments">{categoriesDropDownOptions}</select>
                <input className="form-control searchbox" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3 searchbutton" type="submit">Search</button>
            </form> */}
                        </div>
                        {navLinks}
                        {navLinkBottom}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;