import React from 'react';
import Me from '../components/me';
import Users from '../components/users';
import Tasks from '../components/tasks';

export default function example2() {
    return (
        <div>
            <h4 className="text-muted">EXAMPLE PAGE 2</h4>
            <Me />
            <Users />
            <Tasks />
        </div>
    );
}
