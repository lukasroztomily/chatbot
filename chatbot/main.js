


function dds(input) {
    console.log("CALL FUnction " + input);
    return 2;
}



const result = function dds(input) {
    console.log("CALL FUnction " + input);
    return 2;
};


result("test");

const erew = arg => {
    console.log("CALL FUnction " + arg);
};



function a () {
    console.log("Print A");
};





function b (callback) {
    console.log("Print B");
    callback();
};


b(a);


b(()=> {
  console.log("Test 1");
  console.log("Print C");
});