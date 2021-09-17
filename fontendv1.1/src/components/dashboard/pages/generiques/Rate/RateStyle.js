import React,{ useState, useEffect,} from 'react'

import {useSelector, useDispatch,useStore} from 'react-redux'
  
import {ButtonToolbar,
    IconButton,
    Icon,
    Loader,
    Placeholder,
    Button,
    Rate

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';



  export default function RateStyle() {
    const [hoverValue, setHoverValue] = React.useState(3);
  
    return (
      <div  className="mx-auto ml-md-3">
        <Rate size="sm" defaultValue={3} color="blue" allowHalf readOnly onChangeActive={setHoverValue} />{' '}
      </div>
    );
  };
  