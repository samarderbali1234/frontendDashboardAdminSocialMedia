import React, { Component } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutAdmin} from "../../actions/authActions";
import {Link} from "react-router-dom";

class Sidebar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutAdmin();
    };

    render() {
        //const { user } = this.props.auth;
        return (/*sidebar  */
            <div className="border-right h-100" id="sidebar-wrapper">
                <div className="list-group list-group-flush" id="list-wrapper">
                    <Link to="/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                    <Link to="/users" className="list-group-item list-group-item-action">Users</Link>
                    <Link to="/events" className="list-group-item list-group-item-action">Events</Link>
                    <Link to="/Categories" className="list-group-item list-group-item-action">Categories</Link>{/*pour les sides bar pour naviguer vers la pages profiles*/ }
                    <Link to="/posts" className="list-group-item list-group-item-action">Posts</Link>
                    <Link to="/notif" className="list-group-item list-group-item-action">Notifications</Link>{/*pour les sides bar pour naviguer vers la pages profiles*/ }
                    <Link to="/stories" className="list-group-item list-group-item-action">Stories</Link>{/*pour les sides bar pour naviguer vers la pages profiles*/ }

                      {/* si on clique sur icon logout on va exécuter la fn onlogoutclick qui faire l'appel au fn logoutUser*/} 
                    <button className="list-group-item list-group-item-action" onClick={this.onLogoutClick}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></button> 
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutAdmin }
)(Sidebar);
