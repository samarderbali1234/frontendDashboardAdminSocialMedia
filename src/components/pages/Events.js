import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import {  ToastContainer } from "react-toastify";
import RejectEvent from "../partials/declinesendmesg";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Col,
    Alert,
  } from "reactstrap";

class Events extends Component {



    constructor(props) {
        super(props);
        this.columns = [/*pour avoir les champs de l'event dans la table*/
           
        {
            key: "_id",
            text: "Id",
            sortable:true,
            align: "left",
            bgcolor:"red",
           
           
        },

            {sortable:true,
                key: "title",
                text: "Title",
                className: "title",
                align: "left",
                
                
            },
            {
                key: "starttime",
                text: "Start Time",
                sortable:true,
                align: "left",
               
            },
            {
                key: "endtime",
                text: "End Time",
                sortable:true,
                align: "left",
               
            },
            {
                key: "place",
                text: "Place",
                sortable:true,
                align: "left",
             
            },
            {
                key: "description",
                text: "Description",
                sortable:true,
                align: "left",
               
            },
            {
                key: "date",
                text: "Date",
                sortable:true,
                align: "left",
                
            },
            
            {
                key: "photo",
                text: "Photo",
                sortable:true,
                align: "left",
               
                cell: record => {
                    return (
                        <Fragment>
                            <img src={`http://localhost:5000/api/events/event/photo/${record._id}`} height="50" width="50" />{/**pour avoir l'image binary de la data base ${record._id} pour avoir l'id `} /post/photo/ c'est une fonction qui est dans le backend pour afficher l'image */}
                        </Fragment>
                    );
                }

            },

 

            {
                key: "action",
                text: "Action",
                sortable:true,
                width: 100,
                align: "left",
               
                cell: record => {
                    return (



                        
                        <Fragment>
                      
                      
                      <button
                                className="btn btn-warning btn-sm"
                               
                                onClick={() => this.ApproveRecord(record)}>
                                <i className="fa fa-check"></i>
                            </button>
                            <br/>
                            <button
                             data-toggle="modal"
                             data-target="#update-user-modal"
                                className="btn btn-warning btn-sm"
                                onClick={() => this.RejectRecord(record)}
                                >
                                <i className="fa fa-times"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            filename: "Events",
            no_data_text: 'No Event Found',
           
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
                title: '',
                place: '',
                description: '',
                starttime: '',
                endtime: '',
                date: '',
              
                photo: '',
            }
        };

        this.getData = this.getData.bind(this);
        
        this.ApproveRecord = this.ApproveRecord.bind(this);
    }





    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .get("/api/events/event-data")
            .then(res => {
                console.log('res ==>', res.data)
                this.setState({ records: res.data })
            })
            .catch()
    }
/**pour approver event */
ApproveRecord(record) {
    Alert("event approved")
    axios
        .put(`/api/events/approve/${record._id}`)
        .then (res=> {
          console.log ("data",res.data);
          
        })
        .catch()
  
  }


   
    RejectRecord(record) {// pour rejeter event
        this.setState({ currentRecord: record});
        
               // window.open( "/Decline")//pour avoir la page decline
               
           
           
        
    }
   
    
    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">
                
                    <Sidebar />
              <RejectEvent record ={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            
                            <CardHeader>
                  <CardTitle tag="h4" className="mt-2 text-warning">Events List</CardTitle>
                
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
                    <ToastContainer />
                </div>
            </div>
        );
    }
}
Events.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Events);
