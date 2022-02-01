import { CUSTOM_CLASSNAMES, EVENT_2 } from '../lib/helpers/defaults'
import ListedDetails from '../lib/ListedDetails/main'

export default {
    title: 'Listed Details',
    component: ListedDetails,
}

const Template = args => <ListedDetails { ...args } />

export const Venue = Template.bind({})
Venue.args = {
    id: EVENT_2.id, 
    title: 'Venue',
    titleBorderHidden: false,
    values: EVENT_2.venue,
    textDetailsCustomClassNames: CUSTOM_CLASSNAMES,
    linkDetailsCustomClassNames: CUSTOM_CLASSNAMES,
    wrapperCustomClassNames: CUSTOM_CLASSNAMES
}

export const Organizer = Template.bind({})
Organizer.args = {
    id: EVENT_2.id,
    title: 'Organizer',
    titleBorderHidden: false,
    values: EVENT_2.organizer,
    textDetailsCustomClassNames: CUSTOM_CLASSNAMES,
    linkDetailsCustomClassNames: CUSTOM_CLASSNAMES,
    wrapperCustomClassNames: CUSTOM_CLASSNAMES
}