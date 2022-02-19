/**
 * Application Layer(Business Logic) or Back-End of our application where database
 * parameters, connection and APIs are defined. NOTE that MariaDB was chosen as the
 * DBMS. The database schema can be found at the root directory(Question2.ddl) and
 * the ERD(Question2_ERD.jpg). It is in this file that the function to check if the
 * intervals overlap is defined at line 49.
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
const db=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "opibus2"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//API to get data from MariaDB
app.get("/api/get", (req,res)=>{
    const sqlGet="SELECT * FROM booking_service ";
    db.query(sqlGet, (error,result)=>{
        res.send(result);
    });
});

//An Interval has a start time and end time
class Interval{
    constructor(start,end){
        this.start=start;
        this.end=end;
    }
}

//Function that checks if any two intervals do overlap
const isOverlap=(myarray)=>{
    //compute the length of the array
    var n=myarray.length;
    //sort intervals in increasing order of start time
    myarray.sort(function(i1, i2){
        return i1.start-i2.start;
    });
    //Once sorted, if start time is less than the end time of previous,overlap==true
    var i=1;
    for(i;i<n;i++){
        if(myarray[i-1].end >= myarray[i].start){
            return true;
        }else{
            return false;
        }
    }
}



//API to get data from client and POST to MariaDB
app.post("/api/post", (req,res)=>{
    const {bookings}=req.body;
    //Convert Bookings Input String to a multidimensional array
    var bookingsArray=JSON.parse("["+bookings+"]");
    let arr1=[
        new Interval(bookingsArray[0][0],bookingsArray[0][1]),
        new Interval(bookingsArray[1][0],bookingsArray[1][1]),
        new Interval(bookingsArray[2][0],bookingsArray[2][1])                
    ];

    //If intervals overlap, bike cannot be available
    if(isOverlap(arr1)){
        var bikeAvailability="'False'";
    }else{
        var bikeAvailability="'True'";
    }
    const sqlInsert="INSERT INTO booking_service  (bookings, availability) VALUES (?, "+bikeAvailability+")";
    db.query(sqlInsert, [bookings], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

//API to delete data
app.delete("/api/remove/:id", (req,res)=>{
    const {id}=req.params;
    const sqlRemove="DELETE FROM booking_service  WHERE id=?";
    db.query(sqlRemove, id, (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

//API to get data for UPDATE
app.get("/api/get/:id", (req,res)=>{
    const {id}=req.params;
    const sqlGet="SELECT * FROM booking_service  WHERE id=?";
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
    const {bookings}=req.body;
    //Convert Bookings Input String to a multidimensional array
    var bookingsArray=JSON.parse("["+bookings+"]");
    let arr1=[
        new Interval(bookingsArray[0][0],bookingsArray[0][1]),
        new Interval(bookingsArray[1][0],bookingsArray[1][1]),
        new Interval(bookingsArray[2][0],bookingsArray[2][1])                
    ];

    //If intervals overlap, bike cannot be available
    if(isOverlap(arr1)){
        var ubikeAvailability="'False'";
    }else{
        var ubikeAvailability="'True'";
    }
    const sqlUpdate="UPDATE booking_service  SET bookings=?, availability="+ubikeAvailability+" WHERE id=?";
    db.query(sqlUpdate, [bookings, id], (error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.listen(5000, ()=>{
    console.log("Server is running on port 5000!");
});