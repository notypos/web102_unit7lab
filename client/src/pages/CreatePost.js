import React from 'react';
// import './CreatePost.css'
import { useState } from 'react';
import { supabase } from '../client';

const CreatePost = () => {

    const [post, setPost] = useState({ title: "", description: "" })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .insert({ title: post.title, description: post.description })
            .select();
        window.location = "/";
    }
    return (
        <div className='card mt-5 m-form-card'>
            <div className='card-body'>
                <form>
                    <div className='form-group'>
                        <label htmlFor="title">Title</label> <br />
                        <input className='form-control' type="text" id="title" name="title" onChange={handleChange} /><br />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="description">Description</label><br />
                        <textarea className='form-control' rows="5" cols="50" id="description" name="description" onChange={handleChange}>
                        </textarea>
                    </div>
                    <input type="submit" className='btn btn-primary mt-4' value="CREATE" onClick={createPost} />
                </form>
            </div>
        </div>
    )
}

export default CreatePost