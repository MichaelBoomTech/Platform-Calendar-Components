import { CUSTOM_CLASSNAMES, EVENT_2 } from '../lib/helpers/defaults'
import Category from '../lib/CategoryItem/main'

export default {
    title: 'Category Item',
    component: Category,
}

const Template = args => <Category { ...args } />

export const CategoryItem = Template.bind({})
CategoryItem.args = {
    data: EVENT_2.categories?.[0],
    wrapperCustomClassNames: CUSTOM_CLASSNAMES
}