import React,{useState} from 'react';
import {Link} from "react-router-dom";
import "../../../assets/css/Pages/customer.css";
import {DotsThreeVertical,X} from "phosphor-react";

function DetailCustomer({closeDetail}) {
    const [currentTab, setCurrentTab] = useState('1');
    const tabs = [
        {
            id: 1,
            tabTitle: 'Client details',
            title: 'Client details',
            content: 'Las tabs se generan automáticamente a partir de un array de objetos, el cual tiene las propiedades: id, tabTitle, title y content.'
        },
        {
            id: 2,
            tabTitle: 'Orders list',
            title: 'Orders list',
            content: 'Contenido de tab 2.'
        },
        {
            id: 3,
            tabTitle: 'Bank account',
            title: 'Bank account',
            content: 'Contenido de tab 3.'
        },
        {
            id: 4,
            tabTitle: 'Invoices',
            title: 'Invoices',
            content: 'Contenido de tab 4.'
        }
    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id); 
    }
    return (
        <div className='detail_customer_container'>
           
            <div className='close_detail_frame'>
                <Link><button className='close_detail_icon'><X size={32} onClick={closeDetail} /></button></Link></div>
           
            
            <div className='content_detail_cus'>
                 <div className='count_quantity_type_order_cus'>
                        <div className='quantity_info'>
                            <h4>0đ</h4>
                            <p>Total sales</p>
                        </div>
                        <div className='quantity_info'>
                            <h4>2</h4>
                            <p>Completed</p>
                        </div>
                        <div className='quantity_info'>
                            <h4>1</h4>
                            <p>Cancelled</p>
                        </div>
                        <div className='quantity_info'>
                            <h4>0</h4>
                            <p>No-show</p>
                        </div>
                 </div>
                <div className='info_cus'>
                        <div className='name_cus_frame'>
                                <div className='image_cus'>
                                    <span>D</span>
                                </div>
                                <div className='name_email_cus'>
                                    <h3>Hong Dao</h3>
                                    <a>hongdao@gmail.com</a>
                                </div>
                        </div> 
                        <div className='type_cus'>
                            New client
                        </div> 
                        <div className='action_cus_frame'>
                                <button className='dotthree_icon'><DotsThreeVertical size={32} /></button>
                                <div>
                                    <button className='btn_Order'> Order</button>
                                </div>
                        </div>
                    
        

            <div className='container'>
            <div className='tabs'>
                {tabs.map((tab, i) =>
                    <button key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={(handleTabClick)}>{tab.tabTitle}</button>
                )}
            </div>
            <div className='content'>
                {tabs.map((tab, i) =>
                    <div key={i}>
                        {currentTab === `${tab.id}` && <div><p className='title'>{tab.title}</p><p className='content_info'>{tab.content}</p></div>}
                    </div>
                )}
            </div>
        </div>
        </div>
  </div>
   </div>
            
         
        
    );
}

export default DetailCustomer;