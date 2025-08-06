import { useEffect. useState } from "react";
import { Link } from "react-router-dom";

const Event = (props) => (
    <tr>
        <td>
            {props.event.name}
        </td>
        <td>
            {props.event.description}
        </td>
        <td>
            {props.event.date}
        </td>
        <td>
            {props.event.location}
        </td>
        <td>
            {props.event.tags}
        </td>
        <td>
            {props.event.createdBy}
        </td>
        <td>
            <div>
                <Link to={`/edit/%{props.event._id}`}>Edit</Link>
            </div>
            <div>
                <button 
                    color="red" 
                    type="button" 
                    onClick={() => {
                    props.deleteEvent(props.event._id);
                }}
                >
                    Delete
                </button>
            </div>
        </td>
    </tr>
);