import React from 'react'
import { useQuery, gql} from "@apollo/client"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useState } from 'react'

const Page_Query = gql`
  query PageQuery($page_num: Int!){
    Page(page_num: $page_num){
      previous
      next
      results{
      name
      height
      mass
      gender
      homeworld
      }
    }
  }
`;

export const Herolists = () => {


  // State to store count value
  const [page_num, setCount] = useState(1); // for pagination
  const [isDisabled, setDisabled] = useState(false);

  // Function to increment count by 1
  const incrementCount = () => {
    // Update state with incremented value
    setCount(page_num + 1);
  };

  const decrementCount = () => {
    //update state with decremented value
    setCount(page_num - 1);
  }


  const { error, data, loading} = useQuery(Page_Query,{
     variables: { page_num }
  } );

  console.log({error, loading, data});

  if(loading) return  <div>spinner...</div>;

  if(error) return <div>error.....</div>;

    const Dis_next = () =>
    {
      if(data.Page.next == null) return true;
      return false;
    }

    const Dis_prev = () => 
    {
      if(data.Page.previous == null) return true;
      return false;
    }

return (
  <div className='characterlist'>
     <h1>Star Wars Characters</h1>  
      {data.Page.results.map((character: any) =>{
          return<div className='card card-body mb-3'>
               <div className='row'>
                  <div className='col-mb-9'>
                      <h3 key={character.name} > Star Wars Character: {character.name}</h3>
                      <p>Homeworld {character.homeworld}</p>
                  </div>
                  <div className="col-md-3">
                     <Link to={`/${character.name}`} className="btn btn-secondary">More Details</Link>
                  </div>
               </div>
          </div>
      })}
      <div>
        <button disabled={ Dis_prev() }  onClick={ decrementCount } >prev</button>
        <button disabled={ Dis_next() } onClick={ incrementCount }>next</button>
      </div>
  </div>
)
}