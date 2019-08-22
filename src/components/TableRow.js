import React, { Component } from 'react';

class TableRow extends Component {
    render() {
        let { tasks } = this.props
        let rows = tasks.map((task, index) => {
            return (
                <tr key={index}>
                    <td >{index}</td>
                    <td>{task.name}</td>
                    <td>
                        {
                            task.status ? <span className="badge badge-success">On</span> : <span className="badge badge-danger">Off</span>
                        }

                    </td>
                    <td>
                        <div className="row">
                            <div className="col-sm-8 offset-sm-2">
                                <button type="button" className="btn btn-primary btn-sm mr-2"><i className="fas fa-edit    "></i> Edit</button>
                                <button type="button" className="btn btn-danger btn-sm "><i className="fas fa-trash-alt    "></i> Remove</button>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
        return (
            
                {rows}
            
        );
    }
}

export default TableRow;