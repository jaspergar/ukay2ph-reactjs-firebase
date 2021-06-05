import React, { useState } from 'react'

import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';








 const SellerSidebarData = [
    {
        title: 'Order',
        path: '/sellerOrder',
        icon: <EventNoteOutlinedIcon />,
        iconDropdownClosed: <ExpandLessOutlinedIcon />,
        iconDropdownOpened: <ExpandMoreOutlinedIcon />,
        subNav: [
            {
                title: 'My Order',
                path:'/sellerOrder/myOrder'
            }
        ]

    },
    {
        title: 'Product',
        path: '/sellerProduct',
        icon: <AddShoppingCartOutlinedIcon />,
        iconDropdownClosed: <ExpandLessOutlinedIcon />,
        iconDropdownOpened: <ExpandMoreOutlinedIcon />,
        subNav: [
            {
                title: 'My Product',
                path:'/sellerProduct/myProduct'
            },

            {
                title: 'Add new Product',
                path:'/sellerProduct/addProduct'
            }
        ]

    },
    {
        title: 'Report',
        path: '/sellerReport',
        icon: <AssignmentOutlinedIcon />,
        iconDropdownClosed: <ExpandLessOutlinedIcon />,
        iconDropdownOpened: <ExpandMoreOutlinedIcon />,
        subNav: [
            {
                title: 'My Report',
                path:'/sellerReport/myReport'
            }
        ]

    },
    {
        title: 'Logout',
        onClick:true,
        icon: <ExitToAppIcon />
       

    }
]

export default SellerSidebarData