import React from 'react';

class Create_Team_Card extends React.Component{

    constructor(props){
        super(props);
        console.log('Checking team card props 1',this.props);
    }
    isDisable = (player) => {
        if(this.props.filled_team1==true && player.team_name==this.props.selected_team1){
            return true
        } 
        if(this.props.filled_team2==true && player.team_name==this.props.selected_team2){
            return true
        }
    }

    render(){
        {let role=`${this.props.role}`; console.log(`converting role from string`,[role])}
        return(
            
                             <div className='item' style={{display:'flex','flex-direction':'column','justify-content':'flex-start','align-items':'flex-start'}}>
                                 {console.log('Checking team card props 2',this.props)}
                               <h2 style={{'position':'sticky','top':'100px','z-index': '1000'}}> {this.props.role} </h2>
                                
                                   {this.props.players.map(player =>{
                                       return(
                                    
                                        <div className='item' key={player.id} style={{'z-index':'300','display':'flex','flex-direction':'row','margin':'20px'}}>
                                                <img src={player.team_logo} className="ui avatar image" style={{'border-radius':'30%','height':'50px','width':'50px'}}/>
                                                <div className='content'>
                                                    <div className='header' style={{'color':'#f5e1b2','marginBottom':'10px'}}>
                                                        {player.short_name}
                                                    </div>
                                                    <div className="description" style={{'color':'#f5e1b2'}}>
                                                        Credits = {player.event_player_credit}
                                                        <input disabled={(this.isDisable(player) || this.props.checkForDisable(this.props.role))&& !this.props.selected_users.includes(player.id) } 
                                                             checked={this.props.selected_users.includes(player.id)} type='checkbox'id={player.id} onClick={()=>{this.props.onInputClicked(player.id,this.props.role,player.event_player_credit)}}/>
                                                            
                                                    </div>
                                                </div>
                                        </div>
                                       );
                                   })}
                                
                            </div>
        )
    }
}

export default Create_Team_Card;
