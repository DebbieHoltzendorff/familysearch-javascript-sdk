/**
 * @ngdoc overview
 * @name index
 * @description
 *
 * ## Overview
 *
 * ### Goal
 *
 * The goal of this SDK is to make the FamilySearch REST endpoints easier to consume.
 * Each SDK function wraps a corresponding REST endpoint and adds *convenience functions*
 * to make navigating the response easier.
 * In addition to the convenience functions you also have access to the original response,
 * so you always have the option of navigating the response elements yourself.
 * And you can make calls not anticipated by the SDK using the *plumbing functions* described below.
 *
 * ### Features
 *
 * - Authentication can be performed with a single function call, or even automatically.
 * - The access token can be saved in a cookie and can be expired automatically.
 * - REST endpoints can be called using simple function calls that set the correct request headers and request the correct URL.
 * - GET's are automatically retried to handle transient errors.
 * - Throttling is handled - calls are automatically retried.
 * - Responses are mapped to objects or arrays of objects that have convenience functions
 * to make extracting data from the responses easier.
 * - The response object prototypes can be extended with additional functions to navigate the response json and return
 * whatever custom information is desired.
 * - The SDK works using jQuery, AngularJS, or Node.js; no other dependencies are required.
 *
 * ### Object model
 *
 * <img src="https://docs.google.com/drawings/d/1o3vRqYQSXoao94Z0cdaK9dR8MveS9U2jCsBOobw0xks/pub?w=650&amp;h=492"/>
 *
 * People with names and facts
 *
 * - {@link person.types:constructor.Person Person}
 * - {@link fact.types:constructor.Fact Fact}
 * - {@link name.types:constructor.Name Name}
 *
 * Relationships between people
 *
 * - {@link spouses.types:constructor.Couple Couple}
 * - {@link parentsAndChildren.types:constructor.ChildAndParents ChildAndParents}
 *
 * Ojects related to people and relationships
 *
 * - {@link notes.types:constructor.NoteRef NoteRef}
 * - {@link notes.types:constructor.Note Note}
 * - {@link sources.types:constructor.SourceRef SourceRef}
 * - {@link sources.types:constructor.SourceDescription SourceDescription}
 * - {@link discussions.types:constructor.DiscussionRef DiscussionRef}
 * - {@link discussions.types:constructor.Discussion Discussion}
 * - {@link discussions.types:constructor.Comment Comment}
 * - {@link memories.types:constructor.MemoryPersonaRef MemoryPersonaRef}
 * - {@link memories.types:constructor.MemoryPersona MemoryPersona}
 * - {@link memories.types:constructor.Memory Memory}
 * - {@link memories.types:constructor.MemoryArtifactRef MemoryArtifactRef}
 * - {@link changeHistory.types:constructor.Change Change}
 *
 * Search & match
 *
 * - {@link searchAndMatch.types:constructor.SearchResult SearchResult}
 *
 * Attribution
 *
 * - {@link attribution.types:constructor.Attribution Attribution}
 *
 * Users
 *
 * - {@link user.types:constructor.Agent Agent}
 * - {@link user.types:constructor.User User}
 *
 * ## Getting started
 *
 * See the README.md file for information on downloading the SDK.
 *
 * To use the SDK, you need to
 *
 * 1. init the SDK; e.g., ({@link init.functions:init all options})
 * <pre>
 * FamilySearch.init({
 *   app_key: 'YOUR_ACCESS_KEY_GOES_HERE',
 *   environment: 'sandbox',
 *   // auth_callback is the URI you registered with FamilySearch.
 *   // The page does not need to exist. The URI only needs to have
 *   // the same host and port as the server running your script
 *   auth_callback: 'REDIRECT_GOES_HERE',
 *   http_function: jQuery.ajax,
 *   deferred_function: jQuery.Deferred
 * });
 * </pre>
 *
 * 2. get an access token; e.g.,
 * <pre>
 * FamilySearch.getAccessToken().then(function(response) {
 *    // now you have an access token
 * });
 * </pre>
 *
 * 3. make API calls; e.g.,
 * <pre>
 * FamilySearch.getCurrentUser().then(function(response) {
 *    // now you have the response
 * });
 * </pre>
 *
 * ### Example
 *
 * <pre>
 * FamilySearch.init({
 *   app_key: 'MY_ACCESS_KEY',
 *   environment: 'sandbox',
 *   auth_callback: 'http://localhost/auth',
 *   http_function: $.ajax,
 *   deferred_function: $.Deferred,
 * });
 *
 * FamilySearch.getAccessToken().then(function(accessToken) {
 *   FamilySearch.getCurrentUser().then(function(response) {
 *     var user = response.getUser();
 *     console.log('Hello '+user.contactName);
 *   });
 * });
 * </pre>
 *
 * ## SDK Functions return promises
 *
 * As illustrated by the example above, most SDK functions return *promises*.
 * Promises are a great way to manage asynchronous code.
 * A promise has a `then(success callback, optional error callback)` method into which you pass your
 * *callback functions*.
 * Your *success callback function* is called once the promise has been fulfilled;
 * your *error callback function* is called if the project gets rejected.
 * For more information about promises, see for example [the jQuery deferred.then() documentation](http://api.jquery.com/deferred.then/).
 *
 * Promises returned by the SDK are generated by the `deferred_function` you passed into the `init` call.
 * If the promise is fulfilled, it will call your success callback function with a single parameter containing the response data.
 * If the response is rejected, it will call your error callback function with whatever the `http_function` passed into the `init`
 * call would call it with.
 *
 * The following functions are also available on the promise
 *
 * - `getResponseHeader(header)`
 * - `getAllResponseHeaders()`
 * - `getStatusCode()`
 * - `getRequest()`
 *
 * ### Examples
 *
 * #### jQuery
 *
 * Requires jQuery 1.8 or later.
 *
 * If you pass `jQuery.ajax` and `jQuery.Deferred` into the `FamilySearch.init` call, the returned promises
 * will have the the methods [described here](http://api.jquery.com/Types/#Promise); for example
 *
 * - `then(function(response) {}, function(jqXHR, textStatus, errorThrown) {})`
 * - `done(function(response) {})`
 * - `fail(function(jqXHR, textStatus, errorThrown) {})`
 *
 * #### AngularJS
 *
 * If you pass `$http` and `$q.defer` into the `FamilySearch.init` call, the returned promises
 * will have the methods [described here](http://docs.angularjs.org/api/ng.$q#description_the-promise-api); for example
 *
 * - `then(function(response) {}, function({data: response, status: status, headers: headers, config: config}) {})`
 * - `catch(function({data: response, status: status, headers: headers, config: config}) {})`
 *
 * #### Node.js -- not yet implemented
 *
 * ## Handling responses
 *
 * SDK function responses are typically json objects.
 * The SDK function calls add *convenience functions* for returning various objects from the response.
 * For example, the `getPerson('ID')` call adds a `response.getPerson()` convenience function that returns the
 * {@link person.types:constructor.Person Person} object from the response.
 *
 * The returned objects contain the same properties as the original response json, but they have custom constructors whose
 * prototypes add convenience functions.
 * For example, the prototype for {@link person.types:constructor.Person Person} objects includes `$getGivenName()` and `$getSurname()`
 * convenience functions for returning the person's given name and surname respectively.
 * Without these convenience functions, you would have to navigate the `parts` elements of the `nameForms` array,
 * look for a part whose `type` element is `http://gedcomx.org/Given` or `http://gedcomx.org/Surname` respectively, and
 * then return the `value` element of that part.  `$getGivenName()` and `$getSurname()` do this for you.
 * All convenience functions added by the SDK begin with a `$` to avoid name conflicts with FamilySearch property names.
 * The object properties and convenience functions are fully described in the docs.
 *
 * You can add your own convenience functions to the returned objects.
 * For example, suppose you wanted to display someone's name followed by their id. You could write
 * <pre>
 *   FamilySearch.Person.prototype._getNameAndId = function() {
 *     return this.$getDisplayName() + ' (' + this.id + ')';
 *   }
 * </pre>
 *
 * and from then on you could call `person._getNameAndId()` on any {@link person.types:constructor.Person Person} object.
 *
 * <pre>
 * FamilySearch.getPerson('ID').then(function(response) {
 *   var person = response.getPerson();
 *   console.log('Hello '+person._getNameAndId());
 * });
 * </pre>
 *
 * To avoid name conflicts with FamilySearch property names and SDK convenience functions, we recommend that you begin
 * your convenience functions with a `_`, though you are free to begin your convenience functions however you want.
 *
 * Also, object properties beginning with `$` or `_` are removed before posting data to FamilySearch.
 *
 * ## Updates
 *
 * All updateable objects have a constructor that takes a parameters object for initialization,
 * one or more *$set...()* functions, *$save()*, and *$delete()* functions.
 * To create a new object, call the constructor to create a new object and call *$save()*.
 * To update an object, call the *$set...()* functions or update properties and call *$save()*.
 * To delete an object, call *$delete()*.
 *
 * Most *$save()* functions take a *refresh* parameter that causes the object to be re-read from the server after it is saved.
 * This is useful when the server adds new fields to the object or modifies fields when saving it.
 * Many *$save()* and *$delete()* functions also take a *changeMessage* parameter to record the reason for the change.
 *
 * ## Using the SDK with module loaders
 *
 * The SDK can be used
 *
 * - as a browser global (i.e., referring to it as `window.FamilySearch` or just `FamilySearch`),
 * - with AMD loaders like *RequireJS* ([see the jQuery.html example](https://github.com/rootsdev/familysearch-javascript-sdk/blob/master/examples/jquery.html)),
 * - or with CommonJS loaders like *Node.js* (no example yet).
 *
 * It does this by prepending [a 40-line header](https://github.com/rootsdev/familysearch-javascript-sdk/blob/master/src/header.frag)
 * to the front of the combined file.
 * This header should work for any project that needs to combine javascript source files located in a single directory
 * written using the AMD *defines* format and make them available also for CommonJS or as a browser global.
 * The header is far less code than using the [Almond loader](https://github.com/jrburke/almond), which is the other approach.
 *
 * ## Plumbing functions
 *
 * The functions in the *plumbing* module are low-level functions that you would not normally call.
 * The higher-level API functions that you normally call are built on top of the plumbing functions.
 * The plumbing functions are exposed in case you want to do something not anticipated by the API functions.
 * Promises returned by plumbing functions call their callback functions with whatever the `http_function`
 * passed into the `init` call would call them with.
 * The plumbing functions serve the same purpose as the
 * [plumbing functions in git](https://www.kernel.org/pub/software/scm/git/docs/#_low_level_commands_plumbing).
 *
 * ## Contributing
 *
 * **Pull requests are welcome!**
 *
 * **Grunt** We use grunt as our build tool.  Grunt has targets to run jshint, unit tests, generate the HTML documentation,
 * and combine and minify the javascript source files.
 * Two of the most useful targets are `grunt server` which starts a server and watches the source files for changes, and
 * `grunt build` which builds everything.
 *
 * **JSHint** We use a fairly strict .jshintrc file. JSHint is a great way to catch potential bugs before they occur.
 * Please use grunt to run jshint over your files before submitting pull requests.
 *
 * **Unit tests** are created by copying and pasting the sample json responses provided on the FamilySearch
 * developers website into files in the test/mock directory, then calling the corresponding function and running various
 * expectations over the results.
 * A test mock directs the function call to read the response from the corresponding json file instead of calling the
 * actual FamilySearch REST API.
 * Your pull requests should contain unit tests for new functionality and make sure that existing unit tests all pass.
 *
 * **Documentation** is generated from JSDoc comments that have been extended with some *ngdoc* keywords.
 * Take a look at the existing code for examples.
 * Your pull requests should be documented.
 *
 * **Travis-CI** Whenever a push is made to github, Travis-CI calls grunt to run jshint, unit tests, generate the HTML
 * documentation, combine and minify the javascript source files, and publish the documentation and combined & minified
 * source to the gh-pages branch on github.
 */
