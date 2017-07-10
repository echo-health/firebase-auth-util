# Firebase auth util
A simple node.js command line tool for getting, adding, updating and removing firebase auth users.

## Why?

The firebase admin library has more functionality then it's web console counter part. Mainly it 
has no way to automate auth actions. 

This command line interface bridges this and allows users to easily integrate it in their process.

## Installing
**fb-auth-util** can be installed locally or globally, whatever you prefer.

```
$ npm install @echo-health/fb-auth-util -g // global
$ npm install @echo-health/fb-auth-util
```
Or if you prefer yarn
```
$ yarn global add @echo-health/fb-auth-util  // global
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
    -t --type <type>                Type can be either get, add, update or remove.
    -u --user <user>                The user object. Value must be in json format.
    -h, --help                      output usage information
```

#### User object

- **uid** _String_ The uid of the user to update.
- **email** _String_ The user's primary email. Must be a valid email address.
- **emailVerified** _boolean_ Whether or not the user's primary email is verified. If not provided, the default is false.
- **password** _String_ The user's raw, unhashed password. Must be at least six characters long (only used when updating or adding).
- **displayName** _String_ The users' display name.
- **photoURL** _String_ The user's photo URL.
- **disabled** _boolean_ Whether or not the user is disabled. true for disabled; false for enabled. If not provided, the default is false.

#### Get
Only `{ "uid": "..." }` or `{ "email": "..." }` is used in the `--user` argument

#### Remove
Only `{ "uid": "..." }` is used in the `--user` argument

#### Add
Only `{ "email": "..." }` key is **mandatory** in the `--user` argument

#### Update
Only `{ "uid": "..." }` is used in the `--user` argument and **at least one** other key needs to be included

### Pipeing output into another program
One use case might be to pipe the results of the user object into another program, for example [`jq`](https://stedolan.github.io/jq/). You can acheive this by using the `--json` flag. For example:

```
$ fb-auth-util --type get --user '{"email": "test@test.com"}' --json | jq -r '.uid'
kxXIfDOXOuYmTG0YvBOIV9k4hdj2
```