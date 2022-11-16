import { NextPage } from "next";
import React, { useState } from "react";
import NewProviderCard from "../../components/NewProviderCard"

const providers: NextPage = () => {
    return(
        <div>
            <NewProviderCard/>
        </div>
    )
}

export default providers