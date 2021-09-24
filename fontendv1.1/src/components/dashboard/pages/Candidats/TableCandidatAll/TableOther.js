import React,{ useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';
import {useSelector, useDispatch,useStore} from 'react-redux'
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        Loader,
        Col,
        Row,
        Table,
        
    
    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
const { Column, HeaderCell, Cell ,Pagination } = Table;


const fakeData = [
    
        {
          "id": 1,
          "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/justinrob/128.jpg",
          "city": "New Amieshire",
          "email": "Leora13@yahoo.com",
          "firstName": "Ernest Schuppe SchuppeSchuppeSchuppeSchuppeSchuppeSchuppe Schuppe",
          "lastName": "Schuppe",
          "street": "Ratke Port",
          "zipCode": "17026-3154",
          "date": "2016-09-23T07:57:40.195Z",
          "bs": "global drive functionalities",
          "catchPhrase": "Intuitive impactful software",
          "companyName": "Lebsack - Nicolas",
          "words": "saepe et omnis",
          "sentence": "Quos aut sunt id nihil qui.",
          "stars": 820,
          "followers": 70
        },
        {
          "id": 2,
          "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/thaisselenator_/128.jpg",
          "city": "New Gust",
          "email": "Mose_Gerhold51@yahoo.com",
          "firstName": "Janis",
          "lastName": "Vandervort",
          "street": "Dickinson Keys",
          "zipCode": "43767",
          "date": "2017-03-06T09:59:12.551Z",
          "bs": "e-business maximize bandwidth",
          "catchPhrase": "De-engineered discrete secured line",
          "companyName": "Glover - Hermiston",
          "words": "deleniti dolor nihil",
          "sentence": "Illo quidem libero corporis laborum.",
          "stars": 1200,
          "followers": 170
        },
        {
          "id": 3,
          "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
          "city": "Lefflerstad",
          "email": "Frieda.Sauer61@gmail.com",
          "firstName": "Makenzie",
          "lastName": "Bode",
          "street": "Legros Divide",
          "zipCode": "54812",
          "date": "2016-12-08T13:44:26.557Z",
          "bs": "plug-and-play e-enable content",
          "catchPhrase": "Ergonomic 6th generation challenge",
          "companyName": "Williamson - Kassulke",
          "words": "quidem earum magnam",
          "sentence": "Nam qui perferendis ut rem vitae saepe.",
          "stars": 610,
          "followers": 170
        },
]

 class TableOther extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        displayLength: 10,
        loading: false,
        page: 1
      };
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleChangeLength = this.handleChangeLength.bind(this);
    }

    handleChangePage(dataKey) {
      this.setState({
        page: dataKey
      });
    }

    handleChangeLength(dataKey) {
      this.setState({
        page: 1,
        displayLength: dataKey
      });
    }

    getData() {
      const { displayLength, page } = this.state;
  
      return fakeData.filter((v, i) => {
        const start = displayLength * (page - 1);
        const end = start + displayLength;
        return i >= start && i < end;
      });
    }
    render() {
      const data = this.getData();
      const { loading, displayLength, page } = this.state;
  
      return (
        <div>
          <Table height={420} data={data} loading={loading}>
            <Column width={50} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>
  
            <Column width={100} fixed>
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="firstName" />
            </Column>
  
            <Column width={100}>
              <HeaderCell>Last Name</HeaderCell>
              <Cell dataKey="lastName" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>City</HeaderCell>
              <Cell dataKey="city" />
            </Column>
            <Column width={200} flexGrow={1}>
              <HeaderCell>Company Name</HeaderCell>
              <Cell dataKey="companyName" />
            </Column>
          </Table>
  
          <TableOther
            lengthMenu={[
              {
                value: 10,
                label: 10
              },
              {
                value: 20,
                label: 20
              }
            ]}
            activePage={page}
            displayLength={displayLength}
            total={fakeData.length}
            onChangePage={this.handleChangePage}
            onChangeLength={this.handleChangeLength}
          />
        </div>
      );
    }
  }
  
  export default TableOther