import { CUSTOM_CLASSNAMES, EVENT_1, EVENT_2 } from '../lib/helpers/defaults'
import BlurryLoadableImg from '../lib/BlurryLoadableImg/main'

export default {
    title: 'BlurryLoadableImg',
    component: BlurryLoadableImg,
}

const Template = args => (
    <div style={{width: 450, height: 450}}>
        <BlurryLoadableImg { ...args } />
    </div>
)

export const WithImage = Template.bind({})
WithImage.args = {
    url: EVENT_1.image,
    color: EVENT_2.color,
    title: EVENT_2.title,
    showColorAsBackground: true,
    wrapperCustomClassNames: CUSTOM_CLASSNAMES,
    imgCustomClassNames: CUSTOM_CLASSNAMES,
}

export const WithoutImage = Template.bind({})
WithoutImage.args = {
    url: EVENT_2.image,
    color: EVENT_2.color,
    title: EVENT_2.title,
    showColorAsBackground: true,
    wrapperCustomClassNames: CUSTOM_CLASSNAMES,
    imgCustomClassNames: CUSTOM_CLASSNAMES,
}