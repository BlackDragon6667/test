// whurl = "";

// var str= "test";
// var name= "";
// function f1(){
//     name = document.getElementById("NameInput").value;
//     str = document.getElementById("total-correct").value;
//     // console.log(document.getElementById("InputField").value)
// }
// function webhook(){
//     f1();
//     const msg = {
//         "content": str,
//         "username": name
//     };
//     console.log(msg)
//     if(str == ""){
//         document.getElementById("Message1").style.opacity = 1; 
//         setTimeout(function(){
//             document.getElementById("Message1").style.opacity = 0;
//         }, 4000)
//         console.log("ERROR")
//         return;
//     }
//     try{
//         fetch(whurl + "?wait=true", {"method":"POST", "headers": {"content-type": "application/json"}, "body": JSON.stringify(msg)});
//         // document.getElementById("InputField").value = "test";
//         document.getElementById("MessageSent").style.opacity = 1;
//         setTimeout(function(){
//             document.getElementById("MessageSent").style.opacity = 0;
//         }, 4000)

//     } catch(e){
//         document.getElementById("MessageFailed").style.opacity = 1;  
        
//         setTimeout(function(){
//             document.getElementById("MessageFailed").style.opacity = 0;
//         }, 4000)
//     }

// } 