# Getting Started

### Installing Node, NPM, and Yarn and starting the server.

This is a **node.js** project. **Node v14 and NPM will be required.**

### Installing Node

To check to see if you have Node installed open a terminal and run:

```
node -v
```

If you get an error or the version number is less than 14 (don't worry the error doesn't hurt your computer it's just your computer saying I don't know what you mean) you will have to install it or update it. See more here: https://nodejs.org/en/

### Installing NPM

To check for NPM open a terminal and run:

```
npm -v
```

Again, if you get an error (don't worry the error doesn't hurt your computer it's just your computer saying I don't know what you mean) you will have to install it.

You can see how to download NPM here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Bonus installations: NVM and Homebrew

**If you plan on doing a lot of Node development** I would recommend **Node Version Manager (NVM).** And use NVM to install NPM. See more here: https://github.com/nvm-sh/nvm

**If you are on Mac or Linux** _and_ you want to do **a lot of Node development** you can install NVM using **Homebrew.** Read more here: https://brew.sh/ and here: https://formulae.brew.sh/formula/nvm#default.

### Installing Yarn

**I also chose to use Yarn, this is optional.** Yarn is basically the same as NPM but faster. To check to see if you have Node installed open a terminal and run:

```
yarn -v
```

Again, if you get an error (don't worry the error doesn't hurt your computer it's just your computer saying I don't know what you mean) you will have to install it. **Yarn requires Node and NPM make sure they are installed** _(see above)_. Once Node and NPM are installed you can install Yarn following the instructions here: https://classic.yarnpkg.com/en/docs/install/.

### Starting the server

**To start the project with Yarn** navigate your terminal to this directory and run:

```
yarn install
```

once that finishes installing (should take a few minutes) you should then run:

```
yarn dev
```

**If you are NOT using Yarn and want to use NPM** delete the yarn.lock file and go into the package.json file. In the _package.json_ file under _"scripts"_ find _"start"_ and change _yarn build && node dist/server.js_ to _npm run build && node dist/server.js_. Once that change is made navigate to this directory in your terminal and run:

```
npm install
```

once that finishes installing (should take a few minutes) you should then run:

```
npm run dev
```

**Yarn runs on NPM you cannot both at the same time.**

# Usage

First off, **what is GraphQL?** GraphQL as defined by GraphQL.org is _"a query language for your API"_. This doesn't clear things up in my opinion. Think of GraphQL as **an alternative to REST** with some added features. GraphQL, much like REST, is **not actually querying a database.** It is the vehicle with which a **Front-End application talks to a Back-End application.** Once that message finds its way to the **Back-End** it is up to the that application to **send a response back.** To get the information for that response is up to the developer. It might query a database. It might have information hard-coded in (that's how I mostly did it here for simplicity sake). It might call on a REST API and send _that_ information the client (which might seem backwards but the world might never be RESTless which is probably a good thing). It might do all of the above. **It is just another tool in the tech tool belt that can make things easier.** To find more information about GraphQL see here: https://GraphQL.org/.

This is a template to build an Apollo GraphQL Gateway. This gateway can be pointed at **any number of compatible GraphQL APIs** and they will be **combined together** into **one** _happy_ **graph.** To see which implementations of GraphQL are compatible see here: https://www.apollographql.com/docs/federation/other-servers/. These subgraphs can point from one domain to another **passing** around **necessary primary keys** and other information to **establish relationships.** Using this implementation, you will have the **benefits of a micro-service architecture** while still having **one central URL for all data exchange** that has **domain relations baked right in.** You can find information about Apollo Federation here: https://www.apolloGraphQL.com/docs/federation/.

# Let's Make It Happen

In the _src/api/services/endpoints_ folder add **any number JSON files** that match the service shape I created that correspond to **running GraphQL Services** and **deploy this app** to the cloud. This app will **introspect the schemas** of all of these servies and **centralize them here.** The shape should look like this

```
{
 "name": "customer_service",
 "team": "Cargill Customer Support Team",
 "git_repo": "https://git.cglcloud.com/team_name/repo",
 "dev_url": "https://app_name.dev.cglcloud.in/graphql",
 "stage_url": "https://app_name.stage.cglcloud.in/graphql",
 "prod_url": "https://app_name.cglcloud.com/graphql"
}

```

# Make It Your Own

First search the application for TEAM_NAME_GOES_HERE and replace it with your team name and APP_NAME_GOES_HERE and replace it with your application name. This will be necessary for Cargill cloud deployment on Captain. Read about Captain here: https://wiki.cglcloud.com/index.php/Cargill_Cloud_Platform.

I have preconfigured eslint, typescript, and prettier to behave how I like. These keep coding patterns consistent across the project and will throw errors if you make different stylistic choices. Feel free to use it. Feel free to modify it. Feel free to throw it away completely. Make it your own! Have fun with it! This is your project now.

# A Picture Is Worth A Thousand Words

This implementation is set up with a **visualizer of the graph.** By navigating to [url of app]/public/visualizer.html GraphQL Voyager will introspect the GraphQL API on page load and generate a visual. This will help **you and your clients** have better **mental model** of your **types** and their corresponding **fields** and **relationships.** See more about GraphQL Voyager here: https://github.com/APIs-guru/GraphQL-voyager.

# Schrödinger's Security Protocols

If you are using this on Cargill computer and getting a "SELF_SIGNED_CERT_IN_CHAIN" error when running getCatFacts you are likely hitting a Cargill proxy issue. Cargill and node are both tryig to make sure you are safe (which is very nice of both of them) but this is blocking the HTTP request from coming in. To fix this run "export NODE_TLS_REJECT_UNAUTHORIZED=0" in the terminal you are using to run this app then restart the server. This will upset Node but that's okay Cargill still has your back. Read more here https://wiki.cglcloud.com/index.php/Proxy#NPM_Config.
