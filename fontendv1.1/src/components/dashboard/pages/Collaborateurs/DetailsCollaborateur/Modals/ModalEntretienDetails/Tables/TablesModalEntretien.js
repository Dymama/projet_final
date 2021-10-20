import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router,useLocation} from 'react-router-dom';
import {useSelector, useDispatch,useStore} from 'react-redux'
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        Modal,
        Button,
        Loader,
        Col,
        Row,
        Container,
        Content,
        Panel,
        Table,

    } from 'rsuite';

    
    
import 'rsuite/dist/styles/rsuite-default.css';
import './TablesModalEntretien.css'
    
const { Column, HeaderCell, Cell, Pagination } = Table;



export default function TablesModalEntretien () {
      return (
        <>
          <Table
            virtualized
            height={400}
            data={[]}
            onRowClick={data => {
              console.log(data);
            }}
          >
            <Column width={70} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>
  
            <Column width={130}>
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="firstName" />
            </Column>
  
            <Column width={130}>
              <HeaderCell>Last Name</HeaderCell>
              <Cell dataKey="lastName" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>City</HeaderCell>
              <Cell dataKey="city" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>Street</HeaderCell>
              <Cell dataKey="street" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>Company Name</HeaderCell>
              <Cell dataKey="companyName" />
            </Column>
          </Table>
        </>
      );
    
  }
  