# Fluxible-App Step by Step
On this post I want to show how to create a fluxible-app step by step. I will be developing one (or several) of Yahoo's [flux examples](https://github.com/yahoo/flux-examples).

## Hello World
- Install node.js and npm
- package.json with initial dependencies
- create a basic React component that just renders 'Hello World'
- create an express app (server.js). Add a middleware to render our React component.

## Using routes
- Create <Home> and <About> Components
- Modify the ApplicationComponent so it renders either <Home> or <About> based on the current route.
- Create app.js, our Fluxible-app. app.js uses a routrPlugin (with our custom defined routes), and an ApplicationStore, which holds the current route as its state.
- Modify server.js so it creates a new context on each request, and executes the NavigateAction before rendering.

This is the process:
1. A new request is made, server.js receives it.
2. Our middleware creates a new context instance and calls context.executeAction(navigateAction), passing it the current route.
3. NavigateAction uses the routrPlugin to look for a matching route.
  3.1 If a match is found, a 'CHANGE_ROUTE_SUCCESS' action is dispatched and the callback is called with no errors.
  3.2 If a match is not found, the callback is called with a 'Url does not exist' error.
4. The 'CHANGE_ROUTE_SUCCESS' action is dispatched to all stores registered with the app (ApplicationStore in our case).
Note: A new ApplicationStore instance is created, and the action is immediately dispatched to it.
5. ApplicationStore executes its handleNavigate() method in response to the 'CHANGE_ROUTE_SUCCESS' action. The handleNavigate() method will update the ApplicationStore state.
6. Inside the executeAction callback, we'll create a new instance of our Application component, passing it the current context as a prop. The context, among other things, contains the ApplicationStore instance that was created on step 4.
7. We render the Application component as a string, and send the result as our response. 
Since the Application component gets its state from ApplicationStore, and ApplicationStore was updated when it handled the 'CHANGE_ROUTE_SUCCESS', we can use the current state to determine which sub-component to render (<Home> or <About>)

Note: We're using the StoreMixin, which includes a handy `getStore()` method that knows how to get the correct store instance from the provided context.
