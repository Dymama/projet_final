import React,{useState,useEffect} from 'react';
import { 
  Table,
  ButtonToolbar,
  InputGroup,
  Input,
  Icon,
  IconButton,
  Badge,
  InputPicker,
  Button

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import './TablesAnnules.css';

import fakesData from './fakesData';

const { Column, HeaderCell, Cell, Pagination } = Table;



export default function TablesAnnules(props){
  const [data,setData] = useState(fakesData);
  const [load,setLoad]=useState(true)

  
  useEffect(()=>{
    var timer = setTimeout(() => {
      
      setLoad(false)

    }, 1000);

    return ()=>{
      clearTimeout(timer)
    }
  },[])
    return (
      <div>

        <Table
        rowHeight={55}
        loading ={load}
          height={400}
          data={data}
          onRowClick={data => {
            console.log(data);
          }}
        >
          <Column width={70} align="center" fixed>
            <HeaderCell className="tab-valide-header" >Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={200} fixed>
            <HeaderCell className="tab-valide-header" >First Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column width={200}>
            <HeaderCell className="tab-valide-header" >Last Name</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>

          <Column width={200}>
            <HeaderCell className="tab-valide-header" >City</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column width={200}>
            <HeaderCell className="tab-valide-header" >Street</HeaderCell>
            <Cell dataKey="street" />
          </Column>

          <Column width={300}>
            <HeaderCell className="tab-valide-header" >Company Name</HeaderCell>
            <Cell dataKey="companyName" />
          </Column>

          <Column width={300}>
            <HeaderCell className="tab-valide-header" >Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column width={150} fixed="right">
            <HeaderCell className="tab-valide-header" >Action</HeaderCell>

            <Cell>
              {rowData => {
                function handleAction() {
                  alert(`id:${rowData.id}`);
                }
                return (
                  
                  <ButtonToolbar>
                  <IconButton icon={<Icon icon="edit" />} color="blue" circle />

                  <IconButton icon={<Icon icon="trash" />} color="red" circle />

                  </ButtonToolbar>
                              
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    );
  
}
