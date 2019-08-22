import React, { Component } from 'react';

class TaskInfo extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header"> Task Info </div>
                <div className="card-body">
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" placeholder="name" />
                    </div>
                    <div className="form-group">
                        <label >Status</label>
                        <select className="form-control" name="">
                            <option value={true}>On</option>
                            <option value={false}>Off</option>

                        </select>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2">
                            <div>
                                <button type="button" className="btn btn-primary mr-1">Save</button>
                                <button type="button" className="btn btn-danger">Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskInfo;