import React , { useState } from 'react';
import {Link} from 'react-router-dom'
import '../assets/style.css'

 const Match_Card = (props) => {
    const [match_id , setMatch_id] = useState(0);
    // let matchid = 0;

     const onMatchClicked = (id) => {
        setMatch_id(id);
        console.log('Checking props',props)
     }

     
        return(
            <div className='ui celled list' key={props.id}>
                
            <div className='item' onClick={() => onMatchClicked(props.match.id)} style={{'opacity':'0.7','z-index':'10'}} >
                <Link to={{ pathname:`/league/${props.id}/${props.match.event_id}`, query: {match_id: `${props.id}`,event_id:`${props.match.event_id}`} }}>
                    <div className='ui three cards' >
                
        
                        <div className="ui card" >
                            <div className="ui center aligned content">
                            <img className='ui tiny image' src={props.match.t1_image}/>
                            <div className="header">{props.match.t1_name}</div>
                            </div>
                        </div>

                        <div className='ui card'>
                            <img src='https://image.freepik.com/free-vector/vs-versus-icon-logo-battle-fight-game_212005-461.jpg' style={{'width':'100%','height':'120px'}}/>
                            <div className='ui center aligned content'>
                            <h2>{props.match.match_status}</h2>
                            {props.match.match_date}
                            </div>
                        </div>

                        <div className='ui card'>
                            <div className="ui center aligned content">
                            <img className='ui tiny image' src={props.match.t2_image} /> 
                            <div className="header">{props.match.t2_name}</div>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
               
            </div>
        );
        

       
    
}

export default Match_Card;

// //{ id,
// match_name,
// match_status,
// match_result,
// match_type,
// match_date,
// t1_name,
// t2_name,
// t1_image,
// t2_image }