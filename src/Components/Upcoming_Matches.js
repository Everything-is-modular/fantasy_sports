import React from 'react';
import ApiCall from '../api/ApiCall';
import _ from 'lodash';
import Match_Card from './Match_Card';
import Header from '../Header'



class Upcoming_Matches extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            id : 0,
            match_name : 0,
            match_status: null,
            match_result: null,
            match_type: null,
            match_date: null,
            t1_name: null,
            t2_name: null,
            t1_image: null,
            t2_image: null,
            upcoming_matches:[] 
        };
    }

    
    
    display_all_matches = () => {
        ApiCall.get('/matches/upcoming-matches', {})
        .then(function (response) {
            if(_.get(response,'data.matches.cricket.length',0)){
                
                this.setState({upcoming_matches:_.get(response,'data.matches.cricket',[])})

            }else{
                console.log('error in fetching data');
            }
        }.bind(this))
        .catch(function(error){
            console.log(error)
        })
    };

    componentDidMount(){
        this.display_all_matches();
        console.log("this is upcoming matches",this.props);
    }

    render () {
        return(
            <div className='ui container' style={{'width':'inherit'}}>
                <Header/>
                {this.state.upcoming_matches.map((match=>{
                    return <Match_Card id={match.id} match={match}/>
                }))}

            </div>

            
        )
    }
}

export default Upcoming_Matches;
