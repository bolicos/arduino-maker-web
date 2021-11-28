export enum LightPinAnalogEnum {
  A1 = "A1",
  A2 = "A2",
  A3 = "A3",
}

export enum Motor1 {
  A1 = "A1",
  A2 = "A2",
  A3 = "A3",
}


export enum RgbLed {
  A1 = "A1",
  A2 = "A2",
  A3 = "A3",
}

export interface ArduinoCodeType {
  lightPin: LightPinAnalogEnum;
  potPin: Motor1;

}

export const ArduinoCode = (param: ArduinoCodeType) => {
  return `
    int lightPin = ${param.lightPin};
    int potPin = A1;
    int linePin = A2;
    int distIRPin = A3;
    int distTrigPin = 12;
    int distEchoPin = 13;

    int buttonPin = 7;
    int servoPin = 3;

    int dir1PinA = 2;
    int dir2PinA = 4;
    int speedPinA = 5; 

    int redPin = 11;
    int greenPin = 9;
    int bluePin = 10;

    int lightVal, potVal, buttonVal, lastButtonVal, lineVal, distIRVal, sensorVal, actuatorVal, pastVal, distUSVal;
    int buttonCounter = 0;
    int trainingNum = 0;
    bool buttonPressed, buttonHeld, trainingDone = false;
    double scale = .7;

    const int ELEMENT_COUNT_MAX = 50;
    int sensorArray[ELEMENT_COUNT_MAX];
    int actuatorArray[ELEMENT_COUNT_MAX];


    Servo servo;

    void setup() {
      Serial.begin(9600);

      pinMode(buttonPin, INPUT);
      pinMode(redPin, OUTPUT);
      pinMode(greenPin, OUTPUT);
      pinMode(bluePin, OUTPUT);

      pinMode(dir1PinA, OUTPUT);
      pinMode(dir2PinA, OUTPUT);
      pinMode(speedPinA, OUTPUT);
      
      pinMode(distTrigPin, OUTPUT); // Sets the distTrigPin as an OUTPUT
      pinMode(distEchoPin, INPUT); // Sets the distEchoPin as an INPUT
      Serial.write("running");
      servo.attach(servoPin);
      pastVal = analogRead(lightPin); // change pin when changing sensor to read change from

    }

    int getSensor() {
      //  read values
      lightVal = analogRead(lightPin); // 0 - 250
      potVal = analogRead(potPin); // 0 - 1023
      buttonVal = digitalRead(buttonPin); // 0 - 1
      lineVal = analogRead(linePin); // 0 - 1023
      distIRVal = analogRead(distIRPin); //
    //  return abs(lightVal - pastVal);
      pastVal = lightVal;

      digitalWrite(distTrigPin, LOW);
      delayMicroseconds(2);
      digitalWrite(distTrigPin, HIGH);
      delayMicroseconds(10);
      digitalWrite(distTrigPin, LOW);
      int duration = pulseIn(distEchoPin, HIGH);
      int distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)

      return distance;
    }
      
    void loop() {


      sensorVal = getSensor();
      Serial.println(sensorVal);

      actuatorVal = potVal;

      //    print values
    //      Serial.println(lightVal);
    //      Serial.println(potVal);
    //      Serial.println(buttonVal);
    //        Serial.println(lineVal);
    //  Serial.println(distIRVal);

      buttonHeld = (not buttonVal and lastButtonVal and buttonCounter > 15);
      buttonPressed = (not buttonVal and lastButtonVal and not buttonHeld);
      if (buttonHeld) {
        trainingDone = not trainingDone;
        Serial.println("button held");
        buttonCounter = 0;
      }

      if (buttonVal) {
        //        RGBcolor("white");
        buttonCounter++;
        //        Serial.println(buttonCounter);
      }
      else
        buttonCounter = 0;

      if (trainingDone) {
        RGBcolor("green");

        int closestPos = 0;
        int minDiff = 10000;
        for (int i = 0; i < trainingNum; i++) {
          if (abs(sensorArray[i] - sensorVal) < minDiff) {
            minDiff = abs(sensorArray[i] - sensorVal);
            closestPos = i;
          }
        }
        actuatorVal = actuatorArray[closestPos];
        //        Serial ray, trainingNum);
        writeActuator(actuatorVal);

        if (buttonPressed) {
          Serial.println("==============================");
          Serial.println("actual sensor value: " + String(sensorVal));
          Serial.println("closest sensor value: " + String(sensorArray[closestPos]));
          Serial.println("actuator value: " + String(actuatorVal));
          Serial.print("sensor array: ");
          printArr(sensorArray, trainingNum);
          Serial.print("actuator array: ");
          printArr(actuatorArray, trainingNum);
          int closestPos = 0;
          int minDiff = 10000;
          for (int i = 0; i < trainingNum; i++) {
              if (abs(sensorArray[i] - sensorVal) < minDiff) {
                minDiff = abs(sensorArray[i] - sensorVal);
                closestPos = i;
              }
            Serial.println(sensorArray[i]);
            Serial.println(minDiff);
            Serial.println(closestPos);
        
          }
        }

      } else if (buttonPressed) {
        blinkColor("purple", 2);
        sensorArray[trainingNum] = sensorVal;
        actuatorArray[trainingNum] = actuatorVal;

        trainingNum++;

        printArr(sensorArray, trainingNum);
        printArr(actuatorArray, trainingNum);

      } else {
        RGBcolor("blue");
        writeActuator(actuatorVal);
      }
      delay(30);
      lastButtonVal = buttonVal;
    }

    void printArr(int arr[], int limit) {
      for (int i = 0; i < limit; i++)
        Serial.print(String(arr[i]) + ", ");
      Serial.println();
    }

    void writeActuator(int val) {
      //      dc motor
    //  val = map(val, 0, 1023, -255, 255);
    //  analogWrite(speedPinA, abs(val));
    //  if (val > 0) {
    //    digitalWrite(dir1PinA, LOW);
    //    digitalWrite(dir2PinA, HIGH);
    //  }
    //  else {
    //    digitalWrite(dir1PinA, HIGH);
    //    digitalWrite(dir2PinA, LOW);
    //  }
    //    analogWrite(speedPinA, abs(map(200, 0, 1023, -255, 255)));
    //    digitalWrite(dir1PinA, HIGH);
    //    digitalWrite(dir2PinA, LOW);
    //  

    //        servo
            val = map(val, 0, 1023, 0, 180);
            servo.write(val);
    }
    void blinkColor(String color, int num) {
      int delayNum = 200;
      for (int i = 0; i < num; i++) {
        delay(delayNum);
        RGBcolor(color);
        delay(delayNum);
        RGBcolor("none");
      }
      delay(delayNum);
    }

    void RGBcolor(String color) {
      if (color == "red")
        RGBcolor(255, 0, 0);
      else if (color == "green")
        RGBcolor(0, 255, 0);
      else if (color == "blue")
        RGBcolor(0, 0, 255);
      else if (color == "purple")
        RGBcolor(255, 0, 255);
      else if (color == "white")
        RGBcolor(255, 255, 255);
      //  else if (color == "yellow")
      //    RGBcolor(0, 255, 255);
      //  else if (color == "white")
      //    RGBcolor(255, 255, 255);
      else if (color == "none")
        RGBcolor(0, 0, 0);
    }
    void RGBcolor(int redVal, int greenVal, int blueVal) {
      //    Serial.println(redVal);
      //    Serial.println(greenVal);
      //    Serial.println(blueVal);

      analogWrite(redPin, redVal);
      analogWrite(greenPin, greenVal);
      analogWrite(bluePin, blueVal);
    }
  `
}