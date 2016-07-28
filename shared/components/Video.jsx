import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
    return {
        data: store.data,
        video: store.video
    }
})
export default class Video extends React.Component {
    render() {
        const { data, params, video } = this.props;
        let selectedVideo = {};
        if (data.size !== 0) {
            selectedVideo = (data.filter(selected => selected.id === params.video)).get(0);
        } else {
            selectedVideo = video;
        }
        const sorgente = 'http://localhost:8000/play/' + selectedVideo.id;
        return(
            <div className="container">
                <div className="col-md-12">
                    <h1>Filename: {selectedVideo.name}</h1>
                    <div className="embed-responsive embed-responsive-16by9">
                        <video controls preload="auto" className="embed-responsive-item">
                            <source src={sorgente} type="video/mp4"/>
                        </video>
                    </div>
                    <hr />
                    <p>Path: {selectedVideo.path}</p>
                </div>
            </div>
        )
    }
}