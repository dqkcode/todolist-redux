import React, { Component } from 'react';

class TaskControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTxtKeyword: "",
            sortType:{
                type:'name',
                value:'az'
            }
        }
    }

    onChange = (event) => {
        let target = event.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        });
        if(value==='')
             this.props.searchOnFormControl('')
        
    }

    onSearch = () => {
        this.props.searchOnFormControl(this.state.inputTxtKeyword)
    }
    onSort=(typeName,typeValue) => {
        this.setState({
            sortType:{
                type:typeName,
                value:typeValue
            }
        });
        this.props.onSort(typeName,typeValue)
    }
    render() {
        let { 
            inputTxtKeyword, 
            sortType
            
        } = this.state
        // console.log('this.state render() :', this.state);
        return (
           
            <div className="col-sm-9 m-1">
                <div className="row">
                    <input
                        type="text"
                        className="col-sm-8 form-control"
                        name="inputTxtKeyword"
                         placeholder="Enter your key word ...."
                         value={inputTxtKeyword}
                        onChange={this.onChange}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-info mr-1"
                        value={this.state.word}
                        onClick={this.onSearch}
                    > <i className="fas fa-search " /> Search</button>
                    <button type="button" className="btn btn-outline-info" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fas fa-sort "></i> Sort</button>
                    <div className="dropdown-menu">
                        <button onClick={()=>this.onSort('name','az')} type="button" className="dropdown-item">A->Z Name &nbsp; {(sortType.type==='name' && sortType.value==='az')?<i className="fas fa-check-circle"></i>:''}</button>
                        <button onClick={()=>this.onSort('name','za')} type="button" className="dropdown-item">Z->A Name &nbsp; {(sortType.type==='name' && sortType.value==='za')?<i className="fas fa-check-circle"></i>:""}</button>
                        <div className="dropdown-divider" />
                        <button onClick={()=>this.onSort('status','on')} type="button" className="dropdown-item">On status &nbsp; {(sortType.type==='status' && sortType.value==='on')?<i className="fas fa-check-circle"></i>:""}</button>
                        <button onClick={()=>this.onSort('status','off')} type="button" className="dropdown-item">Off status &nbsp; {(sortType.type==='status' && sortType.value==='off')?<i className="fas fa-check-circle"></i>:""}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskControls;