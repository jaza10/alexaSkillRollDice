exports.handler = (event, context) =>
{
    try {

        if (event.session.new) {
            console.log("New Session")
        }

        switch (event.request.type)
        {
            case "LaunchRequest":
                console.log("Launch Request")
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse("Welcome to an Alexa Skill", true)
                    )
                )
                break;
            case "Intent":
                console.log("Intent Request")
                break;
            case "SessionEndedRequest":
                console.log("Launch Request")
                break;
            default:
                context.fail("Invalid Request Type: " ${event.request.type})
        }

        buildSpeechletResponse = (output, shouldEndSession) =>
        {
            return {
                outputSpeech: {
                    type: "Plaintext",
                    text: outputText
                },
                shouldEndSession: shouldEndSession
            }
        }

        generateResponse = (sessionAttributes, speechletResponse) => {

            return {
                version: "1.0",
                sessionAttributes: sessionAttributes,
                response: speechletResponse
            }
        }

    }
    catch(error)
    {
        context.fail("Exception");
    }

}
