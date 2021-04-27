import json

# How do I tell what all the "Subfields" of Event are? like Event.Path?


def hello(event, context):
    body = {
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
