import React from 'react';
import Hello from '../components/hello';
import { getDate } from '../utils/utils';

// an example of creating an object which
// is then sent to a react component as a "prop"
const exampeData = {
    message1: 'query HelloQuery {hello}', // Grpahql query
    otherData: getDate(), // Function
    someMore: <p> 4 * 100 = {4 * 100}</p>, //Inline html and jsx
};

export default function test1() {
    return (
        <div>
            <h4 className="text-muted">TEST PAGE</h4>
            <Hello {...exampeData} />
        </div>
    );
}
