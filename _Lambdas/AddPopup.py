import boto3
import json

def lambda_handler(event, context):
    BasicInfo = event['requestContext']['authorizer']['lambda']
    [Status, Base64] = event['body'].split()

    Popup = {"Status":Status, "Base64":Base64}

    S3Result = boto3.client('s3').put_object(Bucket='....', Key='Popup/Popup', Body=json.dumps(Popup), ContentType='application/json')
    if S3Result['ResponseMetadata']['HTTPStatusCode'] != 200:
        return {'statusCode':S3Result['ResponseMetadata']['HTTPStatusCode']}

    return {'statusCode':201}
