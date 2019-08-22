import React, { Component } from 'react';

class TaskInfo extends Component {
    onCloseInfoForm = () => this.props.onCloseInfoForm()
    constructor(props) {
        super(props);
        this.state = {
            inputName: '',
            selectStatus: false
        }
    }
    onChange = (event) => {
        let target = event.target
        let name = target.name
        let value = target.value
        if (name === "selectStatus")
            value = target.value === 'true' ? true : false
        this.setState({
            [name]: value
        });

    }
    onSubmitInfo = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state)
    }
    render() {
        return (
            <div className="card">
                <div className="card-header"> Task Info
         <button
                        type="button"
                        className="close"
                        onClick={this.onCloseInfoForm}>
                        <span >×</span>
                    </button>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmitInfo}>
                        <div className="form-group">
                            <label >Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="name"
                                name="inputName"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label >Status</label>
                            <select
                                className="form-control"
                                name="selectStatus"
                                onChange={this.onChange}
                                 value={this.state.selectStatus}
                                >
                                    
                                <option value={true}>On</option>
                                <option value={false}>Off</option>

                            </select>
                        </div>
                        <div className="row">
                            <div className="col-sm-8 offset-sm-2">
                                <div>
                                    <button type="submit" className="btn btn-primary mr-1">Save</button>
                                    <button type="button" className="btn btn-danger">Cancel</button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskInfo;