import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddBookmark = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({ url: '', title: '' });

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmarks/add', formData);
        history.push('/mybookmarks');
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Add Bookmark</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={formData.title} type="text" name="title" placeholder="Title" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={formData.url} type="text" name="url" placeholder="Url" className="form-control" />
                    <br />
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    )

}


export default AddBookmark;