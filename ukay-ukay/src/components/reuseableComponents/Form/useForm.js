import { makeStyles } from '@material-ui/core'
import React, {useState} from 'react'

export  function useForm(initialValue) {

    const [values, setValues] = useState(initialValue)

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
          ...values,
          [name]:value
        })
  
      }

    return {
        values,
        setValues,
        handleInputChange
    }
}



const useStyles = makeStyles(theme =>({
    root: {
      '& .MuiFormControl-root': {
        width : '80%',
        margin: theme.spacing(1),
        
      },
      '& .MuiGrid-root':{
          textAlign: 'center'
      },
      // '& .MuiButtonBase-root':{
      //     width:'40%'
      // }

    },
    
  }))

export function Form(props) {
    const classes = useStyles()
    return (
       <form className={classes.root} autoComplete="off">
            {props.children}
       </form>
    )
}
