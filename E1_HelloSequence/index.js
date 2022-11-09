/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    iterations = context.df.getInput();
    if (!iterations) {
        iterations = "5" //default
    }

    iterations = parseInt(iterations);

    for (let i = 0; i < iterations; i++) {
        yield context.df.callActivity("E1_Delay", "In");
    }

    // comment out for parallel jobs
    // const tasks = []
    // for(let i = 0; i < iterations; i++) {
    //     tasks.push(context.df.callActivity("E1_Delay", "In"));
    // }

    // yield context.df.Task.all(tasks);

    return true;
});