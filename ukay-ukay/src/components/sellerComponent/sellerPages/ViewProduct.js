import { FormHelperText, InputAdornment, makeStyles, Paper, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../../contextApi/StateProvider';
import { db } from '../../../firebase';
import useTable from '../../reuseableComponents/Table/useTable'
import Controls from '../../reuseableComponents/Controls'
import SearchIcon from '@material-ui/icons/Search';

const headCells = [
    {id:'id',label:'ID'},
    {id:'title',label:'Title',disableSorting: true},
    {id:'brand',label:'Brand',disableSorting: true},
    {id:'price',label:'Price'},
    {id:'stock',label:'Stock',disableSorting: true},
    {id:'sales',label:'Sales',disableSorting: true},
    {id:'action',label:'Action',disableSorting: true},
]

const useStyles = makeStyles(theme => ({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchInput:{
        width:'75%',
    }
}))

export default function ViewProduct() {

    const [products, setProducts] = useState([]);
    const [filterIn,setFilterIn] =useState({fn:items => {return items; }})

    const [{basket,user},dispatch] = useStateValue();
    

   
    const classes = useStyles();
    useEffect(() => {
        let unmounted = false;

  
        if(user){
    
            if( user.admin){
                if(!unmounted){
                    db.collection('users').doc(user?.uid).collection('adminProduct')
                    .onSnapshot(snapShot => (
                        setProducts(snapShot.docs.map(doc => ({
                        id: doc.id,
                        data : doc.data()
                      })))
                    ))
                    }
        }
    
          
        }else{
          setProducts([])
        }
       
       
    
        return () => {
          unmounted =true;
        }
    }, [user])

    const {
       TblContainer,
       TblHead,
       TblPagination,
       productsAfterPagingAndSorting
    }=useTable(products,headCells,filterIn);

     const handleSearch = e => {
         let target = e.target;
         setFilterIn({
             fn: items => {
                 if(target.value == "")
                    return items;
                    else  
                       return items.filter(x => x.data.title.toLowerCase().includes(target.value))
             }
         })
     }

    return (
        <>
        <Paper className={classes.pageContent}>
          <Toolbar>
               <Controls.Input
                className={classes.searchInput}
                label="Search Product by Title"
                InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>)
                }}
                onChange={handleSearch}
                />
          </Toolbar>
        <TblContainer> 
        <TblHead/>
               <TableBody>
                     {
                          productsAfterPagingAndSorting()?.map(product => (
                            <TableRow key={product.id}>
                              <TableCell>{product.id}</TableCell>
                              <TableCell>{product.data.title}</TableCell>
                              <TableCell>{product.data.brand}</TableCell>
                              <TableCell>{product.data.price}</TableCell>
                              <TableCell>{product.data.stock}</TableCell>
                              <TableCell>3</TableCell>
                              <TableCell>action</TableCell>
                       </TableRow>
                          ))
                     }
                       

               </TableBody>
            
             </TblContainer>
             <TblPagination/>
        </Paper>
           
        </>
    )
}
