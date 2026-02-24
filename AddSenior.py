import boto3
import json
import time

_DynamoDB = boto3.resource('dynamodb')

def lambda_handler(event, context):
    NewItem = json.loads(event['body'])
    NewItem['Category'] = 'Senior'
    NewItem['JoinTime'] = int(time.time())
    _DynamoDB.Table('Items').put_item(Item = NewItem)

    return {'statusCode':201}
