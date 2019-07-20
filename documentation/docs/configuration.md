---
id: configuration
title: Configuration
---

## threshold

`type: number`

`default: 100`

This denotes the threshold (in percentage) of surface area that an Element is considered to be visible.
For instance

-   a. if threshold is 100, & if 100% of the Element is visible, it will be considered as visible.
-   b. if threshold is 20, & percentage element visibility >20 , it will be considered as visible.

## scheduler

`type: object`

Below configuration are applicable to scheduler. Some of the configuration may only be applicable to certain `mode`. Currently only `interval` type of mode is supported.

### mode

`type: string`

`default: 'interval'`

`possible values: interval, scroll, raf, observer`

Mode decides what kind of scheduler has to be used. Scheduler is mechanism by which viewability of element is calculated at regular interval/event/user activity.

-   `interval` - In this mode, the scheduler will trigger the spectators after every 'n' ms (specified in interval option)

-   `raf` - In this mode, the scheduler will trigger the spectators by using requestAnimationFrame cycles of the browser.

-   `scroll` - In this mode, the scheduler will trigger the spectators only if there is user event in form of 'scroll', 'resize', 'zoom'

-   `observer` - In this mode, Observer API are used to trigger the spectators.

### interval

`type: number (time in ms)`

`default: 500`

This is interval after which 'interval' type of scheduler will trigger the spectators. A value of 500 means that, after every 500ms viewability would be calculated.

### attentionMode

`type: boolean`

`default: true`

Mode to disable Perceptor (schedulers), if browser is not in focus (although visible on the screen). This may occur when the browser is on visible on screen but the focus is on other app. You may want to disable this mode, if element under observation is video/audio/slideshow element and continues to run even if browser focus is lost.

## viewOffset

`type: object`

By default, visibility of element is based on viewport of the browser. This configuration helps in making the viewport for detection shorter from the edges. In case of site with fixed header, or sidebar, or sticky footer, these setting can be used to accurately calculate visibility of the element. In such cases the element may be detected as visible but is hidden under edge elements, say fixed header; and these offset values must be used to accurately calculate the visibility.

### top

`type: number (in px)`

`default: true`

The top offset of the viewport

### left

`type: number (in px)`

`default: true`

The left offset of the viewport

### right

`type: number (in px)`

`default: true`

The right offset of the viewport

### bottom

`type: number (in px)`

`default: true`

The bottom offset of the viewport

## subscribers

`type: Array <function>`

`default: []`

In addition to default subscribers, one can add list of additional subscribers who would be part of subscriberChain of that particular Perceptor instance. Each subscriber function is called be the scheduler to be notified about the result of SpectatorChain on the element.

## spectators

`type: Array <function>`

`default: []`

In addition to default spectators to calculate the viewability/visibility of the element, one can add list of additional spectators who would be part of spectatorChain to calculate the visibililty. For example `isVisible` property of the spectatorResult can be over-written on certain scenarios to report visibility of custom element correctly.

## clickHandler

`type: function`

`default: noop () => {}`

A function that would be triggered with the context of current perceptor instance on 'click' event over the DOM element.
