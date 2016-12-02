/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Roll Dice to roll a dice"
 *  Alexa: "The result is: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.f8737ee2-4c94-44a5-abc1-f52d67eab224"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space RollDices.
 */

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var RollDice = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
RollDice.prototype = Object.create(AlexaSkill.prototype);
RollDice.prototype.constructor = RollDice;

RollDice.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
    //handleNewNumberRequest(response);
};

RollDice.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);

    console.log("RollDice onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = handleNewNumberRequest();
    //var repromptText = "You can ask me to roll the dice";
    response.tell(speechOutput);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
RollDice.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

RollDice.prototype.intentHandlers = {
    "GetNewNumberIntent": function (intent, session, response) {
        var speechOutput = handleNewNumberRequest();
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("I can roll a dice for you... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new RollDice from the list and returns to the user.
 */
/**function handleNewNumberRequest(response) {
    // Get a random space RollDice from the space RollDices list
    var number = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

    // Create speech output
    var speechOutput = "The result is: " + number;
    var cardTitle = "Your number";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}*/

function handleNewNumberRequest() {
    // Get a random space RollDice from the space RollDices list
    var number = Math.floor(Math.random() * 6) + 1;

    return "The result is: " + number.toString(10);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var rollDice = new RollDice();
    rollDice.execute(event, context);
};
