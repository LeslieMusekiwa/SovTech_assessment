import React from 'react'
import { useQuery, gql} from "@apollo/client"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

const Hero_Query = gql`
  query HeroQuery($name: String!){
      Hero(name: $name){
        name
        height
        mass
        gender
        homeworld
      }
    
  }
`

export const Hero = () => {

  const { name} = useParams();

  const { error, data, loading} = useQuery(Hero_Query,{
      variables: { name }
  } );

  console.log({error, loading, data});

  if(loading) return  <div>spinner...</div>;

  if(error) return <div>error.....</div>;



return (
  <div className='characterlist'>
    <hr /><br /><br />
     <h1>Star Wars Characters <Link to={`/`} className="btn btn-secondary">Home</Link>  </h1>  
      {data.Hero?.map((character: any) =>{
          return<div className='card card-body mb-3'>
               <div className='row'>
                  <div className='col-mb-9'>
                      <h2> Star Wars Character: {character.name}</h2>
                      <h3>Character Height: {character.height} </h3>
                      <h3>Character mass: {character.mass} </h3>
                      <h3>Character gender: {character.gender}</h3>
                      <p>Homeworld {character.homeworld}</p>
                  </div>
               </div>
          </div>
      })}
  </div>
)
}