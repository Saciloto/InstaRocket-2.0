import React, {useState,useEffect} from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

export default function Feed(){

    const [feed, setFeed] = useState([])

    useEffect(() => {
        async function registerToSocket(){
            const socket = io('http://localhost:3333');
        
            socket.on('post', newPost =>{
                setFeed([newPost,...feed])
            })
    
            //Pega o id do post clicado e compara se é o que foi dado like, e atualiza
            await socket.on('like', likedPost =>{
                setFeed(feed.map(post =>
                    post._id === likedPost._id ? likedPost : post)
                )
            })
        };
        async function loadPosts(){ 
        const response = await api.get('/posts');
        
        setFeed(response.data);
    };
        registerToSocket();
        loadPosts();

    },[feed])

    //pega os dados do feed e adiciona um novo e depois carrega os antigos
    

    function handleLike(id){
        api.post(`/posts/${id}/like`);
    }

    return(
        <section id="post-list">
            {feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>
                        <img src={more} alt="Mais" />
                    </header>
                    <img src={`http://localhost:3333/files/${post.image}`} alt={post.author}/>
                    <footer>
                        <div className="actions">
                            <button type='button' onClick={() => handleLike(post._id)}> 
                                <img src={like} alt=""/>
                            </button>
                            <img src={comment} alt=""/>
                            <img src={send} alt=""/>
                        </div>

                        <strong>{post.likes} Curtidas </strong>
                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
            ))}
        </section>
        );
}