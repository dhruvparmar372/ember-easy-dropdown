# ember-easy-dropdown

Demo link - http://dhruvparmar372.github.io/ember-easy-dropdown/

## Usage
```
{{#easy-dropdown elementId='dropdown-test' classNames='nav-bar-dp pull-right'}}
  <div class='dropdown-toggle clickable'>
  	Me
  </div>
  <div class='dropdown-details hide'>
  	Profile<br>
  	Logout
  </div>
{{/easy-dropdown}}
```

### Styling the dropdown
In theory the addon is responsible for adding a class on the dropdown depending on the current state of dropdown. It will be either *expanded* or *collapsed*. Add your custom styles on the basis of that.

### Detected Dropdown State Toggle
Currently component supports triggering an event on the `parentObject` with the following object as the parameter. 
```
    {
        new_state : state, //current state
        element : element_id, //id of the dropdown element.
    }
```

## Contributing to the addon
### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
