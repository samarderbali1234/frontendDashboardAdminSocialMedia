import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";

import UserAddModal from "../partials/UserAddModal";
import UserUpdateModal from "../partials/UserUpdateModal";
import Image from 'react-bootstrap/Image';
//import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer} from "react-toastify";

import MUIDataTable from 'mui-datatables';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
class Users extends Component {

    constructor(props) {
        super(props);

        this.columns = [/*les champs qui sont trouvés dans la table */ 
            {
                key: "_id",
                text: "Id",
               
                align: "left",
                bgcolor:"red",
               sortable:true
               
            },
            {
                key: "username",
                text: "UserName",
                className: "username",
                align: "left",
                sortable:true
            },
           
            {
                key: "email",
                text: "Email",
                className: "email",
                align: "left",
                sortable:true
            },
            {
                key: "phoneNumber",
                text: "PhoneNumber",
                className: "phoneNumber",
                align: "left",
                sortable:true
            },
            {
                key: "photo",
                text: "Photo",
                className: "photo",
                align: "left",
                sortable:true,
                cell: record => {
                    return (
                        <Fragment>
                            <img src={`http://localhost:5000/api/users/user/photo/${record._id}`} height="50" width="50" roundedCircle />{/**pour avoir l'image binary de la data base ${record._id} pour avoir l'id `} /post/photo/ c'est une fonction qui est dans le backend pour afficher l'image */}
                        </Fragment>
                    );
                }
            },
            
            {
                key: "action",
                text:"Action",
                className:"action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            
                            <button
                                className="btn btn-warning btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

       
this.options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    print: true,
    rowsPerPage: 10,
    page: 1
  };
        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                username: '',
                email: '',
              phoneNumber: '',
                photo: '',
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {/* pour lister tous user*/
        axios
            .get("/api/users/user-data")
            .then(res => {
                this.setState({ records: res.data})
            })
            .catch()
    }

    deleteRecord(record) {
        axios
            .post("/api/users/user-delete", {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
    }

    render() {
        
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    
                    <UserAddModal/>
                    <UserUpdateModal record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                   
            
                            <CardHeader>
                  <CardTitle tag="h4" className="mt-2 text-warning">Users List</CardTitle>
                </CardHeader>
               
                            <CardBody>
                         
                            <ReactDatatable id="reactdatatable"
                                records={this.state.records}
                                columns={this.columns}
                                options={this.options}
                            />
                                </CardBody>
                                
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

Users.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(/* consulte  la liste de user sauf que faire le login*/
    mapStateToProps
)(Users);
