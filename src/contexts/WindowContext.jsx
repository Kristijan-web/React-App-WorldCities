/* eslint react/prop-types: 0 */

import { createContext, useContext, useEffect, useReducer } from "react";

const WindowContext = createContext();

const initialState = {
    currWidthAbove600: true,
    mapClicked: false
}

function reducer(state,payload) {
    switch(payload.type) {
        case "currWidthAbove600/false": {
           return {...state,currWidthAbove600: false }
        }
        case "currWidthAbove600/true": {
            return {...state,currWidthAbove600: true}
        }
        case "mapClicked/true": {
            return {...state,mapClicked: true}
        }
        case "mapClicked/false": {
            return {...state,mapClicked: false}
        }
        default: throw new Error("Greska")

    }
}

function WindowProvider({children}) {

    const [{currWidthAbove600,mapClicked},dispatch] = useReducer(reducer,initialState)

    useEffect(function(){
        if(window.innerWidth < 600) {
            dispatch({type: 'currWidthAbove600/false'})
        }
        window.addEventListener('resize',function() {
            if(this.window,this.innerWidth < 600) {
               dispatch({type: 'currWidthAbove600/false'})
            }
            else {
                dispatch({type: 'currWidthAbove600/true'})
            }
        })
    },[])
    return <WindowContext.Provider value={{currWidthAbove600,mapClicked,dispatchWindow: dispatch}}>
          {children}
    </WindowContext.Provider>
}

function useWindow() {
    const x = useContext(WindowContext);
    if(x == undefined) console.error("Component has not subscribed to the contect")
    return x;
}

export {WindowProvider,useWindow}