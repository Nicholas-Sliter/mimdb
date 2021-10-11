This is the starter template for CS312 projects based on Next.js](https://nextjs.org/). _You should replace this portion with a description of your project._

The project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and includes a number of additional libraries, including the Rest Testing Library, Jest, and ESLint, among others. It also includes the basic configuration for using Travis CI.

To ensure consistent style, this template is also set up with [Prettier](https://github.com/prettier/prettier), with the configuration to automatically reformat code during a commit. That is whenever you commit your code, Prettier will automatically reformat your code during the commit process (as a "hook"). The hook is specified in the `package.json` file.

**Note: I've provided the processes for interacting with this project if you have a local installation. Running on Replit simplifies many of these steps (but not all of them, so please do read through).**


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Testing

To run tests, just run the test script:

```
npm test
```

You can also run the tests in "watch" mode where it will re-run the tests as you save your work:

```
npm test -- --watch
```

You can also run jest selectively on a single file using `npx`:

```
npx jest path/to/file
```

## Linting

The repository is set up to run eslint with our custom rule set we have used for the last assignments.

```
npm run lint
```

## Continuous Integration

The skeleton is setup for CI with Travis-CI.

## Deploying to Heroku

Your application can be deployed to [Heroku](heroku.com) using the approach demonstrated in this [repository](https://github.com/mars/heroku-cra-node).

Assuming that you have a Heroku account, have installed the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli) and committed any changes to the application, to deploy to Heroku:

1. Log in to Heroku

```
heroku login
```

1. Create the Heroku app, e.g., to create a project called `project-name`:

   ```
   heroku create project-name
   ```

1. Push to Heroku

   ```
   git push heroku main
   ```

1. Open your newly deployed application

```
heroku open
```

Depending on how you implement your server, you will likely need create "add-ons" for your database, etc. and migrate then seed your database before you deploy.

### Heroku with RDBMS

Heroku provides a free add-on with the PostgreSQL database. Provision the add-on with the following command. The provisioning will define `process.env.DATABASE_URL` in the Heroku environment (which can be used by your database interface, e.g. by Knex in its configuration file).

```
heroku addons:create heroku-postgresql:hobby-dev
```

Once you have deployed your application (and provisioned the database) migrate and seed the database on Heroku with the following commands. `heroku run` executes the specified command in the context of your application on the Heroku servers.

```
heroku run 'npx knex migrate:latest'
heroku run 'npx knex seed:run'
```

You can test your backend without pushing to Heroku. The database Heroku created for you is accessible from anywhere. Use `heroku config` to obtain the `DATABASE_URL` variable. Define that variable locally with `?ssl=true` appended, e.g.

```
export DATABASE_URL="postgres://...?ssl=true"
```

You can also directly access your PostgreSQL database. Download and install one of the many PostgreSQL clients and use the `DATABASE_URL` from Heroku for the connection information.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
