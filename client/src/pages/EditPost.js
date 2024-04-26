import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import './EditPost.css'
import { useState } from 'react';
import { supabase } from '../client';

const EditPost = ({data}) => {
  const navigate = useNavigate();
    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .update({ title: post.title, description: post.description})
          .eq('id', id);
      
          navigate('/')
        //window.location = "/";
      }

      const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .delete()
          .eq('id', id);
      
        window.location = "http://localhost:3000/";
      }
    return (
      <div className='card mt-5 m-form-card'>
            <div className='card-body'>
            <form>
            <div className='form-group'>
                <label htmlfor="title">Title</label> <br />
                <input className="form-control" type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
            </div>
            <div className='form-group'>
                <label htmlfor="description">Description</label><br />
                <textarea className='form-control' rows="5" cols="50" id="description" name= "description" value={post.description} onChange={handleChange} >
                </textarea>
            </div>
                <input type="submit" className='btn btn-primary mt-4' value = "Edit" onClick={updatePost}/>
                <button className="btn btn-danger mt-4" onClick={deletePost}>Delete</button>
            </form>
        </div>
    </div>
    )
}

export default EditPost