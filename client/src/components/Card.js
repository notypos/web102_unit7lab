import React, { useEffect } from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link, NavLink } from 'react-router-dom'
import { supabase } from '../client';



const Card = (props) =>  {


  return (
    
    <div className='card mb-4'>
    <div className='card-body p-4 px-5'>
    <Link to={'/edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
    <Link to = {'/details/'+ props.id}className="cardLink"><h2 className="">{props.title}</h2>
    </Link>
          <p className="">{props.description}</p>
         <span>{props.upVotes} upvotes</span>
    </div>
      </div>
  );
};

export default Card;