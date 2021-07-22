import React from 'react';
import {BrowserRouter , Route } from 'react-router-dom';

import Create_Team from './Components/Create_Team';
import My_Squad from './Components/My_Squad';
import League from './Components/Available_Leagues';
import Upcoming_Matches from './Components/Upcoming_Matches';

import 'semantic-ui-react';


class App extends React.Component{

  
 
    render(){
        return(
            <div className='ui container' style ={{'backgroundImage':`url(https://www.leaguex.com/assets/images/landing/banner/banner_bg.webp)`,'backgroundRepeat': 'repeat','backgroundSize':'1440px 900px','width':'100%' , 'height':'inherit','z-index': '100','position':'sticky','color':'#f5e1b2'}}> 
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
                <BrowserRouter>
                    <div>
                    <Route path='/' exact component={Upcoming_Matches} />

                    <Route path='/create_team/:match_id/:event_id' exact component={Create_Team}/>

                    <Route path='/league/:match_id/:event_id' exact component={League}/>    

                    <Route path='/my_squad/:match_id/:event_id' exact component={My_Squad}/>
                    </div>
                </BrowserRouter>
                
            </div>
        )
    }

}

export default App;

/*
    <button className="ui button" onClick = {this.onMatchesClicked}>
                    Upcoming Matches
                </button>
                <button className='ui button' onClick = {this.onLeagueClicked}>
                    Leagues
                </button>
                <button className='ui button' onClick = {this.onPlayersClicked}>
                    All Players
                </button>
                <button className='ui button' onClick = {this.onMySquadClicked}>
                    My Squad
                </button>
     */