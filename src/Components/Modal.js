import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import ApiCall from '../api/ApiCall';

const Modal = props =>{
    const [captain,selectCaptain]=useState(null);
    const [vice_captain,selectViceCaptain]=useState(null);
    const [users_data,setUsersData]=useState([]);
    const [show,setShow]= useState(true);
    console.log(`props in modal`,props);

    const onCaptainChange = (event) =>{
        console.log('event',event.target.value)
        selectCaptain(event.target.value);
        
    }

    const onViceCaptainChange = (event) => {
        selectViceCaptain(event.target.value);
    }

    const onSubmit=()=>{
        console.log(props,'MODAL PROPS');

        let match_id = parseInt(props.match_id,10);

            ApiCall.get(`/squad`,{
                params:{
                    match_id : `${match_id}`
                }
            })
                .then(function(response){
                    console.log('checking My Squad', response)
                    postingData(`${response.data.length}`)
                    console.log(response.data,'my_squad response')
                })
                .catch(function(error){
                    console.log('Error in getting My Squad Api',error);
                })
   
    }

   const postingData = (length) => {
    let local_captain= parseInt(captain,10);
    let local_vice_captain = parseInt(vice_captain,10);
    let squad_id = props.selected_users + '';
    let squad_arr=squad_id.split(",");
    squad_arr = squad_arr.map(id => parseInt(id,10));
    let event_id = parseInt(props.event_id,10);

    let data = {
        'squad':squad_arr,
        'captain_id':local_captain,
        'vice_captain_id':local_vice_captain,
        'match_id': `${props.match_id}`,
        'event_id': event_id
    }
    if(length < 10){
        ApiCall.post('squad',data)
            .then(res=>{
                console.log(res);
                setShow(false);
                alert("Form Submitted!");
            })
            .catch(error=> {
                console.log('error in posting data',error)
                alert(`error:-${error}`);
            })
    }
        
    }

    useEffect(()=>{
        let local_selected_users_id=props.selected_users;
        let local_all_players=props.all_players;
        var local_selected_users_data= [];

        local_selected_users_data = local_all_players.filter(val => local_selected_users_id.includes(val.id));
        if(local_selected_users_data != users_data){
            saveData(local_selected_users_data);
        }
 
        console.log('local_selected users data',local_selected_users_data);
    },[props.show]);

    const saveData = (local_selected_users_data) => {
        console.log("this is savedata",local_selected_users_data);
        setUsersData(local_selected_users_data);
    }



    return ReactDOM.createPortal(
        <div className={(props.show && show) ? 'ui dimmer modal visible active' : 'ui dimmer modal'} style={{'width': '100%','height':'260%','background-color':'#021a4e'}}>
            <div className={(props.show && show) ? 'ui standard modal visible active' : 'ui standard modal'} style={{'position':'sticky','top':'10px'}}>
                <div className='ui container' style={{'display':'flex','flex-direction':'column'}}>
                    <div className='item' style={{'display':'flex','flex-direction':'row'}}>
                        <h4>Select Captain of Team</h4>
                        <select
                            style={{'position':'relative','left':'20px'}}
                            value={captain}
                            onChange={onCaptainChange}
                            >
                                 {
                                     users_data.map(user =>{
                                        return(<option disabled={vice_captain == user.id} value={user.id}>{user.short_name}</option>)
                                            
                                    })
                                        
                                 } 
                                
                                
                        
                        </select>
                    </div>
                    <div className='item' style={{'display':'flex','flex-direction':'row'}}>
                        <h4>Select Vice Captain Of Team </h4>
                        <select
                            style={{'position':'relative','left':'20px'}}
                            value={vice_captain}
                            onChange={onViceCaptainChange}
                            >
                                {

                                    users_data.map(user =>{
                                     return(                   
                                            <option disabled={captain == user.id} value={user.id}>{user.short_name}</option> 
                                            )
                                    })
                                 

                                }
                        
                        </select>
                    </div>
                    <div className='actions'>
                        <div className='ui button' onClick={onSubmit}>Submit on Server</div>
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
}

export default Modal