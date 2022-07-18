// is a pattern that allows some request to be sent, received, and handled by multiple objects
// The first object in the chain receives the request and either handles it or forwards it to the next candidate on the chain, which does likewise.
// They can also either abort the whole chain or decide to let the request continue on to the next object
// The Chain of Responsiblity patterns is related to the Chaining Pattern which is frequently used in JavaScript
// Here are some scenarios where the COR pattern fits nicely with:
//      Coffee Maker
//      ATM Machine
//      Transformers: Utilize a chain of transformer/parsers in some custom AST
