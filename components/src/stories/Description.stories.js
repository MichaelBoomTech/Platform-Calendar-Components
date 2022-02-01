import { CUSTOM_CLASSNAMES, EVENT_1 } from '../lib/helpers/defaults'
import Desc from '../lib/Description/main'

export default {
    title: 'Description',
    component: Desc,
}

const Template = args => <Desc { ...args } />

export const Description = Template.bind({})
Description.args = {
    title: 'Description',
    children: EVENT_1.desc,
    wrapperCustomClassNames: CUSTOM_CLASSNAMES 
}