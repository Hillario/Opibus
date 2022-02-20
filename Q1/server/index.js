/**
 * Application Layer(Business Logic) or Back-End of our application where database
 * parameters, connection and APIs are defined. NOTE that MariaDB was chosen as the
 * DBMS. The database schema can be found at the root directory(Question1.ddl) and
 * the ERD(Question1_ERD.jpg). It is in this file that the function to get the
 * highestAverage is defined at line 42.
 */

//call express
const express=require("express");
//initialize our app
const app=express();
//body-parser
const bodyParser=require("body-parser");
//MySQL,MariaDB
const mysql=require("mysql2");
//cors-used to access our backend api
const cors=require("cors");

//establish db connection
//define connection parameters
const db=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "opibus1"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//API to get data from MariaDB
app.get("/api/get", (req,res)=>{
    const sqlGet="SELECT * FROM discharge_elements ";
    db.query(sqlGet, (error,result)=>{
        res.send(result);
    });
});

//Function to Get Highest Average from a given array
const highestAverage=(myarray)=>{
    
    //initiallize max pair
    var n= myarray.length;
    var a= myarray[0];
    var b= myarray[1];

    //Traverse through every possible pair and keep track of max sum
    var i=0
    var j=i+1;

    for(i;i<n;i++){
        for(j;j<n;j++){
            if(myarray[i]+myarray[j]>a+b){
                a=myarray[i];
                b=myarray[j];
            }
        }
    }

    var highest_average=(a+b)/2;
    return highest_average;        
}



//API to get data from client and POST to MariaDB
app.post("/api/post", (req,res)=>{
    const {darray}=req.body;
    //Convert String to Array using the map function
    var dischargeArray= darray.split(',').map(function(item){
        return parseInt(item,10);    
    });   
    const sqlInsert="INSERT INTO discharge_elements  (darray, haverage) VALUES (?, "+highestAverage(dischargeArray)+")";
    db.query(sqlInsert, [darray], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

//API to delete data
app.delete("/api/remove/:id", (req,res)=>{
    const {id}=req.params;
    const sqlRemove="DELETE FROM discharge_elements  WHERE id=?";
    db.query(sqlRemove, id, (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

//API to get data for UPDATE
app.get("/api/get/:id", (req,res)=>{
    const {id}=req.params;
    const sqlGet="SELECT * FROM discharge_elements  WHERE id=?";
    db.query(sqlGet, id, (error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

//API to update data
app.put("/api/update/:id", (req,res)=>{
    const {id}=req.params;
    const {darray}=req.body;
    //Convert String to Array using the map function
    var dischargeArray= darray.split(',').map(function(item){
        return parseInt(item,10);    
    });
    const sqlUpdate="UPDATE discharge_elements  SET darray=?, haverage="+highestAverage(dischargeArray)+" WHERE id=?";
    db.query(sqlUpdate, [darray, id], (error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.listen(5000, ()=>{
    console.log("Server is running on port 5000!");
});