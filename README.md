# Fluxible-App Step by Step
On this post I want to show how to create a fluxible app step by step. I will be developing one (or several) of Yahoo's [flux examples](https://github.com/yahoo/flux-examples).

## Hello World
- Install node.js and npm
- package.json with initial dependencies
- create a basic React component that just renders 'Hello World'
- create an express app (server.js). Add a middleware to render our React component.

## Using routes
- Create `<Home>` and `<About>` Components
- Modify the ApplicationComponent so it renders either `<Home>` or `<About>` based on the current route.
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
Since the Application component gets its state from ApplicationStore, and ApplicationStore was updated when it handled the 'CHANGE_ROUTE_SUCCESS', we can use the current state to determine which sub-component to render (`<Home>` or `<About>`)

Note: We're using the FluxibleMixin, which includes a handy `getStore()` method that knows how to get the correct store instance from the provided context.

## Adding a NavBar
- Create `<Nav>` component, to render our nav bar.
- Modify `<Application>`, so it renders `<Nav>` above the content
- Add a 'label' property to our urls, so we can use it inside `<Nav>`
// To get styling
- Create an `<HTML>` component, to render the base template for our app (including styles)
- Modify server.js so it renders the app component inside the html component

## Client App
- Add dehydrate and rehydrate functions to our ApplicationStore, to control how its serialized/deserialized.
- Use express-state to expose current state to `res.local.state`, inside an `App` namespace. Current state is obtained by calling app.dehydrate(), which in turn calls dehydrate() on all stores registered with the app.
- Modify the `<HTML>` component so it renders res.local.state.
- Create client.js. It will create a new app instance, and rehydrate it with the state passed from the server.
- Use webpack to compile/bundle the client. Modify `<HTML>` so it loads the bundled client.
- Add a store listener on `<Application>` so it updates whenever the ApplicationStore changes (eg: when the user clicks on a link and the current route changes)
- Add the RouterMixin to `<Application>` so the browser URL is updated correctly when the user visits a new route.

## Todos
- Create services/todo.js to offer a CRUD service for todos. It will store everything in memory, but will use setTimeout to simulate calling a DB.
- Add the Fetchr plugin to our app.js so it can connect to the todo service.
- Register the todo service on server.js (It requires body-parser).
- Create a TodoStore to handle app state for todos. Register the TodoStore with our app.js
- Modify Home.jsx so it renders todos
- Modify Application.jsx so it passes context to Home.jsx
- Add some stylesheets to assets/todomvc-common and require it on client.js
- Modify webpack.config.js so assets are bundled.

This is the process when we visit the home page:
1. A new request is made, server.js receives it.
2. Our middleware creates a new context instance and calls context.executeAction(navigateAction), passing it the current route.
2. navigateAction uses the routrPlugin to look for a matching route (home). Since we defined the showTodosAction as an action for the home route, the showTodosAction is executed.
3. The showTodosAction uses the fetchr plugin to make a 'read' request on the todos service.
4. After the read request succeeds, the showTodosAction dispatches a 'RECEIVE_TODOS_SUCCESS' action, with the todos that were returned.
5. The 'RECEIVE_TODOS_SUCCESS' action is dispatched to all stores registered with the app.
6. The TodoStore executes its _receiveTodos() method in response to the 'RECEIVE_TODOS_SUCCESS'. The _receiveTodos() method updates updates the TodoStore's local copy of todos.
7. The showTodosAction calls its callback function, letting the NavigateAction know it can continue.
8. The navigateAction emits the 'CHANGE_ROUTE_SUCCESS' action, which is dispatched to all stores registered with the app.
9. ApplicationStore executes its handleNavigate() method in response to the 'CHANGE_ROUTE_SUCCESS' action. The handleNavigate() method will update the ApplicationStore state.
10. Inside the executeAction callback, we'll create a new instance of our Application component, passing it the current context as a prop.
11. We render the Application component as a string, and send the result as our response. 


Notice: when we visit the About page, and then click on the Home page, an AJAX request will be made to read from the todos service.
