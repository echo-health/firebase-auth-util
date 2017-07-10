# Firebase auth util
A simple node.js command line tool for getting, adding, updating and removing firebase auth users.

## Why?

The firebase admin library has more functionality then it's web console counter part. Mainly it 
has no way to automate auth actions. 

This command line interface bridges this and allows users to easily integrate it in their process.

## Installing
**fb-auth-util** can be installed locally or globally, whatever you prefer.

### Global
```
$ npm install @echo-health/fb-auth-util -g
```
Or if you prefer yarn
```
$ yarn global add @echo-health/fb-auth-util
```

### Local
```
npm install @echo-health/fb-auth-util
```
Or if you prefer yarn
```
$ yarn add @echo-health/fb-auth-util
```

### CLI Options
At minimum you need to provide a path to a credentials file for your Firebase database. This can be provided in the `--credentials` option or via the [`GOOGLE_APPLICATION_CREDENTIALS`](https://developers.google.com/identity/protocols/application-default-credentials) environment variable.
You can see all options by using `--help`:

```
$ fb-auth-util --help

  Usage: cli [options]

  Options:

    -c --credentials <credentials>  Path to your Firebase credentials file
    -j --json                       Output in json
    -t --type <type>                Type can be either add, update or remove.
    -u --user <user>                The user object. Value must be in json format.
    -h, --help                      output usage information
```

#### Pipeing output into another program
One use case might be to pipe the results of the user object into another program, for example [`jq`](https://stedolan.github.io/jq/). You can acheive this by using the `--json`flag. For example:

```
$ fb-auth-util --type get --user '{"email": "test@test.com"}' --json | jq -r '.uid'
kxXIfDOXOuYmTG0YvBOIV9k4hdj2
```