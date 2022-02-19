/*To add various driving modes, we need to create child classes of the modes
to inherit from the super class*/

//Super Class
class DriverControl {
    //Constructor for the Electronic Control Unit
    constructor(ECU){
        this.ECU=ECU;
    }

    drive(){

    }
}

//Child Classes

//Adding the ECO driving mode
class ECO extends DriverControl {

    //create methods that send messages to the ECU
    
    //Control the sensitivity of the throttle
    //Car accelerates more cautiously
    decreaseThrottleResponsiveness(){
        //TO DO
    }
    
    //Control Power Train Power Input
    //Less Electricity is passed to the Power Train to minimize battery usage
    decreaseBatteryConsumption(){
        //TO DO
    }

    //Control steering
    //Steering gets lighter
    decreaseTraction(){
        //TO DO
    }

    //Controls traction control    
    makeSuspensionFlexible(){
        //TO DO
    }
}

//Adding the SPORT driving mode
class SPORT extends DriverControl{
    
    //Control the sensitivity of the throttle
    //Car accelerates more readily
    increaseThrottleResponsiveness(){
        //TO DO
    }

    //Control Power Train Power Input
    //More Electricity is passed to the Power Train for more Power
    increaseBatteryConsumption(){
        //TO DO
    }

    //Control steering
    //Steering gets heavier
    increaseTraction(){
        //TO DO
    }
    
    //Controls traction control
    stiffenSuspension(){
        //TO DO
    }
}

//Adding the OFFROAD driving mode
class OFFROAD extends DriverControl{
    
    //Control the sensitivity of the throttle
    //Car accelerates more readily
    increaseThrottleResponsiveness(){
        //TO DO
    }

    //Control Power Train Power Input
    //More Electricity is passed to the Power Train for more Power
    increaseBatteryConsumption(){
        //TO DO
    }

    //Control steering
    //Steering gets lighter
    decreaseTraction(){
        //TO DO
    }
    
    //Controls traction control
    makeSuspensionFlexible(){
        //TO DO
    }
}