import React, { Component } from 'react';

class TaskInfo extends Component {
    onCloseInfoForm = () => this.props.onCloseInfoForm()
    constructor(props) {
        super(props);
        this.state = {
            id:'',
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
        this.onCancel()
        this.onCloseInfoForm()
    }
    onCancel = () => {
        this.setState({
            inputName: '',
            selectStatus: true
        })
        this.onCloseInfoForm()
    }
    UNSAFE_componentWillMount(){
        if(this.props.objectEdit){
            this.setState({
                id:this.props.objectEdit.id,
                inputName:this.props.objectEdit.name,
                selectStatus:this.props.objectEdit.status
            });
        }
        
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        if(nextProps && nextProps.objectEdit){
            // console.log('nexprops :', nextProps);
            this.setState({
                id:nextProps.objectEdit.id,
                inputName:nextProps.objectEdit.name,
                selectStatus:nextProps.objectEdit.status
            });
        }else if(!nextProps.objectEdit){
                this.setState({
                        id:'',
                        inputName: '',
                        selectStatus: false
                })
        }
    }
    render() {
        let {id} = this.state       
        // console.log('id :', id);
        return (
           
            <div className="card">
                <div className="card-header"> {id!==''?"Edit task":"Add new task"}
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
                                value={this.state.inputName}
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
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={this.onCancel}
                                    >Cancel</button>
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