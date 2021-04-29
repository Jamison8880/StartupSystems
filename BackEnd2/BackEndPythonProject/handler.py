import json

# How do I tell what all the "Subfields" of Event are? like Event.Path?

# event is everything after "input" in the json file.
# body is being returned to my browser.


def ReceivingDataFromFrontEnd(event, context):

    DataVariable = json.loads(event["body"])
    print(DataVariable)
   # print(event)
    response = {
        "statusCode": 200,

        "body":  DataVariable
        # What else can i put here? where do i read about documentation?
        # What is json.dumps doing?
    }
    return response


def SendingDataToFrontEnd(event, context):
    response = {
        "statusCode": 200,
        "body": json.dumps({"username": "jschultz User11", "paragraph": "This data is from the back end handler.py file", "numbers": "Can I put Digits here or is everything a string?"})

    }

    return response


def hello(event, context):
    body = {  # WHAT IS THE BODY FOR?
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)

    }

    return response

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """
