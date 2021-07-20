import React from 'react';
import ApiCall from '../api/ApiCall';
import _ from 'lodash';
import Create_Team_Card from './Create_Team_Card';
import Modal from './Modal';
import Header from '../Header'


class Create_Team extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isOpen: false,
            role: [`batsman`,`bowler`,`wicket_keeper`,'all_rounder'],
            all_players : [],
            players: {},
            batsman:[],
            wicket_keeper: [],
            all_rounder: [],
            bowler:[],
            count:0,
            selected_users:[],
            selected_users_batsman:[],
            selected_users_bowler:[],
            selected_users_all_rounder: [],
            selected_users_wicket_keeper: [],
            credits_left : 100,
            captain: null,
            vice_captain: null,
            selected_users_team:{},
            selected_team1:null,
            selected_team2:null,
            filled_team1:false,
            filled_team2: false,
            my_squad:[]
        }
    }
    

    onPlayersClicked = () => {
        console.log('checking inside method', this.props);
        ApiCall.get(`/squad/players`,{
        params:{
            match_id : this.props.history.location.params !== undefined ? `${this.props.history.location.params.query.match_id}` : `${this.props.match.params.match_id}`
        }
    })
            .then(function(response){
                console.log('CHECK PLAYERS RESPONSE',response);
                this.setState({all_players : response.data});
                this.setState({players: _.groupBy(this.state.all_players , `role`)});

                this.setState({ batsman: this.state.players.Batsman,
                    wicket_keeper: this.state.players['Wicket-Keeper'],
                    all_rounder: this.state.players['All-Rounder'],
                    bowler:this.state.players.Bowler}
                    );
                    console.log(this.state.batsman,'batsman');
            }.bind(this))
            .catch(function(error){
                console.log('Error in fetching players data',error);
            })
    }



    onInputClicked = async (id,role,player_credits)=>{

        var local_selected_users = [];
        var local_selected_batsman = this.state.selected_users_batsman;
        var local_selected_bowler = this.state.selected_users_bowler;
        var local_selected_wicket_keeper = this.state.selected_users_wicket_keeper;
        var local_selected_all_rounder = this.state.selected_users_all_rounder;
        var credits_left = this.state.credits_left;
        var local_all_players=this.state.all_players;
        var local_selected_users_data= [];
    

        if(role===`batsman`){
            let index_player = local_selected_batsman.indexOf(id);
            if(index_player === -1){
                local_selected_batsman.push(id);
                credits_left = credits_left - player_credits;
                console.log(credits_left);
            }else{
                local_selected_batsman.splice(index_player,1);
                credits_left=credits_left + player_credits;
            }
        }
        if(role===`bowler`){   
            let index_player = local_selected_bowler.indexOf(id);
            if(index_player === -1){
                local_selected_bowler.push(id);
                credits_left = credits_left - player_credits;
            }else{
                local_selected_bowler.splice(index_player,1);
                credits_left=credits_left + player_credits;
            }
        }
        if(role===`wicket_keeper`){ 
            let index_player = local_selected_wicket_keeper.indexOf(id);
            if(index_player === -1){
                local_selected_wicket_keeper.push(id);
                credits_left = credits_left - player_credits;
            }else{
                local_selected_wicket_keeper.splice(index_player,1);
                credits_left=credits_left + player_credits;
            }
        }
        if(role===`all_rounder`){
            let index_player = local_selected_all_rounder.indexOf(id);
            if(index_player === -1){
                local_selected_all_rounder.push(id);
                credits_left = credits_left - player_credits;
            }else{
                local_selected_all_rounder.splice(index_player,1);
                credits_left=credits_left + player_credits;
            }
        }
 
        
        
        local_selected_users=local_selected_users.concat(local_selected_batsman,local_selected_bowler,local_selected_wicket_keeper,local_selected_all_rounder);
        
        console.log(`selected_users`,local_selected_users);

        local_selected_users_data = local_all_players.filter(val => local_selected_users.includes(val.id));
        let local_selected_users_team = _.groupBy(local_selected_users_data,'team_name');
        console.log('team',local_selected_users_team); 

        let local_selected_team1 =  Object.keys(local_selected_users_team)[0];
        let local_selected_team2 =  Object.keys(local_selected_users_team)[1];
         console.log('name of team',local_selected_team1,local_selected_team2);

         if(local_selected_users_team !== this.state.selected_users_team){
            this.setState({selected_users_team:local_selected_users_team , selected_team1: local_selected_team1,selected_team2: local_selected_team2});
       }

       
        this.setState({selected_users_batsman: local_selected_batsman , selected_users_bowler: local_selected_bowler ,selected_users_wicket_keeper: local_selected_wicket_keeper, selected_users_all_rounder: local_selected_all_rounder,
        selected_users: local_selected_users,credits_left:credits_left})

        if(local_selected_users_team[`${local_selected_team1}`] !== undefined){
            if(local_selected_users_team[`${local_selected_team1}`].length===7){
                this.setState({filled_team1:true})
            }
        }

        if(local_selected_users_team[`${local_selected_team2}`] !==undefined){
            if(local_selected_users_team[`${local_selected_team2}`].length===7){
            this.setState({filled_team2:true})
            }
        }
    }


    onMySquadFetch = () => {
        ApiCall.get(`/squad`,{
            params:{
                match_id : `${this.props.match.params.match_id}`
            }
        })
            .then(function(response){
                console.log('checking My Squad', response)
                this.setState({ my_squad : _.get(response ,'data',[])})
                console.log(response.data,'my_squad response')
            }.bind(this))
            .catch(function(error){
                console.log('Error in getting My Squad Api',error);
            })
    }

   

    onSubmit =() =>{
        if(this.state.selected_users_batsman.length>7 || this.state.selected_users_batsman.length<3){
            alert('batsman should be between 3 and 7')
            return
        }else if(this.state.selected_users_bowler.length>7 || this.state.selected_users_bowler.length<3){
            alert('bowler should be between 3 and 7')
            return
        } else if(this.state.selected_users_wicket_keeper.length>5 || this.state.selected_users_wicket_keeper.length<1){
            alert('Wicketkeeper should be between 1 and 5')
            return
        }  else if(this.state.selected_users_all_rounder.length>4){
            alert('All Rounder should be between 0 and 4')
            return
        } else if(this.state.selected_users_team[`${this.state.selected_team1}`].length>7 || this.state.selected_users_team[`${this.state.selected_team2}`].length>7){
            alert('Single team should have players less than 7')
            return
        } else if(this.state.my_squad.length>10){
            alert(`You already have 10 squads`);
            return
        }       

        this.setState({isOpen:true})
    }

    componentWillMount(){
         console.log("reaching",this.props);
         this.onPlayersClicked();
         this.onMySquadFetch();   
    }

    checkForDisable= (role) =>{
        console.log('Checking role in disable',role);
        if(this.state.selected_users.length>=11 || this.state.credits_left<0){
            return true
        } else if(role==="wicket_keeper" && this.state.selected_users_wicket_keeper.length>=5 || this.state.credits_left<0){
            return true
        } else if(role==="all_rounder" && this.state.selected_users_all_rounder.length>=4 || this.state.credits_left<0){
            return true
        } else if(this.state[`selected_users_${role}`].length>=7 || this.state.credits_left<0){
            return true
        } 
    }

    render(){
        return(
            <div>
                <Header />
            <div className='ui list' style ={{'display' : 'flex', 'flex-direction': 'row', 'justify-content': 'space-around'}}>
                {console.log('Checking team ',this.state)}

            <Create_Team_Card role={this.state.role[0]} players={this.state.batsman} selected_users={this.state.selected_users_batsman}
                onInputClicked={this.onInputClicked} checkForDisable={this.checkForDisable} filled_team1={this.state.filled_team1} filled_team2={this.state.filled_team2} selected_team1={this.state.selected_team1} selected_team2={this.state.selected_team2}/>
            <Create_Team_Card role={this.state.role[1]} players={this.state.bowler} selected_users={this.state.selected_users_bowler}
                onInputClicked={this.onInputClicked} checkForDisable={this.checkForDisable} filled_team1={this.state.filled_team1} filled_team2={this.state.filled_team2} selected_team1={this.state.selected_team1} selected_team2={this.state.selected_team2}/>
            <Create_Team_Card role={this.state.role[2]} players={this.state.wicket_keeper} selected_users={this.state.selected_users_wicket_keeper}  onInputClicked={this.onInputClicked} checkForDisable={this.checkForDisable} filled_team1={this.state.filled_team1} filled_team2={this.state.filled_team2} selected_team1={this.state.selected_team1} selected_team2={this.state.selected_team2}/>
            <Create_Team_Card role={this.state.role[3]} players={this.state.all_rounder} selected_users={this.state.selected_users_all_rounder}  onInputClicked={this.onInputClicked} checkForDisable={this.checkForDisable} filled_team1={this.state.filled_team1} filled_team2={this.state.filled_team2} selected_team1={this.state.selected_team1} selected_team2={this.state.selected_team2}/>

                <div style={{'align-self':'flex-start','position':'sticky','top':'100px','z-index': '300'}}>Total Credits:{this.state.credits_left}</div>

                <Modal show={this.state.isOpen} selected_users={this.state.selected_users} all_players={this.state.all_players} match_id={this.props.match.params.match_id} event_id={this.props.match.params.event_id}/>

                

                <button disabled={this.state.selected_users.length<11} className = 'ui positive button'style={{'align-self':'flex-start','position':'sticky','top':'100px','z-index': '300'}} onClick={() => this.onSubmit() }>
                       Submit Squad
                    </button>

               
            </div>
            </div>
            

            
        )
    }
}
export default Create_Team;



