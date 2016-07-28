import React from 'react';

export default class Search extends React.Component {

    handleEnter = (e) => {
        if (e.keyCode == 13) {
            this.handleClick();
        }
    }

    handleClick = () => {
        this.props.searchData({key: this.props.value});
    }

    handleChange = () => {
        let node = this.refs['search-input'];
        this.props.valueChange(node.value);
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-4 col-md-offset-4">
                    <h2>Ricerca</h2>
                    <div className="form-group">
                        <label htmlFor="search">Search</label>
                        <input
                            name="search"
                            type="text"
                            placeholder="Search"
                            value = {this.props.value}
                            onChange={this.handleChange}
                            ref="search-input"
                            onKeyDown={this.handleEnter}
                            className="form-control"/>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleClick}>Submit</button>
                </div>
            </div>
        )
    }
}
