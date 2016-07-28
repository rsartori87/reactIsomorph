import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/dataAction';
import Element from './Element';
import Search from './Search';
import Masonry from 'react-masonry-component';

@connect((store) => {
    return {
        data: store.data,
        value: store.value
    }
})
export default class Elenco extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll =(e) => {
        const bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (document.body.scrollHeight === bodyScrollTop + window.innerHeight) {
            this.setState({start: this.state.start + 40});
            this.props.dispatch(AppActions.fetchData({start: this.state.start, key: this.props.value}));
        }
    }

    render() {
        const { data, dispatch, value} = this.props;
        const childElements = data.map((elemento) => {
            return (
                <Element key={elemento.id} codice={elemento.id} immagine={elemento.thumbnail} />
            )
        });
        const opzioni = {
            itemSelector: '.grid-item',
            columnWidth: 200,
            percentPosition: true
        };
        return (
            <div>
                <Search
                    value={value}
                    {...bindActionCreators(AppActions, dispatch)}/>
                <hr />
                <div className="container-fluid">
                    <div className="col-md-12 grid">
                        <Masonry options={opzioni}>{childElements}</Masonry>
                    </div>
                </div>
            </div>
        )
    }
}
