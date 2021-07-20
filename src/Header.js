import React from 'react';
import {useHistory} from 'react-router-dom'


 const Header =() => {
    const history = useHistory();

   const onImageClicked = ()=>{
        history.push('/');
    }

    
        return(
            <div style={{'width':'inherit','position':'sticky','top':'0px','z-index':'1000','backgroundColor':'#000066'}}>
                <img src='https://www.leaguex.com/assets/images/landing/header/leaguex_logo.png' onClick={()=>onImageClicked()}/>
            </div>
        )
}

export default Header;