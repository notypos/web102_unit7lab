import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const DetailsPage = ({ data }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [count, setCount] = useState(0)

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('Comments')
      .select('*')
      .eq('post_id', id);

    if (error) console.error('Error:', error);
    else setComments(data);
  }

  useEffect(() => {
    // Fetch the data for the crewmate
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error('Error:', error);
      else setPost(data);

      setCount(data.upVotes)
    };

    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const newComment = async () => {
    // event.preventDefault();
    const { data, error } = await supabase
      .from('Comments')
      .insert([
        { post_id: id, comment: comment },
      ]);
    setComment('');

    fetchComments();
  }

  function timeAgo(inputTime) {
    const currentTime = new Date();
    const inputDate = new Date(inputTime);
    const timeDifference = currentTime - inputDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }

  const handleKeyDown = (e) => {
    if (e.code == "Enter") {
      newComment()
    }
  }

  const updateCount = async (event) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .update({ upVotes: count + 1 })
      .eq('id', id);

    setCount((count) => count + 1);
  }

  return (
    <div className='card mt-5'>
      <div className='card-body'>
        <span>Posted {timeAgo(post.created_at)}</span>
        <h3 className='mt-4 mb-4'>{post.title}</h3>
        <p>{post.description}</p>
        <span className='btn' onClick={updateCount}>👍</span> {count} upvotes

        <div className='card mt-4 m-comments'>
          <div className='card-body'>
            {comments.map((comment, index) => (
              <div key={index}>
                <div className='mb-2'>- {comment.comment}</div>
              </div>
            ))}
            <input className='form-control' name='comment' value={comment} onChange={e => setComment(e.target.value)} onKeyDown={handleKeyDown} placeholder='Add a comment' />
            {/* <button className='btn btn-primary' onClick={newComment}>Add Comment</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;