# Signet for Visual Studio Code #

Signet is the fast, easy and powerful documentation-through-types library for Javascript. With it, you can add type validation to your code and provide useful real-time feedback to anyone interacting with your API.  With helper packages, you can turn your environment into a fast, informative, intelligent system which will help to speed development and reduce friction as you solve interesting problems throughout your day.

Signet for Visual Studio Code provides a suite of snippets and refactorings which will speed up the process of integrating and ease adoption of Signet within your projects. Signet for Visual Studio Code only works in .js and .ts files.

## Installation ##

Open VS Code, press F1 and enter `ext install vs-code-signet`

## Useage ##

To sign or enforce a function, simply click into the function you want to enhance, select one of the actions and let the plugin do the work for you.  By default, Signet for Visual Studio Code will read the parameter list from your function and generate a simple pass-through signature for you.  From there, the sky is the limit.

![Wrap in Enforce and Assign](http://chrisstead.com/wp-content/uploads/images/extension-gifs/function-enforcing.gif)

That's it!

### Automated Actions ###

- Enforce (Wrap in Enforce) -- Add Signet signature enforcement to a function
- Enforce and Assign (Wrap in Enforce and Assign) -- Add Signet signature enforcement to a function, assign output to a const
- Sign (Wrap in Sign) -- Add a Signet signature to a function
- Sign and Assign (Wrap in Sign and Assign) -- Add Signet signature to a function, assign output to a const

### Snippets ###

- Enforce Function (enforce)
- Inline Enforce (enforceinline)
- Sign Function (sign)
- Inline Sign (signinline)
- Is Value Type of Type (istypeof)
- Extend Types (extend)
- Create Subtype (subtype)
- Create Alias (alias)
- Create Named Duck Type (ducktype)

## Changelog ##

### 1.0.0 ###

- First release