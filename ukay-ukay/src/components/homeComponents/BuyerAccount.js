import Modal from '../reuseableComponents/Modal'
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../contextApi/StateProvider';
import '../../css/BuyerAccount.css'
import { db } from '../../firebase';
import UserFullDetailsForm from '../reuseableComponents/UserFullDetailsForm';
import { FormControl } from '@material-ui/core';
import Controls from '../reuseableComponents/Controls';

export default function BuyerAccount() {
    const [userFullDetail, setUserFullDetail] = useState([]);
    const [openModal,setOpenModal] = useState(false)

    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        // generate the special stripe secret which allows me to charge a customer
     let cleanup =false
     
        const getUserFullDetail =  () => {
            if(!cleanup){
                if(user){
                    db.collection('users').doc(user?.uid).get().then(doc => {
                        setUserFullDetail(doc.data()) 
                    })
                }
            }
              
        }
        getUserFullDetail();

      
           
   return () => {
       cleanup =true;
     }

   }, [openModal])
    return (
         <div className="buyeraccount">
         <Modal title={"Edit Account"} openModal={openModal} setOpenModal={setOpenModal}>
              <UserFullDetailsForm initialValue={userFullDetail} user={user} db={db} openModal={openModal} setOpenModal={setOpenModal} />
           </Modal>
                <div className="buyeraccount__container">
                     <div className="buyeraccount__head">
                          <h3>My Profile</h3>
                          <p>Manage your account</p> 
                     </div>
                     <div className="buyeraccount__info">
                         <div className="buyeraccount__infocontainer">
                            <div className="buyeraccount__infotitle">
                               <h5>Fullname</h5>
                            </div>
                            <div className="buyeraccount__infocontent">
                                <p>{userFullDetail.fullname}</p>
                            </div>
                         </div>

                         <div className="buyeraccount__infocontainer">
                            <div className="buyeraccount__infotitle">
                               <h5>Email</h5>
                            </div>
                            <div className="buyeraccount__infocontent">
                                <p>{user.email}</p>
                            </div>
                         </div>

                         <div className="buyeraccount__infocontainer">
                            <div className="buyeraccount__infotitle">
                               <h5>Contact number</h5>
                            </div>
                            <div className="buyeraccount__infocontent">
                                <p>{userFullDetail.cnumber}</p>
                            </div>
                         </div>

                         <div className="buyeraccount__infocontainer">
                            <div className="buyeraccount__infotitle">
                               <h5>Full Address</h5>
                            </div>
                            <div className="buyeraccount__infocontent">
                                <p>{userFullDetail.address}</p>
                            </div>
                         </div>

                         <div className="buyeraccount__infocontainer">
                            <div className="buyeraccount__infotitle">
                               <h5>Detailed Address</h5>
                            </div>
                            <div className="buyeraccount__infocontent">
                                <p>{userFullDetail.detailAddress}</p>
                            </div>
                         </div>

                         <div className="buyeraccount__infocontainer">
                            <div className="buyeraccount__infotitle">
                               <h5>Zip</h5>
                            </div>
                            <div className="buyeraccount__infocontent">
                                <p>{userFullDetail.zip}</p>
                            </div>
                         </div>

                     
                            <Controls.Button
                            type="submit"
                            text="Edit"
                            onClick={() => setOpenModal(true)}
                                />

                         {/* <button onClick={() => setOpenModal(true)}>Save</button> */}
                     </div>
                </div>
         </div>
    )
}
