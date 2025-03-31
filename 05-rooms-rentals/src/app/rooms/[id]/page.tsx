import {API_URL} from '@/config';
import {Room} from "@/types";
import {notFound} from "next/navigation";
import React from "react";

export default async function Id({ params }) {
    let rooms: Room | any;

    try {
        rooms = await fetch(API_URL + "/rooms/" + params.id).then((res) => res.json());
    } catch (e) {
        notFound();
    }

  
    const formattedDate = new Date(rooms.createdAt).toLocaleDateString();

    return (
        <>
            <div className="boat-listing flex">
                <img src={rooms.heroUrl} className="img w-1/2" alt="Room" />
                <div className="room-details pl-8">
                    <h1 className="font-bold text-2xl pb-2">{rooms.title}</h1>
                    <p>{rooms.description}</p>
                    <p>Added on {formattedDate}</p>
                    <div className="flex items-center space-x-4">
                        <img src={rooms.owner.portraitUrl} className="rounded-full w-12 h-12" alt="Owner" />
                        <p>{rooms.owner.firstName} {rooms.owner.lastName}</p>
                    </div>
                    <p><strong>Price {rooms.pricePerNight.currency} {rooms.pricePerNight.amount}</strong></p>
                </div>
            </div>
        </>
    );
}