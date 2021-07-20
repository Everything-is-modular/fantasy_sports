import React from 'react';
import ApiCall from '../api/ApiCall';
import _ from 'lodash';
import League_Card from './League_Card';
import Header from '../Header'

class Available_Leagues extends React.Component{

    constructor(props) {
        super(props);
        this.state = { match_id : this.props.match.params.match_id ,
        all_leagues : [],
        my_squad:[],
        match:{}}; 
    }

    onLeagueFetch = ()=> {
        console.log('checking league props',this.props)
        ApiCall.get(`/leagues`, {
            params: {
                match_id : `${this.state.match_id}`
            }
        })
            .then(function(response){
                if(_.get(response,'data.leagues.length',0)){
                    console.log('checking league response id',_.get(response,'data',[]));
                    this.setState({ all_leagues : _.get(response,'data.leagues',[]) , match: response.data.match  });

                } else {
                    console.log(`error in fetching data`);
                }
            }.bind(this))
            .catch(function(error){
                console.log("check",error);
            })
    }

    onMySquadFetch = () => {
        ApiCall.get(`/squad`,{
            params:{
                match_id : `${this.state.match_id}`
            }
        })
            .then(function(response){
                console.log('checking My Squad', response)
                this.setState({ my_squad : _.get(response ,'data',[])})
            }.bind(this))
            .catch(function(error){
                console.log('Error in getting My Squad Api',error);
            })
    }

    onCreateButtonClicked = () => {
        console.log(this.props,'checking props in leagues')
        console.log(this.props,'Checking for url')
        this.props.history.push({
            pathname: `/create_team/${this.props.match.params.match_id}/${this.props.match.params.event_id}`,
            params:{
                query:{
                    match_id:`${this.state.match_id}`
                }
            }
        })
    }

    onMySquadButtonClicked = () => {
        this.props.history.push({
            pathname: `/my_squad/${this.state.match_id}/${this.props.match.params.event_id}`,
            params:{
                query:{
                    match_id:`${this.state.match_id}`,
                    my_squads: `${this.state.my_squad}`
                }
            }
        })
    }

    componentDidMount(){
        console.log(this.props,'checking props in leagues')
        
        this.onLeagueFetch();
        this.onMySquadFetch();
        console.log(this.props,'checking props in leagues')
    }

    render(){
        console.log("this state all_leagues",this.state.all_leagues)
        return(
            
            <div className='ui container' style={{'width':'inherit'}}>
                <Header/>
                Select A League
                {this.state.my_squad.length < 10 ? 
                <button className='ui element button'style={{'position':'sticky','top':'600px','left':'800px','z-index': '300'}} onClick={()=>{this.onCreateButtonClicked()}} >Create a Squad</button>
                : `You have got 10 squads`}

                <button className='ui element button' style={{'position':'sticky','top':'600px','left':'550px','z-index': '300'}} onClick={()=>{this.onMySquadButtonClicked()}}>Show All Squads</button>
                
                { 
                    this.state.all_leagues.map(league=>{ 
                        return <League_Card league={league} league_id={league.id} match={this.state.match} />
                    })
                }
                
            </div>
        )
    }
}
export default Available_Leagues;

/*
      
*/ 
//,
//league_id: _.get(response.data.leagues)
//league_id={data.leagues.league.id}