import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, getAppointments, updateAppointment,deleteAppointment} from "../../store/appointment";
import ListingListItem from "../ListingIndexPage/ListingListItem";
import RescheduleModal from "./RescheduleModal";


const TourListItme = ({appointment, listings}) => {
    const dispatch =useDispatch();

    const handleCancel =() => {
        const newAppointment = {
            id: appointment.id,
            agent_id: appointment.agentId,
            user_id: appointment.userId,
            listing_id: appointment.listingId,
            tour_time: appointment.tourTime,
            message: appointment.message,
            cancelled: true
        }

        dispatch(updateAppointment(newAppointment))
    }
    // console.log([appointment.listingId])
    // console.log(listings[1])
    const handleDelete =() => {
        dispatch(deleteAppointment(appointment.id))
    }


    return (
        <div>
            <header>{appointment.cancelled? "Cancelled Tours" : 'Upcoming Tour'}</header>
            <div className="appointment-item"  >
                <div className="appointment-info">
                    <h3>{appointment.tourTime}</h3>
                    <div className="tour-action-btn">
                        <button 
                        className="cancell-tour-btn" 
                        onClick={handleCancel}
                        >Cancell Tour</button>

                    <RescheduleModal 
                    appointment ={appointment} 
                    listing={listings[appointment.listingId]} 
                    />
                    <button 
                    className="" 
                    onClick={handleDelete}
                    >Delete Tour</button>
                </div>
                </div>
                <div className="appointment-listing">
                    <ListingListItem listing={listings[appointment.listingId-1]} />
                </div>
            </div>
        </div>
    
    )
}

export default TourListItme