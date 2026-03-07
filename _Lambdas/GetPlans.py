import boto3
import simplejson
import zoneinfo
from datetime import datetime

_DynamoDB = boto3.resource('dynamodb')

def lambda_handler(event, context):
    MyInfo = event['requestContext']['authorizer']['lambda']

    Today = datetime.now(zoneinfo.ZoneInfo('Asia/Seoul')).strftime('%Y-%m-%d')
    print(Today)

    DDBResult = _DynamoDB.Table('......').query(KeyConditionExpression=boto3.dynamodb.conditions.Key('.....').eq('.....'), FilterExpression=boto3.dynamodb.conditions.Attr('Day').eq(Today))

    return {'statusCode':200, 'body':simplejson.dumps(DDBResult['Items'])}
