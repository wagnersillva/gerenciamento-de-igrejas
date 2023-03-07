import React from "react";
import CardInformation from "./CardInformation";
import "./style.css";

export default function GroupCardsInformation(){
    return (
        <div className={'group-card-information'}>
            <CardInformation />
            <CardInformation />
            <CardInformation />
            <CardInformation />
        </div>
    )
}