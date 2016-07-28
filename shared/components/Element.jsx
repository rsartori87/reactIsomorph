import React from 'react';
import { Link } from 'react-router';

export default class Element extends React.Component {
    render() {
        var immagine = 'http://localhost:8000/thumbnails/' + this.props.immagine;
        return (
            <Link to={`/video/${this.props.codice}`}>
                <img src={immagine} className="img-responsive grid-item" />
            </Link>
        )
    }
}