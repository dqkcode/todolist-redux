import React, { Component } from 'react';

class TaskControls extends Component {
    
    
    render() {
        return (
            <div className="row">
                <button type="button" className="col-sm-2 btn btn-info m-1 float-left"><i className="fas fa-plus-square"> </i> Add Task</button>
                <div className="col-sm-9 m-1">
                    <div className="row">
                        <input type="text" className="col-sm-8 form-control" />
                        <button type="button" className="btn btn-outline-info mr-1"> <i className="fas fa-search " /> Search</button>
                        <button type="button" className="btn btn-outline-info" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fas fa-sort "></i> Sort</button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/">A->Z Name <i className="fas fa-check-circle "></i></a>
                            <a className="dropdown-item" href="/">Z->A Name</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="/">On status</a>
                            <a className="dropdown-item" href="/">Off status</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskControls;