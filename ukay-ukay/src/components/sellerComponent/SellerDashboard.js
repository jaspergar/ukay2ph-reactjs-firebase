import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import SellerSidebarData from './SellerSidebarData'
import SideBarSubMenu from './SideBarSubMenu'
import Modal from '../reuseableComponents/Modal'
import { useStateValue } from '../../contextApi/StateProvider';


const Nav = styled.div`
  height:50px;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  background-color:white;
  
`

const NavIcon = styled(Link)`

   margin-left:1rem;
   font-size:2rem;
   height:50px;
   display:flex;
   justify-content:flex-start; 
   align-items: center;
   color:black;

   &:hover{
       color: #f20c5c;
   }
`




const SidebarNav = styled.div`
    background: white;
    width:250px;
    height: 100vh;
    display:flex;
    justify-content:center;
    position: fixed;
    top:0;
    left: ${({ sidebar}) => (!sidebar ? '0' : '-100%')};
    transition:350ms;
    z-index:10;
    
`;



const SidebarWrap = styled.div`
  width: 100%;
`


 function SellerDashboard(props) {
    const [sidebar, setSidebar] = useState(false);
    
    // const [openModal, setOpenModal] = useState(false);
   
      

    const [{user}, dispatch] = useStateValue();

    
   
    // useEffect(() => {
    //     let cleanup = false;
        
    //    if(!cleanup){
    //        if(userFullInfo === null){
    //           setOpenModal(true)
    //        }
    //    }

    //     return () => {
    //         cleanup = true;
    //     }
    // }, [userFullInfo])
    
    const showSidebar = () => {
        setSidebar(!sidebar);
         console.log(sidebar)
    }
    return (
      <>
          <Nav>
              <NavIcon to='#'>
                   <MenuOutlinedIcon onClick={showSidebar} />
              </NavIcon>
              
          </Nav>
             
             <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to='#'>
                            <CloseOutlinedIcon onClick={showSidebar} />
                        </NavIcon>
                        
                        {SellerSidebarData.map((item, index) => {
                                    return <SideBarSubMenu item={item} key={index} />
                        })}
                      
                    </SidebarWrap>
                </SidebarNav>

                <props.children/>
             
             
          
           {/* <Modal
            title = "Add a valid Address"
            openModal = {openModal}
            setOpenModal = {setOpenModal}
           >
            <UserFullDetailsForm/>
           </Modal> */}
      </>
    )
}
export default SellerDashboard;