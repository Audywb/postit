import React,{ useContext } from 'react'
import {useQuery} from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import {FETCH_POSTS_QUERY} from '../util/graphql'

function Home() {

    const { user } = useContext(AuthContext);
    const {
        loading, 
        data:{ getPosts:posts }={}//ใส่แก้รีเฟรชไม่ได้
    } = useQuery( FETCH_POSTS_QUERY );

    return (

    <Grid columns={1} >
        <Grid.Row className="page-title">
        <div>
             <img style={{width:80,marginTop:20}} src="https://sv1.picz.in.th/images/2021/03/14/D1gs9W.png"/>
             <span style={{marginLeft:4,marginTop:1,color:"grey"}}>Post it</span>
            </div>
        </Grid.Row>
        <Grid.Row>

            {user && (
                <Grid.Column>
                    <PostForm/>
                </Grid.Column>
            )}

            {loading ? (
                <h1>กำลังโหลดน๊าาา</h1>
            ) : (
                <Transition.Group>
                    {posts && posts.map(post =>(
                        <Grid.Column key={post.id} style={{ marginBottom:25 }}>
                            <PostCard post={post}/>
                        </Grid.Column>
                    ))}
                </Transition.Group>
            ) }
        </Grid.Row>
    </Grid>

    );
}


export default Home;