import React from 'react';

class League_Card extends React.Component {

    constructor(props){
        super(props);
        this.state = {league_id : null};
        
    }

    onLeagueClicked = (league_id) => {
        this.setState({league_id : league_id})
    }
    

    render(){
        return(
            <div className='ui celled list'>
                
                
                 <div className='item' style={{'opacity':'0.7'}}>
                    <div className='ui three cards' onClick={()=>this.onLeagueClicked(this.props.league.id)}>
                
        
                        <div className="ui card">
                            <div className="ui center aligned content">
                            <img className='ui tiny image' src={this.props.match.t1_image} />
                            <div className="header">{this.props.match.t1_name}</div>
                            { this.props.league.winning_amount_splitup.is_mega_league ? 
                                    <div>Mega Contest Available</div>
                                 : 
                                    <div></div>
                            } 
                            </div>
                        </div>

                        <div className='ui card'>
                            <div className='ui center aligned content'>
                            <div className='header'>{this.props.league.display_name}</div>
                            <div className='header'>{`Entry fees: ${this.props.league.entry_fee}`}</div>
                            <div className='header'>{`Total No: of slots: ${this.props.league.max_limit}`}</div>
                            <div className='header'>{`Win Rs ${this.props.league.winning_amount}`}</div>
                            </div>
                        </div>

                        <div className='ui card'>
                            <div className="ui center aligned content">
                            <img className='ui tiny image' src={this.props.match.t2_image} /> 
                            <div className="header">{this.props.match.t2_name}</div>
                            </div>
                        </div>
                    </div>
                    
                </div> 
            </div>
        )
    }
}

export default League_Card;