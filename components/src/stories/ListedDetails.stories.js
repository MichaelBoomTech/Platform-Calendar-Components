import { Event_2 } from '../lib/helpers/defaults'
import ListedDetails from '../lib/ListedDetails/main'

export default {
    title: 'Listed Details',
    component: ListedDetails,
}

const Template = args => <ListedDetails { ...args } />

export const Venue = Template.bind({})
Venue.args = {
    id: Event_2.id, 
    values: Event_2.venue
}

export const Organizer = Template.bind({})
Organizer.args = {
    id: Event_2.id,
    title: 'Organizer',
    values: Event_2.organizer
}