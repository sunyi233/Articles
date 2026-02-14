import boto3
import simplejson

_DynamoDB = boto3.resource('dynamodb')

def lambda_handler(event, context):
    Category, ID = event['body'].split(' ')

    DDBResult = _DynamoDB.Table('Items').get_item(Key = {'Category':Category, 'ID':ID})
    if 'Item' not in DDBResult:
        return {'statusCode':400}

    return {'statusCode':200, 'body':simplejson.dumps(DDBResult['Item'])}
