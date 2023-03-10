import csrfFetch from "./csrf"

export const SET_LISTINGS ='listings/setListings';
export const ADD_LISTING ='listings/addListing';
export const REMOVE_LISTING ='listings/removeListing';


const setListings =(listings) => ({
    type: SET_LISTINGS,
    payload: listings
})

const addListing =(listing) => ({
    type: ADD_LISTING,
    payload: listing
})

const removeListing =(listingId) => ({
    type: REMOVE_LISTING,
    payload: listingId
})

// store selectors

export const getListings = (state)  => {
    if(state && state.listings){
        return Object.values(state.listings)
    }
    return []
}

export const getListing = (listingId) => (state) => {
    if(state && state.listings){
        return state.listings[listingId]
    }
    return null
}

//thunk action creator

export const fetchListings = () => async(dispatch) => {
    const res = await csrfFetch('/api/listings')
    if(res.ok){
        const data = await res.json();
        dispatch(setListings(data))
    }
}

export const fetchListing = (listingId) =>async(dispatch) => {
    const res = await csrfFetch(`/api/listings/${listingId}`)

    if(res.ok){
        const data = await res.json();
        dispatch(addListing(data))
    }
}

export const createListing = (formData) => async(dispatch) => {
    const res = await csrfFetch('/api/listings',{
        method:'POST',
        body:formData
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(listing)
    })

    if(res.ok){
        const data = await res.json();
        dispatch(addListing(data))
    }
}

export const updateListing =(formData, listingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${listingId}`,{
        method: 'PATCH',
        body: formData
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(listing) 
    })

    if(res.ok){
        const data = await res.json();
        dispatch(addListing(data))
    }
}

export const  deleteListing = (listingId) => async(dispatch) => {
    const res = await csrfFetch(`/api/listings/${listingId}`,{
        method:'DELETE'
    })

    if(res.ok){
        dispatch(removeListing(listingId))
    }
}

// search listings

export const searchListings = (searchValue) => async(dispatch) => {
    const res = await csrfFetch(`/api/listings/search?query=${searchValue}`)

    if(res.ok){
        const data = await res.json()
        dispatch(setListings(data))
    }
}


//reducer
const listingsReducer =( state={}, action) => {
    switch(action.type){
        case SET_LISTINGS:
            return {...action.payload}
        case ADD_LISTING:
            return {...state,[action.payload.id]: action.payload}
        case REMOVE_LISTING:
            const newState = {...state};
            delete newState[action.payload];
            return newState;
        default:
            return state
    }
}

export default  listingsReducer