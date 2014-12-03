angular.module('scopeTest', [])

    .controller('FirstCtrl', function () {

    }).controller('SecondCtrl', function () {

});

function assert (testName, value, desc) {
    value ? console.log(testName + desc) : console.log (testName +  " - failed.");
}

var testIt = function() {
    return this;
};

var newTest = testIt;

assert('type of newTest', typeof newTest() === "object", 'yes' );

var object = {
    res: testIt
};
var objectNew = {
    res: newTest
};

//console.log(testIt());
console.log(typeof newTest());
//console.log(object.res());
//console.log(objectNew.res());
