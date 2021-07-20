import React from 'react';
import ApiCall from '../api/ApiCall'
import _ from 'lodash';
import Header from '../Header'

class My_Squad extends React.Component{
    constructor(props){
        super(props);
        this.state ={my_squad:[]};
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
            }.bind(this))
            .catch(function(error){
                console.log('Error in getting My Squad Api',error);
            })
    }

    componentDidMount(){
        this.onMySquadFetch();
    }

    onBackButtonClicked = () => {
        console.log(this.props);
        this.props.history.push(`/league/${this.props.match.params.match_id}/${this.props.match.params.event_id}`)
    }

    _renderHtml(player,mysquad){
        if(player.id == mysquad.captain){
            return <h3 style={{'flex-grow':'2'}}>{player.name} <span style={{'color':'#1d7e36'}}>C</span></h3>
        } else if(player.id == mysquad.vice_captain){
        return <h3 style={{'flex-grow':'2'}}>{player.name} <span style={{'color':'#1d7e36'}}>VC</span></h3>
        } else {
            return <h5 style={{'flex-grow':'2'}}>{player.name}</h5>
        }
    }

    render(){
        return(
            <div>
                <Header />
                <button className='ui element button' style={{'position':'sticky','top':'130px','left':'150px','z-index': '300'}} onClick={()=>{this.onBackButtonClicked()}}>Go Back</button>
                <div className='ui container' style={{'display':'flex','flex-direction':'column','justify-content':'space-around','height':'900px','width':'1440px'}}>
                    {this.state.my_squad.map(mysquad => {
                        return(
                            <div className='ui container'style={{'display':'grid','grid-template-columns': 'auto auto auto auto','grid-gap':'10px'}}>
                                <h2 style={{'grid-column-start':'1','grid-column-end':'5'}}>{mysquad.team_name}</h2>
                                {mysquad.squad.map(player => {
                                    return(
                                        <div clasName='ui item' >
                                            {
                                                this._renderHtml(player,mysquad)
                                            }
                                        </div>
                                    )
                                    
                                })}
                            </div>   
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default My_Squad;

/*
     onMySquadClicked = () => {
        ApiCall.get('/squad',{})
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            })
    }
*/ 