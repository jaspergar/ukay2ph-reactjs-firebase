import { FormControl, Grid } from '@material-ui/core';
import React,{useState} from 'react'
import {useForm,Form} from './Form/useForm'
import Controls from './Controls'
import * as initialCategoryService from './Select/initialCategoryService'





export default function UserFullDetailsForm(props) {
  const {initialValue,db,user,setOpenModal} = props;

    const {
      values,
      setValues,
      handleInputChange
    } = useForm(initialValue)

   
    const  onUpdate = e => {
      e.preventDefault()
       if(initialValue){
        db.collection('users').doc(user?.uid).update({
        "fullname":values.fullname,
        "cnumber" :values.cnumber,
        "zip":values.zip,
        "address":values.address,
        "detailAddress":values.detailAddress
        }).then(() => {
          setOpenModal(false)
        })
       }
    }

    return (
     <Form>
      <Grid container>
            <Grid item xs={6}>
                 <Controls.Input 
                   variant="outlined"
                   label="Full Name"
                   name="fullname"
                   value={values.fullname}
                   onChange={handleInputChange}
                 />
                  <Controls.Input  
                   variant="outlined"
                   label="Contact Number"
                   name="cnumber"
                   value={values.cnumber}
                   onChange={handleInputChange}
                 />
                 <Controls.Input  
                   variant="outlined"
                   label="Zip"
                   name="zip"
                   value={values.zip}
                   onChange={handleInputChange}
                 />
                 
            </Grid>
            <Grid item xs={6}>
            <Controls.Input  
                   variant="outlined"
                   label="Region/Province/City/Barangay"
                   name="address"
                   value={values.address}
                   onChange={handleInputChange}
                 />
                  <Controls.Input  
                   variant="outlined"
                   label="Detail Address"
                   name="detailAddress"
                   value={values.detailAddress}
                   onChange={handleInputChange}
                 />
                  

                 {/* <Controls.Select
                   name="category"
                   label="sample select"
                   value={'sampleId'}
                   onChange={handleInputChange}
                   options={initialCategoryService.getInitialCategoryCollection()}
                 /> */}
                 <FormControl >
                   <Controls.Button
                   type="submit"
                   text="Update"
                   onClick={onUpdate}
                    />
                 </FormControl>
                 {/* <FormControl>
                 <Controls.Button
                   text="cancel" 
                     color="default"
                   />
                 </FormControl> */}
                 
            </Grid>
            
      </Grid>

      
      </Form>
    )
}
