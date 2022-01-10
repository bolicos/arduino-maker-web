export enum AnalogSensorsEnum {
	PINO_A0 = "A0",
	PINO_A1 = "A1",
	PINO_A2 = "A2",
	PINO_A3 = "A3",
	PINO_12 = "12",
	PINO_13 = "13",
}

export enum Button {
	PINO_07 = "7",
}

export enum Servo {
	PINO_03 = "3",
}

export enum Motor1 {
	PINO_02 = "2",
	PINO_04 = "4",
	PINO_05 = "5",
}

export enum RgbLed {
	PINO_11 = "11",
	PINO_09 = "9",
	PINO_10 = "10",
}

export interface ArduinoCodeType {
	lightPin: AnalogSensorsEnum;
	potPin: AnalogSensorsEnum;
	linePin: AnalogSensorsEnum;
	distIRPin: AnalogSensorsEnum;
	distTrigPin: AnalogSensorsEnum;
	distEchoPin: AnalogSensorsEnum;

	buttonPin: Button;

	servoPin: Servo;

	dir1PinA: Motor1;
	dir2PinA: Motor1;
	speedPinA: Motor1;

	redPin: RgbLed;
	greenPin: RgbLed;
	bluePin: RgbLed;
}

export const ArduinoCode = (param: ArduinoCodeType) => {
	return `
    int lightPin = ${param.lightPin};
    int potPin = ${param.potPin};
    int linePin = ${param.linePin};
    int distIRPin = ${param.distIRPin};
    int distTrigPin =${param.distTrigPin};
    int distEchoPin = ${param.distEchoPin};

    int buttonPin = ${param.buttonPin};
    int servoPin = ${param.servoPin};

    int dir1PinA = 2;${param.dir1PinA};
    int dir2PinA = ${param.dir2PinA};
    int speedPinA = ${param.speedPinA};

    int redPin = ${param.redPin};
    int greenPin = ${param.greenPin};
    int bluePin = ${param.bluePin};

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
      
      pinMode(distTrigPin, OUTPUT);
      pinMode(distEchoPin, INPUT);
      Serial.write("running");
      servo.attach(servoPin);
      pastVal = analogRead(lightPin);

    }

    int getSensor() {
      lightVal = analogRead(lightPin);
      potVal = analogRead(potPin);
      buttonVal = digitalRead(buttonPin);
      lineVal = analogRead(linePin);
      distIRVal = analogRead(distIRPin);
    
      pastVal = lightVal;

      digitalWrite(distTrigPin, LOW);
      delayMicroseconds(2);
      digitalWrite(distTrigPin, HIGH);
      delayMicroseconds(10);
      digitalWrite(distTrigPin, LOW);
      int duration = pulseIn(distEchoPin, HIGH);
      int distance = duration * 0.034 / 2;

      return distance;
    }
      
    void loop() {


      sensorVal = getSensor();
      Serial.println(sensorVal);

      actuatorVal = potVal;

      buttonHeld = (not buttonVal and lastButtonVal and buttonCounter > 15);
      buttonPressed = (not buttonVal and lastButtonVal and not buttonHeld);
      if (buttonHeld) {
        trainingDone = not trainingDone;
        Serial.println("button held");
        buttonCounter = 0;
      }

      if (buttonVal) {
              buttonCounter++;
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
      else if (color == "none")
        RGBcolor(0, 0, 0);
    }
    void RGBcolor(int redVal, int greenVal, int blueVal) {
      analogWrite(redPin, redVal);
      analogWrite(greenPin, greenVal);
      analogWrite(bluePin, blueVal);
    }
  `;
};
