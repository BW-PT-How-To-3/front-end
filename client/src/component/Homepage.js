import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Inspiration from './Inspiration';
import axios from 'axios';
import styled from 'styled-components';


function Homepage(props) {
    //styles
    document.body.style = 'background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);';

    const CardContainer = styled.div`
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    `;

    const Button = styled.button`
        padding: 100px 100px;
        border-radius: 5px;
        border: 1px solid #2B6BB0;
        color: white;
        background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
        box-shadow: 2px 3px 5px #888888;
        font-weight: 700;
        font-size: 1.5rem;
        cursor: pointer;
        margin: 3% 10px 0 10px;
    `;
    //API info
  const id = '56181269';
  const api = 'cf1c3981fa284467cf7f485194f8545d';
  //https://api.edamam.com/search?q=chicken&app_id=${id}&app_key=${api}

  const [data, setData] = useState([]);
  //2. state for search bar
  const [search, setSearch] = useState('');
  //3. only when search is clicked is when we fetch the data
  const [submit, setSubmit] = useState('chicken')

  useEffect(() => {
    console.log(`useEffect is running`)

    //remember to change the query to your submit state so that whatever the uses submits they'll get data back
    axios
      .get(`https://api.edamam.com/search?q=${submit}&app_id=${id}&app_key=${api}`)
      .then(res => {
        console.log('Response', res.data.hits)
        setData(res.data.hits)
      })
      .catch(err => {
        console.log('Error', err)
      })
  },[submit])

  const changeHandler = e => {
    setSearch(e.target.value) //value of user input
    // console.log(search)//just to see results
  }

  const submitSearch = e => {
    e.preventDefault();
    setSubmit(search);
    setSearch('')//refreshes search once submitted
  }
    
  const styles= {
      margin: '5% 10%'
  }
    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <h4>What would you like to do?</h4>
            <Link to="/create-how-to"><Button className="home-btn">Create a new How-To</Button></Link>
            <Link to="/my-how-tos"><Button className="home-btn">View my How-Tos</Button></Link>
            {/* <Link to="/new-card"><button className="home-btn">Find Inspiration</button></Link> */}

            <h6>Need some inspiration? Search for a hack.</h6>
            {/* Reddit API */}
            <div>
                {/* search */}
                <form onSubmit={submitSearch} className="search-form">
                    <input
                    className="search-bar"
                    type="text"
                    value={search}
                    //anytime input changes, this will run
                    onChange={changeHandler}
                    />
                    <button 
                    className="search-btn"
                    >Search</button>
                </form>
                <CardContainer style={styles}>
                    {
                    data.map(item => (
                        <Inspiration
                        key={item.recipe.label}
                        title={item.recipe.label}
                        calories={Math.round(item.recipe.calories)}
                        image={item.recipe.image}
                        ingredients={item.recipe.ingredients}
                        />
                    ))
                    }
                </CardContainer>
                
                {/* <Switch>
                    <Route exact path="/" component={Recipe}/>
                    <Route path="/item" component={RecipeInfo}/>
                </Switch> */}
                </div>
        </div>
    )
}

export default Homepage;

