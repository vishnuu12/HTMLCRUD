

// once load display the body inside opertion or function (readAll()) 
function readAll(){

        //additional
       document.querySelector(".addUser").style.display="none"
       document.querySelector(".updateUser").style.display="none"

       var studentsDetailsParseData = [];
       
                //get from studentsDetails in localstorage to assign new variable(studentsDetailsvariable)  
        var studentsDetailsVariable = localStorage.getItem("studentsDetails")

        if(studentsDetailsVariable === null){
                studentsDetailsParseData = [];
        }

        else {
        
                //this method (JSON string and then transform into js object(JSON.parse)) to sutentsDetail variable
        studentsDetailsParseData = JSON.parse(studentsDetailsVariable)
        
                // string datatype
        var element = ""
        
        //console.log(typeof element)
                //it's array containing records of students(studentsDetail).
                //map it used iterate over each record
                
                studentsDetailsParseData.map(record =>(
                        element +=
                        `
                        <tr>
                                <td>${record.id}</td>
                                <td>${record.name}</td>
                                <td >${record.mobile}</td>
                                <td>
                                        <button class="jstablee" onclick=(edit(${record.id}))> Edit </button>
                                        <button class="jstabled" onclick=(delet(${record.id}))> Delete </button>
                                </td>

                        </tr>
                        `
                )
        )
        
                // get the html tablebody into new variable(tabledata) 
        var tabledata = document.querySelector(".tableBody")

        tabledata.innerHTML = element

        }


}


function createUser(){

                //get input data value in variable
        var newid = document.querySelector(".id").value
        var newname = document.querySelector(".name").value
        var newcell = document.querySelector(".cell").value
        
                //(newStudentsDetails)It will hold a newly created object
        var  newStudentsDetails = {id:parseInt(newid), name:newname, mobile:newcell}

                //get from studentsDetails in localstorage to assign new variable(studentsDetailsvariable)  
        var studentsDetailsVariable = localStorage.getItem("studentsDetails")

        if(studentsDetailsVariable === null){
                localStorage.setItem("studentsDetails",JSON.stringify(newStudentsDetails))

        }

                //this method (JSON string and then transform into js object(JSON.parse)) to sutentsDetail variable
        var studentsDetailsParseData = JSON.parse(studentsDetailsVariable)
        
         // method used to add one or more elements to the end of an array
        studentsDetailsParseData.push(newStudentsDetails)

                //  code removes an item stored in the browser's
        localStorage.removeItem("studentsDetails")

                //this method (JSON string and then transform into js object(JSON.parse)) to sutentsDetail variable
                //set new item to localstorage
        localStorage.setItem("studentsDetails",JSON.stringify(studentsDetailsParseData))



        readAll()
        location.reload();
}



function delet(id){
        alert("Are You Remove Confirm");

        // var studentsDetailsVariable = localStorage.getItem("studentsDetails")
        // var studentsDetailsParseData = JSON.parse(studentsDetailsVariable)

        var studentsDetailsParseData =JSON.parse(localStorage.getItem("studentsDetails"))
        var studentsDetailsfilter = studentsDetailsParseData.filter(student => student.id !==id)
        
       localStorage.removeItem("studentsDetails")

      localStorage.setItem("studentsDetails", JSON.stringify(studentsDetailsfilter))

      readAll()
      location.reload()
}


function edit(id){

        console.log('studentData ', id);
        
                var studentsDetailsParseData = JSON.parse(localStorage.getItem("studentsDetails"))
                var oldStudentData = studentsDetailsParseData.filter(students => students.id === id)



                console.log("studentsDetailsfilter", oldStudentData)
                      

              document.querySelector(".uid").value = oldStudentData[0].id
              document.querySelector(".uname").value = oldStudentData[0].name
              document.querySelector(".ucell").value = oldStudentData[0].mobile


              

   //additional
        document.querySelector(".updateUser").style.display="block"

        document.querySelector(".addUser").style.display="none"


}



function updateUser(){

        var id = document.querySelector(".uid").value
        var name = document.querySelector(".uname").value
        var cell = document.querySelector(".ucell").value

        var studentUpdateDetails = {id:parseInt(id), name:name, mobile:cell}

        //console.log('studentUpdateDetails ', studentUpdateDetails);
        
        
       
        var studentsDetailsVariable = localStorage.getItem("studentsDetails")
        var studentsDetailsParseData = JSON.parse(studentsDetailsVariable)


          var studentsDetailsfilter = studentsDetailsParseData.filter(student => student.id !==parseInt(id))

          studentsDetailsfilter.push(studentUpdateDetails)
          
       localStorage.removeItem("studentsDetails")

        localStorage.setItem("studentsDetails",JSON.stringify(studentsDetailsfilter))
        


     //  console.log("studentsDetailsfilter2",studentsDetailsfilter)
//        localStorage.removeItem("studentsDetails")

//         localStorage.setItem("studentsDetails",JSON.stringify(studentsDetailsfilter))

      location.reload()

}















function addButton(){
        document.querySelector(".addUser").style.display="block"
        document.querySelector(".updateUser").style.display="none"
        

}
function backButton(){
        document.querySelector(".updateUser").style.display="none"
        document.querySelector(".addUser").style.display="none"
        readAll()

}






