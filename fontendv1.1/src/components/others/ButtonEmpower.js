import { useHistory } from "react-router-dom";
import {Button} from 'reactstrap';

const ButtonEmpower = (props) =>{

 let history = useHistory();

 const handleClick = (path) => {
  history.push(path);
 }

 return (

    <Button className={props.className} onClick={()=> handleClick(props.path)}>
    {props.label}
    </Button>
 );
}

export default ButtonEmpower;