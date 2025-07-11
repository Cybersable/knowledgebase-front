## Project structure

---

Structure of project based on [featured-sliced-design](https://feature-sliced.design) and [next.js app router](https://nextjs.org/docs/app)

#### Layers:

`app` - layouts, pages or large parts of a page in nested routing.

`services` - anything that makes the app run — entrypoints, global styles, providers.

`proccesses` - complex inter-page scenarios.

`widgets` - large self-contained chunks of functionality or UI, usually delivering an entire use case.

`features` - reused implementations of entire product features, i.e. actions that bring business value to the user.

`entities` - business entities that the project works with, like user or product.

`shared` - reusable functionality, especially when it's detached from the specifics of the project/business, though not necessarily.