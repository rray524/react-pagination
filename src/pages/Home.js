import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Typography } from '@mui/material';
import ReactPaginate from 'react-paginate';
import './Home.css'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const postsPerPage = 9;
    const pagesVisited = pageNumber * postsPerPage;

    const displayPosts = posts
        .slice(pagesVisited, pagesVisited + postsPerPage)
        .map((post) => {
            return (
                <Grid item key={post.id} xs={12} sm={4} md={4}>
                    <Card sx={{ maxWidth: "100%" }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {post.title.slice(0, 25)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {post.body.slice(0, 90)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            );
        });

    const pageCount = Math.ceil(posts.length / postsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    // load posts
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
        console.log(posts);
    }, [])

    return (
        <Container>
            <Typography align="center" variant="h1" component="div" gutterBottom>
                Recent Blog Pagination Project
            </Typography>
            <Divider />
            <Box sx={{ m: 5 }} />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {displayPosts}
            </Grid>
            <Box sx={{ m: 8 }} />
            <Grid container sx={{ justifyContent: 'center' }} columns={{ xs: 12, sm: 12, md: 12 }}>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    renderOnZeroPageCount={null}
                />
            </Grid>
            <Box sx={{ m: 15 }} />
        </Container>

    );
};

export default Home;