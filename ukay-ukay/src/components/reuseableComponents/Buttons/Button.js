import { Button as MuiButton} from '@material-ui/core'
import React from 'react'


export default function Button(props) {

    const{text,size,color,variant,onClick, ...other} = props

    return (
        <MuiButton
        variant = {variant || "contained"}
        size={size || "large"}
        color={color || "primary"}
        onClick={onClick}
        {...other} >
         {text}
        </MuiButton>
    )
}
