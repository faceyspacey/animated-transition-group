# AnimatedTransitionGroup

`AnimatedTransitionGroup` is a sound answer to `<ReactTransitionGroup />` and any wishlist you might have for it. 
We suggest you become familiar with those first to truly understand its benefits:

* [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html)
* [ReactTransitionGroup](https://facebook.github.io/react/docs/animation.html#low-level-api-reacttransitiongroup)


The biggest problem it solves is that you can ***both*** provide callbacks for the 3 transitions (`appear`, `enter`, `leave`) ***AND***
have your css classes applied. `ReactCSSTransitionGroup` does not allow for callbacks.

However, we've taken it one step farther to allow you to customize each individual child component rendered within the group. So that
means you can provide props (such as animation duraiton, delay, etc) that apply to all children by setting them at the group level,
***OR*** you can override them by passing the props to the `<AnimatedChild />` components that wrap your actual children.

Lastly, we offer simpler prop names and a lot more customization:

* **duration** (`duration`, `appearDuration`, `enterDuration`, `leaveDuration`)
* **delay** (`delay`, `appearDelay`, `enterDelay`, `leaveDelay`)
* **class names** (the `appear`, `enter`, and `leave` props)
* **and a prefix** (prepended to all classes)

## Installation
```yarn add animated-transition-group```


## Usage

```javascript
import React from 'react'
import { connect } from 'react-redux'
import { AnimatedTransitionGroup, AnimatedChild } from 'animated-transition-group'

const PageSwitcher = ({ page }) =>
  <AnimatedTransitionGroup 
    component="div" 
    duration={500}
    delay={100}
    prefix='fade'
  >
    <AnimatedChild key={page} appearDelay={300} enterDelay={500} leaveDuration={1000}>
      {getComponent(page)}
    </AnimatedChild>
  </AnimatedTransitionGroup>

const getComponent = page => {
  switch(page) {
    case 'Home':  
      return <Home />
    case 'List':  
      return <List />
    case 'Video':  
      return <Video />
  }
}

const mapState = ({ page }) => ({ page })
export default connect(mapState)(PageSwitcher)
```
*note: you can have as many nested `<AnimatedChild />`'s as you want. This just happens to be a switcher :)*

The secret ingredient is obviously the `key` property passed to your children. That lets React differentiate between
the components. More importantly it lets you define just a single component in this case, rather than require you to
hack something together that has 2 components nested in the code at once. React just knows what to do. 

The `ReactTransitionGroup`
toolset hasn't received enough credit in my opinion--partly because the flaws our component here solves--but we believe the abstraction
it provides to use state to determine when components should not be there, while keeping the concept of animations + duration
embedded in the dom, makes it world class. 

As for having multiple nested `AnimatedChild` components, of course also use the `key` prop to uniquely identify them so React
knows what to do, i.e. when to attach and detach them to/from the DOM.

# API
The below props can be applied to both `<AnimatedTransitionGroup />` and `<AnimatedChild />`. The difference is that if
you provide them to `AnimatedTransitionGroup`, they will be passed down to `AnimatedChild`. And of course, if `AnimatedChild`
supplies its own, it will override it. duh!

### prefix: string
the string prepended to all classes like this: `myPrefix-appear`, `myPrefix-appear-active`, `myPrefix-enter`, etc

### duration: number
the time in milliseconds that child components are expected to animate for

### delay: number
the time in milliseconds that child components are supposed to wait before being animated. Instances won't be 
removed from the DOM until the sum of the delay and duration has been reached.

### appear: string
### enter: string
### leave: string
by suppling these you can override the classes applied, e.g: `leave-active` can be `foobar-active`

### enterDuration: number
### leaveDuration: number
### appearDuration: number
by supplying these, you can customize the duration length (in ms) of the individual transition

### enterDelay: number
### leaveDelay: number
### appearDelay: number
by supplying these, you can customize the delay length (in ms) of the individual transition

### onAppear: Function
### onEnter: Function
### onLeave: Function
these callbacks will of course be called for the given transition


## AnimatedTransitionGroup only:
The following props are only available on `<AnimatedTransitionGroup />`:

### onFull: Function
called when the first `AnimatedChild` renders within `AnimatedTransitionGroup`

### onEmpty: Function
called when there are no nested `<AnimatedChild />` components. It is called after the final component animates its departure, using
the the duration and delay passed to `AnimatedTransitionGroup` (not the child) to calculate that time.

### zeroElements: number
to calculate whether there are zero nested children, sometimes you need to indicate what that number is. For example,
if you have an array of children, when the array is empty, it's counted as `1` even though no children are rendered. 
So you set `zeroElements={1}`.
