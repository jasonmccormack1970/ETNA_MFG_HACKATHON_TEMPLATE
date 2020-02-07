import React from 'react';

export default function Mflag() {
    return (
        <div className="my-3">
            <p>
                <span className="px-3 mr-2 bg-success" /> = Launch was a success
            </p>
            <p>
                <span className="px-3 mr-2 bg-danger" /> = Launch Failed or is in the future
            </p>
        </div>
    );
}
