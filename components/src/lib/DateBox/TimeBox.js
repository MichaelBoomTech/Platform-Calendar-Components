import React, { memo } from 'react'
import styles from './main.module.css'
import PropTypes from 'prop-types'
import { formatDate, formatTime } from '../helpers/dateBox'
import { combineClassNames } from '../helpers/commons'

const TimeBox = ({
  start,
  end,
  showIcons,
  locale,
  dateFormat,
  timeFormat,
  all_day,
  showTimeZone,
  timeZone,
  wrapperCustomClassNames = [],
  agenda,
  allDayText,
  oneLine,
  fixedHeight,
}) => {

  const { startDate, endDate } = formatDate(start, end, dateFormat, locale)
  const { startTime, endTime } = formatTime(
    start,
    end,
    timeFormat,
    all_day,
    locale
  )
  const timeZoneToShow = (all_day || !showTimeZone) ? '' : timeZone
  const datesEqual = startDate === endDate
  
  if (datesEqual && all_day && agenda) {
    return (
      <div className={combineClassNames([styles.all_day_text_parent, ...wrapperCustomClassNames])}>
        <p className='all_day_text'>{allDayText}</p>
        {fixedHeight && <p className={combineClassNames([styles.hidden, 'all_day_text'])}>hidden row</p>}
      </div>
    )
  }

  const showHiddenRow = datesEqual && (all_day || agenda) && fixedHeight;

  return (
    <div className={combineClassNames([...wrapperCustomClassNames, styles.timebox_wrapper])}>
      {!(datesEqual && agenda) &&
        <div className={styles.two_line_start}>
          {
            showIcons && 
            <div className={datesEqual ? 'icon-calendar' : styles.start_date_icon + ' icon-clock'}/>
          }
          <p className={oneLine ? styles.oneLine : 'undefined'}>
            {
              startDate + (datesEqual ? '' : startTime + ' ' + timeZoneToShow)
            }
          </p>
        </div>
      }

      {!(datesEqual && all_day) &&
        <div className={styles.two_line_end}>
          {
            showIcons && 
            <div className={(datesEqual ? styles.start_date_icon : '') + ' icon-clock'} />
          }
          <p className={oneLine ? styles.oneLine : null}>
          {
            !datesEqual ? 
            endDate + endTime + ' ' + timeZoneToShow : 
            (startTime.trim() + ' -' + endTime + ' ' + timeZoneToShow)
          }
          </p>
        </div>
      }
      {showHiddenRow &&
        <div className={combineClassNames([styles.two_line_start, styles.hidden])}>
          <p className={oneLine ? styles.oneLine : undefined}>
            hidden row
          </p>
        </div>
      }
    </div>
  )
}

export default memo(TimeBox)

TimeBox.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  showIcons: PropTypes.bool,
  wrapperCustomClassNames: PropTypes.array,
  oneLine: PropTypes.bool,
  fixedHeight: PropTypes.bool
}
