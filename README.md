# Integrating Vuex into React App

I have been wondering if `Vuex` will play nicely with `React JS`. This repo just proved that. Javascript is Javascript irrespective of the framework. Aside from reactivity issues, everything worked smoothly. `React` components were able to consumed data directly from `Vuex` getters. Please see the Lessons Learnt section below for detailed analysis of the integration.

## How to use

Clone this repo.

```sh
git clone https://github.com/vuex-integration-with-react-app
cd vuex-integration-with-react-app
```

Install it and run:

```sh
yarn install
yarn serve
```

## Lessons Learnt

1. Initially, the table rows data are store in a `tableData` array and fetced into the `App.js` component file from the Vuex store via a `getter` (`getRows`). The fetch data was directly assigned to the `rows` prop of the `DataGrid` component within `App.js` file. This worked well.
2. Next, a `FormModal` component was implemented to enable capture of form data. When submitted, the form data was stored in a form object in the Vuex store and also used to update the `tableRows` array in the Vuex store. These were done by two separate Vuex's mutations and they worked excellently well.
3. Now, it was expected that the `rows` data in the `DataGrid` component will update but this was not the case. Most likely, React was not able to detect the reactivity of the `getRows` getter. In order to force a re-render of the `DataGrid` component, the `rows` data have to be flushed and re-assigned in some ways (manually).
4. So, the approach which was adopted was bring in the `useState` hook from React. First, the `rows` array from Vuex store was used to initialise the `persons` state via the `useState` hook. Secondly, a Vuex store subscription was set up to listen for mutations. If the mutation type was `submitPerson`, the `setPerson` function was used to flush the `person` state. After flushing the `person` state, it is updated with the new state from Vuex (the new state is the 2nd argument of the Vuex subscription function).
5. This update was not reflecting. I figured out the update needs to be done during the next tick. Vue has a nextTick function but I didn't find that for React. To fix this, I used the `setTimeout` function to delay the update a bit. Note that a timeout as low as 50ms will still work. But I used 1000ms to demonstrate the `loading` functionality of the `DataGrid` component, so that a loading overlay is displayed while waiting for the `rows` prop update.
6. It is important to state that since this is a React app, you will not have access to Vue/Vuex devtools. So, I introduced the Vuex `createLogger` plugin which logs the state of the Vuex store for each mutation or action. This way I was able to adequately debug the Vuex store without depending on Vue/Vuex devtools. Read more about that here: https://next.vuex.vuejs.org/guide/plugins.html#built-in-logger-plugin. Obviously, you should not use the plugin in production.

## Conclusion

I think I can use this method for a micro to small-size React app. But for a large-size React app, I feel this methodology might not be very efficient, especially due to the lack of Reactivity between React components and Vuex data. React-Redux might still be recommended for large projects.

## Attribution
Forked from: https://github.com/mui-org/material-ui/tree/master/examples/create-react-app
