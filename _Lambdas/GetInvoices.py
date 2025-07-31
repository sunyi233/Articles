import boto3
import simplejson as json

_TableBuyers = boto3.resource('dynamodb').Table('Buyers')
_TableInvoices = boto3.resource('dynamodb').Table('Invoices')

def lambda_handler(event, context):
    if event['body'].startswith('Status:'): # Status
        Result = _TableInvoices.query(IndexName='Status', KeyConditionExpression=boto3.dynamodb.conditions.Key('Status').eq(event['body'].split(':')[1]))['Items']
    elif '-' in event['body']: # phone number in regular form
        Result = _TableInvoices.query(IndexName='BuyerPhone', KeyConditionExpression=boto3.dynamodb.conditions.Key('BuyerPhone').eq(event['body']))['Items']
    else: # name or last four digit
        Buyers = _TableBuyers.query(IndexName='Name', KeyConditionExpression=boto3.dynamodb.conditions.Key('Name').eq(event['body']))['Items']
        Buyers += _TableBuyers.query(IndexName='LFD', KeyConditionExpression=boto3.dynamodb.conditions.Key('LFD').eq(event['body']))['Items']

        Result = []
        for ThisBuyer in Buyers:
            Result += _TableInvoices.query(IndexName='BuyerPhone', KeyConditionExpression=boto3.dynamodb.conditions.Key('BuyerPhone').eq(ThisBuyer['PhoneNumber']))['Items']

    return {'statusCode':200, 'body':json.dumps(Result, ensure_ascii=False)}
