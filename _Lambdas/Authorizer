import boto3
import json
import time

DynamoDB = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # set DDBResult
    DDBResult = DynamoDB.Table('Credentials').get_item(Key = {'AccessToken': event['headers']['authorization'][7:]})
    if 'Item' not in  DDBResult: return {"isAuthorized":False}
        
    # check access token
    if time.time() > DDBResult['Item']['IssueTime'] + 3000: return {"isAuthorized":False}
        
    return {"isAuthorized": True, "context": DDBResult['Item']}
