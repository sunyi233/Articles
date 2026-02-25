import boto3
import simplejson

_DynamoDB = boto3.resource('dynamodb')

def lambda_handler(event, context):
    ID, YearMonth = event['body'].split(' ')

    DDBResult = _DynamoDB.Table('.....').query(KeyConditionExpression=boto3.dynamodb.conditions.Key('ID').eq(ID))

    Result = []
    for ThisSeniorChulsuck in DDBResult['Items']:
        if ThisSeniorChulsuck['Date'].startswith(YearMonth) == True:
            Result.append(ThisSeniorChulsuck['Date'][-2:])

    return {'statusCode':200, 'body':simplejson.dumps(Result)}
