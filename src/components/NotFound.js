import React from 'react';
import { Simple404 } from "@404pagez/react";

function NotFound(props) {
    return (
        <div className={'d-flex justify-content-around'}>
            <Simple404 size={20} isButton={false} />
        </div>
    );
}

export default NotFound;
