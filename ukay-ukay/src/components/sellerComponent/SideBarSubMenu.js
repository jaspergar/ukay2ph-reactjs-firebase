import React,{ useState }  from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { auth } from '../../firebase'
import { useStateValue } from '../../contextApi/StateProvider'


const SidebarLink = styled(Link)`
   display: flex;
   color: grey;
   justify-content: space-between;
   align-items:center;
   padding:20px;
   list-style: none;
   height: 60px;
   text-decoration:none;
   font-size:18px;
   font-weight:600;

   &:hover{
        ${'' /* background:#252831;
        border-left:4px solid #632ce4; */}
        ${'' /* border-left:4px solid #f20c5c;s */}
        background: #FAFAFA;
        cursor:pointer;
   }
 `

 const SidebarLabel = styled.span`
   margin-left: 16px;
 `
 
 const DropdownLink = styled(Link)`
   ${'' /* background:#414757; */}
   height: 60px;
   padding-left 3rem;
   display:flex;
   align-items:center;
   font-weight:500;
   text-decoration:none;
   color: #111;
   font-size:1rem;

   &:hover{
       border-left:4px solid #f20c5c;
       background: #FAFAFA;
       cursor: pointer;
   }
 `

 const SideBarSubMenu = ({item}) => {
 
    const [subnav, setSubnav] = useState(false)
    const [isLoggedIn , setIsLoggedIn] = useState(false);

    const [{user}, dispatch] = useStateValue();
    
    const showSubnav = () => setSubnav(!subnav)

    const handleAuthentication = () => {
        if (user) {
          setIsLoggedIn(false);
          auth.signOut();
        }
      };

     

    return (
        <>
          {
              item.onClick ? <SidebarLink onClick={handleAuthentication}> 
              <div>
                       {item.icon}
                       {
                           item.onClick ?  <SidebarLabel onClick={handleAuthentication}>{item.title}</SidebarLabel> :  <SidebarLabel >{item.title}</SidebarLabel>
                       }
                      
                   </div>
                   <div>
                       {item.subNav && subnav ? item.iconDropdownOpened : item.subNav ? item.iconDropdownClosed : null}
                   </div>
            </SidebarLink> : <SidebarLink onClick={item.subNav && showSubnav}>
            <div>
                       {item.icon}
                       {
                           item.onClick ?  <SidebarLabel onClick={handleAuthentication}>{item.title}</SidebarLabel> :  <SidebarLabel >{item.title}</SidebarLabel>
                       }
                      
                   </div>
                   <div>
                       {item.subNav && subnav ? item.iconDropdownOpened : item.subNav ? item.iconDropdownClosed : null}
                   </div>
            </SidebarLink>
          }
            
                   
            {subnav && item.subNav.map((item,index) => {
                return(
                    <DropdownLink to={item.path} key={index}>
                       
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                )
            })}
        </>
    )
}
export default SideBarSubMenu