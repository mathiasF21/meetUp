import { useEffect, useState } from "react";
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
                <Link to={`/edit/${props.event._id}`}>Edit</Link>
            </div>
            <div>
                <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
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

export default function EventList() {
    const [events, setEvents] = useState([]);

    // This method fetches the events from the database.
    useEffect(() => {
        async function getEvents() {
            const response = await fetch(`http://localhost:3000/events/`)
            if(!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const events = await response.json();
            setEvents(events);
        }
        getEvents();
    }, []);

    // This method will delete an event.
    async function deleteEvent(id) {
        try {
            const response = await fetch(`http://localhost:3000/events/${id}`, {
                method: "DELETE",
            });
            
            if (!response.ok) {
                throw new Error(`Failed to delete event: ${response.statusText}`);
            }
            
            // Remove the deleted event from the state
            setEvents(events.filter(event => event._id !== id));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    }

    // This following section will display the table with the events of individuals.
    return (
        <div className="container mx-auto px-4 py-8">
            <h3 className="text-2xl font-bold mb-6">Event List</h3>
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Location</th>
                        <th className="border border-gray-300 px-4 py-2">Tags</th>
                        <th className="border border-gray-300 px-4 py-2">Created By</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <Event 
                            event={event} 
                            deleteEvent={deleteEvent}
                            key={event._id} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

