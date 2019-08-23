import React, { Component } from 'react';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state= {
            sortByName:'',
            sortByStatus:1 //1-all 0-on -1-off
        }
    }
    
    updateStatus = (id) => {
        this.props.updateStatus(id)
    }
    onRemove = (id) => {
        this.props.Remove(id)
    }
    onEdit = (id) => {
        this.props.Edit(id)
    }
    onChange = (event) => {
        let target = event.target
        let name = target.name
        let value = target.value
        this.props.onSearch(
            name==='sortByName'?value:this.state.sortByName,
            name==='sortByStatus'?value:this.state.sortByStatus,
        )
        this.setState({
            [name]: value
        });

    }
    render() {
        let {sortByName, sortByStatus} = this.state
        let { tasks } = this.props;
        let rows = tasks.map((task, index) => {
            return (
                <tr className="d-flex" key={task.id}>
                    <td className="col-1">{index + 1}</td>
                    <td className="col-6">{task.name}</td>
                    <td className="col-2">
                        {
                            task.status ?
                                <span className="badge badge-success" onClick={() => this.updateStatus(task.id)} >On</span> :
                                <span className="badge badge-danger" onClick={() => this.updateStatus(task.id)} >Off</span>
                        }

                    </td>
                    <td className="col-3">
                        <div className="row">
                            <div className="col text-center">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mr-2"
                                    onClick={() => this.onEdit(task.id)}
                                ><i className="fas fa-edit "></i> Edit</button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm "
                                    onClick={() => this.onRemove(task.id)}
                                ><i className="fas fa-trash-alt    "></i> Remove</button>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
        return (
            <tbody>
                <tr className="d-flex">
                    <td className="col-1"></td>
                    <td className="col-6">
                        <input
                            type="text"
                            className="form-control"
                            name="sortByName"
                            value={sortByName}
                            onChange={this.onChange}/>
                    </td>
                    <td className="col-2">
                        <select
                            className="form-control"
                            name="sortByStatus"
                            value={sortByStatus}
                            onChange={this.onChange}
                            >
                            <option value={1}>All</option>
                            <option value={0}>On</option>
                            <option value={-1}>Off</option>

                        </select>

                    </td>
                    <td className="col-3"></td>
                </tr>
                {rows}
            </tbody>
        );
    }
}

export default TableRow;