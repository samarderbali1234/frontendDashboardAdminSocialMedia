import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
import UserAddModal from "../partials/UserAddModal";
import UserUpdateModal from "../partials/UserUpdateModal";
import { toast, ToastContainer} from "react-toastify";

class Story extends Component {

    constructor(props) {
        super(props);

        this.columns = [/*pour avoir les champs de l'event dans la table*/ 
           
        {
            key: "_id",
            text: "Id",
           
            align: "left",
            bgcolor:"red",
           sortable:true
           
        },
            {
                key: "postedBy",
                text: "Posted by", 
                align: "left",
                sortable:true
            },
            {
                key: "expire_at",
                text: "Expired at", 
                align: "left",
                sortable:true
            },
            
            {
                key: "created",
                text: "Created", 
                align: "left",
                sortable:true
            },
            {
                key: "photo",
                text: "Photo", 
                align: "left",
                sortable:true,
                cell: record => {
                    return (
                        <Fragment>
                            <img src={`http://localhost:5000/api/stories/story/photo/${record._id}`} height="50" width="50" />{/**pour avoir l'image binary de la data base ${record._id} pour avoir l'id `} /post/photo/ c'est une fonction qui est dans le backend pour afficher l'image */}
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

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Stories",
            no_data_text: 'No Story Found',
          
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                created: '',
                expire_at: '',
                postedBy: '',
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

    getData() {
        axios
            .get("/api/stories/story-data")
            .then(res => {
                this.setState({ records: res.data})
            })
            .catch()
    }


    deleteRecord(record) {/* pour supprimer story*/
        axios
            .post("/api/stories/deletestory/",{_id:record._id})
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


    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    
                <UserAddModal/>
                    <UserUpdateModal record={this.state.currentRecord}/>
                <Sidebar/>
                    <div id="page-content-wrapper">

                        <div className="container-fluid">
                          
                       
                            <CardHeader>
                  <CardTitle tag="h4" className="mt-2 text-warning">Stories List</CardTitle>
                </CardHeader>
               
                            <CardBody>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
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
Story.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Story);
