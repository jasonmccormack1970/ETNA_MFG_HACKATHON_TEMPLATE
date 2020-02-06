import React from 'react';

export default function home() {
    return (
        <div>
            <h4 className="text-muted">HOME PAGE</h4>
            <div>
                <h5 className="text-muted">Manufacturing ‘Hackathon’</h5>
                <h6 className="lead">Background</h6>
                <div>
                    SpaceX is a company that launches rockets into space. They
                    have had successes and failures. In order to increase the
                    successes, they realise they need a plan for each rocket
                    launch. This plan would have a description, due date, status
                    and detail all necessary actions for a successful launch.
                    Each action would include a due date, responsible person and
                    the level of completion.
                </div>
                <h6 className="lead">Use Cases</h6>
                <ul>
                    <li>
                        The launch manager needs to create actions required for
                        a rocket launch.
                    </li>
                    <li>
                        The launch manager needs to create engineers who will
                        perform actions.
                    </li>
                    <li>
                        The launch manager needs to create a rocket launch plan.
                    </li>
                    <li>
                        The launch manager needs to add existing actions to a
                        rocket launch plan.
                    </li>
                    <li>
                        The launch manager needs to assign engineers to an
                        action in a plan.
                    </li>
                    <li>
                        The engineer needs to update actions on a rocket launch
                        plan.
                    </li>
                </ul>
            </div>
        </div>
    );
}
