import React from 'react';
import Hello from '../components/hello';
import Actions from '../components/actions';

// an example of creating an object which
// is then sent to a react component as a "prop"
const stuff = {
    message1: 'query HelloQuery {hello}',
    otherData: 'some info??',
    someMore: 34,
};

export default function test1() {
    return (
        <div>
            <h4 className="text-muted">TEST PAGE</h4>
            <Hello {...stuff} />
            <Actions />
        </div>
    );
}
