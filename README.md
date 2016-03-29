# tidepool-standard-action

[![Travis CI](https://api.travis-ci.org/tidepool-org/tidepool-standard-action.svg?style=svg)](https://travis-ci.org/tidepool-org/tidepool-standard-action)

## Justification

(Or jump to [The Standard](#introduction).)

[Tidepool](https://github.com/tidepool-org/ 'Tidepool on GitHub')'s (enforceable!) standard for redux action objects.

Inspired by [flux-standard-action](https://github.com/acdlite/flux-standard-action 'GitHub: flux-standard-action') but tailored specifically to Tidepool's needs.

> Yes, we are aware of the irony, and we've seen [that XKCD comic](https://xkcd.com/927/ 'xkcd: Standards').

We've created this repository because the flux-standard-action (FSA) project failed us in two places:

1. The `isFSA()` function exposed by FSA does *not* validate the action objects to the level of detail that we require in our heavily-tested applications. 😕

1. FSA's decision to represent error actions with a Boolean `true` in the `error` field, and a JavaScript `Error` object *as* the `payload` causes us problems in a small but significant number of cases where we need *other* information in the `payload` besides the `Error` object in order to update our state tree accurately. In other words, we agree with many of those who chimed in on [FSA's Issue #17](https://github.com/acdlite/flux-standard-action/issues/17 'GitHub: flux-standard-action Issue #17').

In short, since we (at Tidepool) have several applications where we need to adhere to a standard for actions (and validate that standard in unit tests!), we have decided<sup>[1](#footnote)</sup> to create our own standard and utility for this purpose. Others are welcome to adopt our standard as well, but we're not going to be evangelical about it. 😉

<a name="footnote">1</a>: For posterity: @jebeck, in particular, is to blame here, with encouragement from @GordyD.

The remainder of this README is a modified version of [FSA's README](https://github.com/acdlite/flux-standard-action/blob/master/README.md 'GitHub: flux-standard-action README').

## Introduction

A Tidepool-friendly standard for redux action objects. Because we needed it.

### Motivation

It's much easier to work with redux actions if we can make certain assumptions about their shape. For example, all redux actions have a `type` identifier field. Many redux actions also include some payload of data that will be used by the reducers to modify the state tree. Defining a common standard for these patterns enables the creation of useful tools and abstractions and makes our lives easier as developers working on more than one app.

### Design goals

- **Human-friendly.** TSA actions should be easy to read and write by humans.
- **Useful**. TSA actions should enable the creation of useful tools and abstractions.
- **Simple.** TSA should be simple, straightforward, and *opinionated* in its design. (Loose standards aren't easily enforceable!)

### Example

A basic Tidepool Standard Action (TSA):

```js
{
  type: 'ADD_TODO_SUCCESS',
  payload: {
    text: 'Fry up some bacon.'  
  }
}
```

#### Error Example

A TSA that represents an error:

```js
{
  type: 'ADD_TODO_FAILURE',
  error: new Error('Error adding a TODO :('),
  payload: {userId: 'a1b2c3'}
}
```

## Actions

An action MUST

- be a plain JavaScript object.
- have a `type` property.

An action MAY

- have an `error` property.
- have a `payload` property.
- have a `meta` property.

IFF an action has an `error` property, the `error` property MUST

- be a JavaScript `Error` object.

IFF an action has a `payload` property, the `payload` property MUST

- be a plain JavaScript object.

IFF an action has a `meta` property, the `meta` property MUST

- be a plain JavaScript object.

An action MUST NOT include properties other than `type`, `payload`, and `error`, and `meta`.

### `type`

The `type` of an action identifies to the consumer the nature of the action that has occurred. In a TSA, `type` MUST be a JavaScript `String` constant.

### `error`

The optional `error` property MUST be a JavaScript `Error` object. It indicates that the action be interpreted as an error action.

### `payload`

The optional `payload` property MUST be a plain JavaScript object. It represents the payload of the action. Any information about the action that is not the `type` or status of the action should be part of the `payload` object.

### `meta`

The optional `meta` property MUST be a plain JavaScript object. It is intended for any extra information that is not part of the `payload`.

## Testing utility

This module (tidepool-standard-action) is published on [npm](https://www.npmjs.com/ 'npm'). It exports an `isTSA` utility function that may be used as follows:

```js
import { isTSA } from 'tidepool-standard-action';

const action = {...};

isTSA(action);
```

`isTSA` returns `true` if `action` complies with the standard describe above and `false` otherwise.
