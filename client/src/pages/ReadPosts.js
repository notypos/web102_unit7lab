import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import {supabase} from '../client';

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [orderBy, setOrderBy] = useState('newest'); 

        useEffect(() => {
            const fetchPosts = async () => {
            const {data} = await supabase
            .from('Posts')
            .select()
            .order('created_at', {ascending: false});
           
            setPosts(data);
        };
        fetchPosts();
    }, []);

    useEffect(() => {
            if (orderBy === 'newest') {
                setPosts([...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            } else if (orderBy === 'popular') {
                setPosts([...posts].sort((a, b) => b.upVotes - a.upVotes));
            }
        }, [orderBy]);

    return (
        <div className="mt-5">
           <div className="mb-2">
            Order by: 
            <button className={`btn btn-sm ml-4 + ${orderBy == 'newest' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setOrderBy('newest')}>Newest</button>
            <button className={'btn btn-sm ml-4 ' + (orderBy == 'popular' ? 'btn-primary' : 'btn-outline-primary')} onClick={() => setOrderBy('popular')}>Most Popular</button>
            </div>
            {
                posts && posts.length > 0 ?
                posts.filter(e => e.title.toLowerCase().search(props.query.toLowerCase())>-1).map((post,index) => 
                   <Card id={post.id} title={post.title} key={index} author={post.author} description={post.description} upVotes={post.upVotes}/>
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;