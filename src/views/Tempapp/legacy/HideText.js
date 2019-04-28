import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

export default function HideText(props){
    const [isHidden, setIsHidden] = useState(false);

    return (
        <div>
            <Button variant="contained" color="primary" onClick={()=>setIsHidden(!isHidden)}>Toggle.</Button>
            {!isHidden && props.text}
        </div>
    )

}