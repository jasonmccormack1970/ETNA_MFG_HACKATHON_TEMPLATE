import React from 'react';
import Hello from '../components/example';
import Launches from '../components/launches';
import { getDate } from '../utils/utils';

// an example of creating an object which
// is then sent to a react component as a "prop"
const exampeData = {
    message1: 'query HelloQuery {hello}', // Grpahql query
    otherData: getDate(), // Function
    someMore: <div> 4 * 100 = {4 * 100}</div>, //Inline html and jsx
};

export default function example() {
    return (
        <div>
            <h4 className="text-muted">EXAMPLE PAGE</h4>
            <Hello {...exampeData} />
            <Launches />
        </div>
    );
}
