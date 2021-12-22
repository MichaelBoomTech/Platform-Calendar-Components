import { copyLink, downloadSharer, openAddToUrl, openShareUrl } from "./addShare";

export const LISTED_DETAILS_CONSTRUCTOR = {
  name: {
    iconName: 'profile',
  },
  phone: {
    preposition: 'tel:',
    iconName: 'Mobile',
  },
  email: {
    preposition: 'mailto:',
    iconName: 'mail2',
  },
  website: {
    preposition: '',
    iconName: 'earth',
    validate: (value) => {
      if(value.indexOf('https://') === -1) return 'https://' + value
      return value
    }
  },
  location: {
    iconName: ''
  }
}

export const ADD_SHARE_ICONS_CONSTRUCTOR = {
  TITLE: 'Add & Share',
  ADD_TO_ICONS: {
    rowId: 1,
    addToSectionName: 'Add to calendar',
    icons: [
      {
        type: 'google',
        clickHandler: openAddToUrl
      },
      {
        type: 'microsoftoutlook',
        clickHandler: downloadSharer
      },
      {
        type: 'apple',
        clickHandler: downloadSharer
      },
      {
        type: 'yahoo',
        clickHandler: openAddToUrl
      }
    ],
  },
  SHARE_ICONS: {
    rowId: 2,
    shareSectionName: 'Share Event',
    copyActionTooltipText: 'Copy Event Url',
    copiedTooltipText: 'Copied',
    icons: [
      {
        type: 'facebook',
        clickHandler: openShareUrl
      },
      {
        type: 'linkedin',
        clickHandler: openShareUrl
      },
      {
        type: 'twitter',
        clickHandler: openShareUrl
      },
      {
        type: 'copyLink',
        clickHandler: copyLink
      }
    ],
  }
}