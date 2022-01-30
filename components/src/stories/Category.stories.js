import CategoryItem from '../lib/CategoryItem/main'
import { Event_2 } from '../lib/helpers/defaults'

export default {
    title: 'Categories',
    component: CategoryItem,
    matchers: {
        data: {color: /(background|color)$/i}
    }
}

const Template = args => <CategoryItem { ...args } />

export const Category = Template.bind({})
Category.args = {
    data: Event_2.categories?.[0]
}