import React from 'react';
import Actions from '../components/actions';
import AddAction from '../components/addAction';

export default function actions() {
    return (
        <div>
            <div>
                <h4 className="text-muted">Actions</h4>
                <Actions />
            </div>
            <div>
                <AddAction />
            </div>
        </div>
    );
}