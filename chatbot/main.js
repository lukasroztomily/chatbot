


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


const  print1 = (result) => {
  console.log("Result:");
  console.log(result);
  console.log("End of result");
};


const  print2 = (result) => {
  console.log(result);
  };
  
 
 const  sum2num = (a,b, decorator) => {
  const rest = a+b;
  decorator(rest);
  };
  
  sum2num(1,1, print1);
  sum2num(2,2, print1);
  sum2num(3,3, res =>  console.log(res));