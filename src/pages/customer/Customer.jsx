import React, { useState } from 'react';
import { MyTable } from '../../components/template/table/MyTable/MyTable';
import { MyButton } from '../../components/template/button/MyButton/MyButton';
import {Dropdown,DetailCustomer} from '../../components/index';
import { Link } from "react-router-dom";
import '../../assets/css/Pages/customer.css'


function Customer(props) {
    const [isShowDetail, setIsShowDetail] = useState(false);

    const handleShowDetail = () => {
      setIsShowDetail(true);
    };
    const handleCloseDetail = () => {
      setIsShowDetail(false);
    }

    let items =[
        {
            
            "Client name ": "Nguyễn Ngọc Thảo My",
            "Phone number": "0902637839",
            "Reviews": "okela",
            "Sales": 8000000,
            "Created at": "24 Oct 2023",
          },
          {
            
            "Client name ": "Nguyễn Ngọc Thảo My",
            "Phone number": "0902637839",
            "Reviews": "okela",
            "Sales": 8000000,
            "Created at": "24 Oct 2023",
          },
          {
            
            "Client name ": "Nguyễn Ngọc Thảo My",
            "Phone number": "0902637839",
            "Reviews": "okela",
            "Sales": 8000000,
            "Created at": "24 Oct 2023",
          },
          {
            
            "Client name ": "Nguyễn Ngọc Thảo My",
            "Phone number": "0902637839",
            "Reviews": "okela",
            "Sales": 8000000,
            "Created at": "24 Oct 2023",
          },
    ]
    
    const itemOptions = [
        {
            content: "Export as Excel",
          },
          {
            content: "Import clients",
          },
    ]
    
    return (
        <div className='padding-body' id='list_customer'>
            <div className='header_of_customer'>
    

                <div className='row'>
                    <div className='col-8'>
                        <div className='header_bar_left_Cus '>
                            <div className='title_total_number_Cus'>
                             <h3 className='title_Cus'>Clients list </h3>
                             <p className='total_number_Cus'>3</p>
                             </div>
                             <p className='introduce_Cus'>View, add, edit and delete your client's details. </p>
                            </div>
                    </div>
                    
                    <div className='col-4'>
                    <div className='feature_of_customer'>
                    <div className='option_dropdown'>
                        <Dropdown placeholder='Options' item={itemOptions}/>
                     </div>
                    <Link to="/customer/add">
                    <button className='btnAdd'>Add client</button>
                     </Link>
                     </div>

                    </div>
                </div>

                   
               
                    
              
            
            </div>
          
             <MyTable list={items}  showCheckBox={true} />  
          
            
            <div onClick={handleShowDetail} >
                Show Detail Customer
            </div>
         { isShowDetail &&  (<div className='detail_customer_container'>
                <DetailCustomer closeDetail={handleCloseDetail}/>
           </div>)}
        </div>
    );
}

export default Customer;